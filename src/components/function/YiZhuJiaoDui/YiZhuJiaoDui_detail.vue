<!--suppress ALL -->
<template>
    <div class="YiZhuJiaoDui_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>校对医嘱</span>
        </div>
        <div @click="f5">f5</div>
        <em>{{YiZhuJiaoDui_detail.name}}</em>
        <div class="_global_HuanZheBox">
            <span>{{HuanZhe_YiZhu.bedName}}</span>
            <span>{{HuanZhe_YiZhu.name}}</span>
            <span>（{{HuanZhe_YiZhu.sex}} {{HuanZhe_YiZhu.age}}）</span>
            <span>{{HuanZhe_YiZhu.clinicNum}}</span>
        </div>
        <div class="_global_filter">
            <span>筛选</span>
            <span>分类</span>
        </div>

        <div class="YiZhuList">
            <mt-checklist
                    align="right"
                    v-model="check_YiZhuList"
                    :options="YiZhuList">
            </mt-checklist>
        </div>

        <div class="check_YiZhuList">
            <ul>
                <li v-for="(a,b) in YiZhu_items">
                    <div @click="enlarge()" class="name item">{{a.itemName}}</div>
                    <!--<div class="type item">药品</div>-->
                    <div @click="enlarge()" class="doctor item">{{a.startDoctorName}}</div>
                    <div @click="enlarge()" class="KeShi item">{{a.groupName}}</div>
                    <div class="number item">
                        <span class="a" @click="add(b)">+</span>
                        <input class="b" type="number" :key="b" v-model="YiZhu_items[b].number" @change="checkOut(b)">
                        <span class="a" @click="reduce(b)">-</span>
                    </div>
                    <div class="unit item">{{a.doseUnit}}</div>
                </li>
            </ul>
        </div>

        <button v-show="whether_JiaoDui" @click="JiaoDui" class="JiaoDuiBtn">校对</button>
        <button v-show="!whether_JiaoDui" class="JiaoDuiBtnCD" >正在校对……</button>
    </div>
</template>

<script>
    import {con,url,tip} from '../../../js/global.js';
    import { Checklist } from 'mint-ui';
    import Vue from 'vue';
    Vue.component(Checklist.name, Checklist);
    export default {
        name: "YiZhuJiaoDui_detail",
        props:['YiZhuJiaoDui_detail'],
        data:()=>({
            whether_JiaoDui:true,
            HuanZhe_YiZhu:{},
            YiZhuList:[
                {
                    label: '多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试',
                    value: '值F',
                    disabled: true
                },
                {
                    label:'测试数据：多条费用项目',
                    value:'a3626c0711c8401d9ce3bdcc3a680549'
                }
            ],
            check_YiZhuList:[],
            YiZhu_items:[]
        }),
        watch:{
            check_YiZhuList(clickAfter,clickBefor){
                let YiZhuId=[];
                let YiZhuIdd='';
                if(clickAfter.length>clickBefor.length){
                    // console.log('加操作',clickAfter[clickAfter.length-1]);
                    YiZhuId.push(clickAfter[clickAfter.length-1]);
                    $.ajax({
                        type:'get',
                        url:url+'/performDoctorAdvice/queryProofreadingCost',
                        async:false,
                        dataType: 'json',
                        data:{
                            userId:sessionStorage.getItem('userId'),
                            daId:YiZhuId.join(',')
                        },
                        success:(data)=>{
                            con('医嘱费用项目',data);
                            if(data.error){
                                tip.failed(data.message,1500)
                            }else{
                                for(let i=0; i<data.rows.length; i++){
                                    this.YiZhu_items.push(data.rows[i]);
                                }
                            }
                        }
                    })
                }else if(clickAfter.length<clickBefor.length){
                    let willDelete_index=-5;
                    let willDelete_number=0;
                    for(let i=0; i<clickBefor.length;i++){
                        if(clickBefor[i]!==clickAfter[i]){
                            // console.log('减操作',clickBefor[i]);
                            YiZhuIdd=clickBefor[i];
                            break;
                        }
                    }
                    for(let i=0; i<this.YiZhu_items.length; i++){
                        if(this.YiZhu_items[i].doctorAdviceId==YiZhuIdd){
                            if(willDelete_index===-5){
                                willDelete_index=i;
                            }
                            willDelete_number++;
                        }
                    }
                    if(willDelete_index!==-5){
                        console.log('我才修改')
                        this.YiZhu_items.splice(willDelete_index,willDelete_number);
                    }
                }
            }
        },
        methods:{
            f5(){

            },
            R_back(){
                this.$router.go(-1);
            },
            add(index){
                this.YiZhu_items[index].number++;
                if(this.YiZhu_items[index].number>999){
                    this.YiZhu_items[index].number=999
                }
                if(this.YiZhu_items[index].number<0){
                    this.YiZhu_items[index].number=0
                }
            },
            reduce(index){
                this.YiZhu_items[index].number--;
                if(this.YiZhu_items[index].number>999){
                    this.YiZhu_items[index].number=999
                }
                if(this.YiZhu_items[index].number<0){
                    this.YiZhu_items[index].number=0
                }
            },
            checkOut(index){
                if(this.YiZhu_items[index].number>999){
                    this.YiZhu_items[index].number=999
                }
                if(this.YiZhu_items[index].number<0){
                    this.YiZhu_items[index].number=0
                }
            },
            JiaoDui(){
                if(this.check_YiZhuList.length===0){
                    tip.failed('请选择需要校对的医嘱',1500);
                    return
                };
                this.whether_JiaoDui=false;
                let obj={params:[{
                        clinicId:this.HuanZhe_YiZhu.clinicId,
                        doctorAdvice:[]
                    }],
                    userId:sessionStorage.getItem('userId')
                }
                for(let i=0; i<this.check_YiZhuList.length; i++){
                    let objLv2={};
                    objLv2.doctorAdviceId=this.check_YiZhuList[i];
                    objLv2.ids=[];
                    for(let x=0; x<this.YiZhu_items.length; x++){
                        if(this.check_YiZhuList[i]==this.YiZhu_items[x].doctorAdviceId){
                            let objLv3={};
                            objLv3.id=this.YiZhu_items[x].itemId;
                            objLv3.num=this.YiZhu_items[x].number;
                            objLv3.type=this.YiZhu_items[x].typeId;
                            objLv2.ids.push(objLv3);
                        }
                    }
                    obj.params[0].doctorAdvice.push(objLv2);
                }
                $.ajax({
                    type:'post',
                    url:url+'/performDoctorAdvice/proofreadDoctorAdviceByIds',
                    async:false,
                    dataType:'json',
                    contentType:'application/json',
                    data:JSON.stringify(obj),
                    success:(data)=>{
                        con('医嘱校对的结果',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            tip.success('校对成功');
                            this.whether_JiaoDui=true;
                            //stand by
                        }
                    }
                })
            },
            query_YiZhuList(){
                $.ajax({
                    type:'get',
                    url:url+'/performDoctorAdvice/queryDoctorAdviceByClinicIdMed',
                    async:false,
                    dataType:'json',
                    data:{
                        // clinicId:this.YiZhuJiaoDui_detail.clinicId,
                        clinicId:'e95d5b447ddd4dee89d8e02076619859',
                        /* date:不传默认当天*/
                        doctorAdviceEffective:undefined,/*医嘱效期 0.长期有效 1.临时有效   不传查全部*/
                        type:1 /*类型(0:全部;1:未校对;2已校对)*/,
                        userId:sessionStorage.getItem('userId')
                    },
                    success:(data)=>{
                        con('查询结果',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this.HuanZhe_YiZhu=data.resultDomain;
                            for(let i=0; i<this.HuanZhe_YiZhu.doctorAdvices.length;i++){
                                let obj={};
                                obj.value=this.HuanZhe_YiZhu.doctorAdvices[i].id;
                                obj.label=this.HuanZhe_YiZhu.doctorAdvices[i].content;
                                this.YiZhuList.push(obj);
                            }
                        }
                    }
                })
            }
        },
        beforeMount:function () {
            this.query_YiZhuList();
        },
        mounted:function () {

        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .YiZhuJiaoDui_detail{
        .componentsInit;
        .YiZhuList{
            border-top: 1px solid #E4E4E4;
            margin-top: 0.1rem;
            height: 1.85rem;
            overflow-y: auto;
            background-color: #fff;
        }
        .check_YiZhuList{
            border-top: 1px solid #E4E4E4;
            border-bottom: 1px solid #E4E4E4;
            margin-top: 0.2rem;
            height: 2.3rem;
            overflow-y: auto;
            background-color: #fff;
            li{
                display: flex;
                align-items: center;
                justify-content: space-around;
                height: 0.45rem;
                border-bottom: 1px solid #D9D9D9;
                .item{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .name{
                    width: 1rem;
                }
                .type{
                    width: 0.4rem;
                }
                .doctor{
                    width: 0.6rem;
                }
                .KeShi{
                    width: 0.6rem;
                }
                .number{
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    input{
                        text-align: center;
                    }
                    .a{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 0.25rem;
                        height: 100%;
                        border-left: 1px solid #D9D9D9;
                        border-right: 1px solid #D9D9D9;
                        &:active{
                            background-color: @activeEvent;
                        }
                    }
                    .b{
                        border: 0;
                        background-color: transparent;
                        outline: none;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 0.25rem;
                        height: 100%;
                    }
                }
                .unit{
                    width: 0.3rem;
                }
            }
        }
        .JiaoDuiBtn{
            .buttonInit;
            margin-top: 0.2rem;
            background-color: #12B7F5;
            font-size: 0.16rem;
            border-radius: 8px;
            color: #fff;
            &:active{
                background-color: darken(#12B7F5,10%);
            }
        }
        .JiaoDuiBtnCD{
            .buttonInit;
            margin-top: 0.2rem;
            background-color: #ccc;
            font-size: 0.16rem;
            border-radius: 8px;
            color: #fff;
        }
    }
</style>
<style lang="less">
    .YiZhuJiaoDui_detail{
        .mint-checklist{
            .mint-checklist-title{
                display: none;
            }
            .mint-cell{
                height: 0.48rem;
                min-height: 0;
                display: flex;
                *{
                    font-size: 0.14rem!important;
                }
                .mint-checkbox-core{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 0.2rem;
                    height: 0.2rem;
                    &:after{
                        left: auto;
                        top: auto;
                        width: 0.04rem;
                        height: 0.08rem;
                    }
                }
            }
            .mint-cell-wrapper{
                line-height: normal;
            }
            .mint-checklist-label{
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                justify-content: space-between;
            }
            .mint-checkbox-label{
                width: 2.8rem;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>
