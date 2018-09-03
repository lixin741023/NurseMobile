<template>
    <div class="DianZiBingLiChaKan_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>电子病历查看</span>
        </div>
        <div class="_global_HuanZheBox">
            <span>{{HuanZhe_Info.bedName}}</span>
            <span>{{HuanZhe_Info.name}}</span>
            <span>（{{HuanZhe_Info.sex}} {{HuanZhe_Info.age}}）</span>
            <span>{{HuanZhe_Info.clinicNum}}</span>
        </div>

        <div class="box">
            <div class="xList">
                <ul>
                    <li v-for="(a,b) in xList" :class="{'lx':a.number!==0}" @click="render_xList_detail(a.id,a.number)">
                        <div class="left" :class="a.number===0?'noClick':'yesClick'">
                            <span>{{a.name}}</span>
                            <span v-show="a.number>1">({{a.number}})</span>
                        </div>
                        <span v-show="a.number!==0" class="fa fa-chevron-right"></span>
                    </li>
                </ul>
            </div>
            <div class="yList">
                <div class="row1">
                    <div class="cell1">
                        <span class="key">书写人：</span>月天泽泽
                    </div>
                    <div class="cell2">
                        <span class="key">列表：</span>
                        <select name="" id="BL" v-model="checkItem" class="iiiii">
                            <option v-for="(a,b) in yList" :class="{'typeId':a.typeId}" :value="formatter_value(a)">{{a.emrName}} {{a.createTime}}</option>
                        </select>
                    </div>
                </div>
                <div class="row2" v-html="html">


                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import {url,tip,con} from "../../../js/global";

    export default {
        name: "DianZiBingLiChaKan_detail",
        props:['DianZiBingLiChaKan_detail'],
        data:()=>({
            HuanZhe_Info:{},
            xList:[],
            yList:[],
            html:undefined,
            checkItem:undefined
        }),
        watch:{
            checkItem(id){
                this.$nextTick(()=>{
                    let allOption=$('.DianZiBingLiChaKan_detail #BL option');
                    for(let i=0; i<allOption.length; i++){
                        if(id===allOption.eq(i).val()){
                            if(allOption.eq(i).hasClass('typeId')){
                                this.get_XuXie(id);
                            }else{
                                this.get_normal(id);
                            }
                        }
                    }
                })
            }
        },
        methods:{
            get_normal(id){
                $.ajax({
                    type:'get',
                    url:url+'/emr/queryEmrDetailByEmrId',
                    async:false,
                    dataType:'json',
                    data:{
                        userId:sessionStorage.getItem('userId'),
                        emrId:id
                    },
                    success:(data)=>{
                        con('正常病历',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this.html=data.resultDomain.content.source;
                        }
                    }
                })
            },
            get_XuXie(id){
                $.ajax({
                    type:'get',
                    url:url+'/emr/queryWrittenEmr',
                    async:false,
                    dataType:'json',
                    data:{
                        clinicId:this.DianZiBingLiChaKan_detail.clinicId,
                        typeId:id,
                        userId:sessionStorage.getItem('userId')
                    },
                    success:(data)=>{
                        con('续写病历',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{

                        }
                    }
                })
            },
            formatter_value(obj){
                if(obj.typeId){
                    return `${obj.typeId}`;
                }else{
                    return obj.emrId;
                }
            },
            R_back(){
                this.$router.go(-1);
            },
            get_xList(){
                $.ajax({
                    type:'get',
                    url:url+'/emr/queryClassTreeMed',
                    async:false,
                    dataType:'json',
                    data:{
                        clinicId:this.DianZiBingLiChaKan_detail.clinicId
                    },
                    success:(data)=>{
                        con('电子病历列表',data);
                        if(data.error){
                            tip.failed(data.error,1500);
                        }else{
                            this.xList=data.resultDomain.emrList;
                        }
                    }
                })
            },
            render_xList_detail(id,canDoIt){
                if(canDoIt===0){return}
                $.ajax({
                    type:'get',
                    url:url+'/emr/queryEmrByCliIdAndClassIdMed',
                    async:false,
                    dataType:'json',
                    data:{
                        clinicId:this.DianZiBingLiChaKan_detail.clinicId,
                        classId:id
                    },
                    success:(data)=>{
                        con('具体病历信息',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this.yList=data.resultDomains;
                            for(let i=0; i<this.yList.length; i++){
                                if(this.yList[i].typeId){
                                    this.checkItem=this.yList[i].typeId;
                                    return
                                }
                            }
                            this.checkItem=data.resultDomains[0].emrId;
                        }
                    }
                });
                let xList=$('.DianZiBingLiChaKan_detail .xList');
                let yList=$('.DianZiBingLiChaKan_detail .yList');
                xList.animate({
                    left:'100%',
                    opacity:'0',
                },750,()=>{
                    xList.css('display','none');
                });

                yList.css('display','block');
                yList.animate({
                    left:'0',
                    opacity:'1',
                },1000,()=>{

                });

            }
        },
        beforeMount:function () {
            $.ajax({
                type:'get',
                url:url+'/user/queryByclinicIdMed',
                async:false,
                dataType:'json',
                data:{
                    clinicId:this.DianZiBingLiChaKan_detail.clinicId,
                    userId:sessionStorage.getItem('userId')
                },
                success:(data)=>{
                    con('患者信息',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this.HuanZhe_Info=data.resultDomain;
                    }
                }
            });
            this.get_xList();
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .DianZiBingLiChaKan_detail{
        .componentsInit;
        .box{
            position: relative;
            border-top: 0.01rem solid #E4E4E4;
            margin-top: 0.2rem;
            height: 5.3rem;
            overflow-y: auto;
            overflow-x: hidden;
            .xList{
                position: absolute;
                width: 100%;
                background-color: #fff;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.11rem 0.2rem;
                    border-bottom: 0.01rem solid #F2F2F2;
                    .left{
                        width: 2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 0.16rem;
                    }
                    .yesClick{
                        color: #27B6F5;
                    }
                    .noClick{
                        color: #A4A4A4;
                    }
                    .fa{
                        color: #BDBDBD;
                    }
                }
                .lx{
                    &:active{
                        background-color: @activeEvent;
                    }
                }
            }
            .yList{
                display: none;
                left: 100%;
                opacity: 0;
                position: absolute;
                width: 100%;
                .row1{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.11rem;
                    font-size: 0.13rem;
                    background-color: #fff;
                    border-bottom: 0.01rem solid #E4E4E4;
                    .key{
                        color: lighten(#212529,30%);
                    }
                    .cell1{
                        width: 1.4rem;
                    }
                    .cell2{
                        width: 2rem;
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        select{font-size: 0.13rem}
                    }
                }
                .row2{
                    margin-top: 0.1rem;
                    background-color: #fff;
                    padding: 10px;
                }
            }
        }
    }
</style>