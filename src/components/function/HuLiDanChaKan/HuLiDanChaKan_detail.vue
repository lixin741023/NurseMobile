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
            <span>通用模板</span>
            <span>通用模板测试1</span>
            <span>通用模板测试2</span>
            <span>通用模板测试3</span>
            <span>通用模板测试4</span>
        </div>
        <div class="tabContainer">
            <mt-tab-container v-model="activeTab">
                <mt-tab-container-item id="tab-container1">

                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container2">

                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container3">

                </mt-tab-container-item>
            </mt-tab-container>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';
    import { DatetimePicker } from 'mint-ui';
    Vue.component(DatetimePicker.name, DatetimePicker);
    import { TabContainer, TabContainerItem } from 'mint-ui';
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    import {url,con,tip} from "../../../js/global";
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
        }),
        watch:{
            chooseDay(date){
                $.ajax({
                    type:'get',
                    url:url+'/threetest/queryNursingByDays',
                    async:false,
                    dataType:'json',
                    data:{
                        clinicId:this.HuLiDanChaKan_detail.clinicId,

                    }
                })
            }
        },
        methods:{
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
                    url:url+'/dateUtil/getDateMapInfo',
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
            }
        },
        beforeMount:function () {
            $.ajax({
                type:'get',
                url:url+'/user/queryByclinicIdMed',
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
    .HuLiDanChaKan_detail{
        .tabTitle{
            width: 100%;
            box-sizing: border-box;
            white-space: nowrap;
            overflow-x: auto;
            padding: 0.1rem 0.1rem 0 0.05rem;
            font-size: 0.13rem;
            margin-top: 0.2rem;
            background-color: #fff;
            border-bottom: 0.01rem solid #E4E4E4;
            span{
                margin-right: 0.2rem;
                display: inline-block;
                padding: 0 0.02rem 0.09rem 0.02rem;
                border-bottom: 0.03rem solid transparent;
            }
            .checkSpan{
                color: #27B6F5;
                border-bottom: 0.03rem solid #27B6F5;
            }
        }
    }
</style>