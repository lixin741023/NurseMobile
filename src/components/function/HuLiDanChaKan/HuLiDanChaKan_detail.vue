<template>
    <div class="HuLiDanChaKan_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>护理单查看</span>
        </div>
        <div class="_global_HuanZheBox">
            <span>{{HuanZhe_Info.bedName}}</span>
            <span>{{HuanZhe_Info.name}}</span>
            <span>（{{HuanZhe_Info.sex}} {{HuanZhe_Info.age}}）</span>
            <span>{{HuanZhe_Info.clinicNum}}</span>
        </div>
        <div class="_global_timeFilter" style="margin-top: 0.16rem" @click="open_datePicker">
            <span>{{chooseDay}}</span>
            <img src="../../../images/datePicker.png" alt="">
        </div>
        <mt-datetime-picker
                ref="datePicker"
                type="date"
                :startDate="new Date(Date.parse(inHospital_time))"
                :endDate="new Date(Date.parse(toDay))"
                v-model="dateValue"
        @confirm="makeSure_date">
        </mt-datetime-picker>

        <div class="tabTitle">
            <span v-for="(a,b) in allData" :class="{'checkSpan':activeTab===a.tId}" @click="activeTab=a.tId">{{a.tName}}</span>
        </div>
        <mt-tab-container v-model="activeTab" class="tabContainer">
            <mt-tab-container-item v-for="(a,index_a) in allData" :id="a.tId" :key="a.tId">
                <div v-for="(b,index_b) in a.term" class="tableBox">
                    <table border="1">
                        <thead>
                        <tr>
                            <td v-for="(c,index_c) in b.subitem.temStructure">{{c.name}}</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(d,index_d) in b.subitem.data">
                            <td v-for="(e,index_e) in b.subitem.temStructure">
                                <span v-if="e.type==='select'">{{formatter_tdSelect(d.content[e.id],e.select)}}</span>
                                <span v-else>{{d.content[e.id]}}</span>
                                <!--{{e.type}}-->
                                <!--{{d.content[e.id]}}-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>

    </div>
</template>

<script>
    import Vue from 'vue';
    import { DatetimePicker } from 'mint-ui';
    Vue.component(DatetimePicker.name, DatetimePicker);
    import { TabContainer, TabContainerItem } from 'mint-ui';
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    import {con,tip} from "../../../js/global";
    export default {
        name:"HuLiDanChaKan_detail",
        props:['HuLiDanChaKan_detail'],
        data:()=>({
            HuanZhe_Info:{},
            dateValue:undefined,
            inHospital_time:undefined,
            toDay:'',
            chooseDay:'',
            activeTab:undefined,
            allData:undefined,
            url:''
        }),
        watch:{
            chooseDay(date){
                $.ajax({
                    type:'get',
                    url:this.url+'/threetest/queryNursingByDays',
                    async:false,
                    dataType:'json',
                    data:{
                        clinicId:this.HuLiDanChaKan_detail.clinicId,
                        startTime:`${this.chooseDay} 00:00:00`,
                        endTime:`${this.chooseDay} 23:59:59`,
                        // startTime:`2018-08-27 0:0:0`,
                        // endTime:`2018-08-27 23:59:59`,
                    },
                    success:(data)=>{
                        con('护理单信息',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            if(data.resultDomains.length===0){
                                tip.failed('未查询到患者护理单',1500);
                                this.allData=undefined;
                                return;
                            }
                            this.allData=data.resultDomains;
                            this.activeTab=data.resultDomains[0].tId;
                        }
                    }
                })
            }
        },
        methods:{
            formatter_tdSelect(a,list){
                for(let i=0; i<list.length; i++){
                    if(a===list[i].id){
                        return list[i].name
                    }
                }
            },
            R_back(){
                this.$router.go(-1);
            },
            open_datePicker(){
                this.$refs.datePicker.open();
            },
            makeSure_date(date){
                let year=date.getFullYear();
                let month=date.getMonth();
                let day=date.getDate();
                this.chooseDay=`${year}-${month+1}-${day}`;
            },
            get_toDay(){
                $.ajax({
                    type:'get',
                    url:this.url+'/dateUtil/getDateMapInfo',
                    async:false,
                    dataType:'json',
                    data:{
                        userId:sessionStorage.getItem('userId')
                    },
                    success:(data)=>{
                        con('获取的当天时间',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this.toDay=`${data.resultDomain.year}-${data.resultDomain.month}-${data.resultDomain.day}`;
                            this.chooseDay=this.toDay;
                        }
                    }
                })
            },
        },
        created:function(){
            this.url=this.$store.state.url;
            this.url='http://7.0.0.114:8083/StarTrekMED';
        },
        beforeMount:function () {
            $.ajax({
                type:'get',
                url:this.url+'/user/queryByclinicIdMed',
                async:false,
                dataType:'json',
                data:{
                    clinicId:this.HuLiDanChaKan_detail.clinicId,
                    userId:sessionStorage.getItem('userId')
                },
                success:(data)=>{
                    con('患者信息',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this.HuanZhe_Info=data.resultDomain;
                        this.inHospital_time=data.resultDomain.joinTime.split(' ')[0];
                    }
                }
            });
            this.get_toDay();
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .HuLiDanChaKan_detail{
        .componentsInit;
        .tabTitle{
            width: 100%;
            box-sizing: border-box;
            white-space: nowrap;
            overflow-x: auto;
            padding: 0.1rem 0.1rem 0 0.05rem;
            font-size: 0.13rem;
            margin-top: 0.2rem;
            background-color: #fff;
            border-bottom: 0.02rem solid #E4E4E4;
            span:last-child{
                margin-right: 0;
            }
            span{
                margin-right: 0.23rem;
                display: inline-block;
                padding: 0 0.04rem 0.09rem 0.04rem;
                border-bottom: 0.03rem solid transparent;
            }
            .checkSpan{
                color: #27B6F5;
                border-bottom: 0.03rem solid #27B6F5;
            }
        }
        .tabContainer{
            /*border-top: 0.01rem solid #E4E4E4;*/
            height: 4rem;
            overflow-y: auto;
            /*border-bottom: 1px solid red;*/
            padding-bottom: 10px;
            /*margin-top: 0.1rem;*/
            .tableBox:nth-child(1){
                margin-top: 0;
                border-top: 0;
            }
            .tableBox{
                margin-top: 0.25rem;
                border-top: 1px solid #E4E4E4;
                border-bottom: 1px solid #E4E4E4;
                background-color: #fff;
                overflow-x: auto;
                /*max-height: 1.8rem;*/
            }
            table{
                font-size: 0.13rem;
                border-collapse: collapse;
                border-color: #E4E4E4;
                border-top: none;
                border-right: none;
                border-bottom: none;
                border-left: none;
                tbody{
                    td{
                        font-size: 0.12rem;
                    }
                }
                tr{
                    td{
                        padding: 0.05rem 0.08rem;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>