<template>
    <div class="JiaoBanChaXun_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>交班记录</span>
        </div>
        <div class="nurseInfo">
            <span>{{this.$store.state.operation.name}}</span>
            <span style="color: #666;">{{JiaoBanChaXun_detail.dateTime}}</span>
        </div>
        <div class="JiaoBan_overView">
            <div class="title">
                <span>交班概况</span>
                <div class="right">
                    <span style="color: #666;">{{title.name}}：</span>
                    <mt-badge size="normal" :style="{backgroundColor:title.color}">{{title.number}}</mt-badge>
                </div>
            </div>
            <div class="chart">
                <ul class="level">
                    <li class="level_1">
                        <div class="JinRu_box row">
                            <div @click="render_list('inHospitalMap','#B2E4A6')" class="JinRu_a textPadding">入院:{{AllData.inHospitalMap.count}}</div>
                            <div @click="render_list('rollInMap','#33BEE6')" class="JinRu_b textPadding">转入:{{AllData.rollInMap.count}}</div>
                        </div>
                    </li>
                    <li class="level_2">
                        <div @click="render_list('entryHospital','#FFC36A')" class="JinRu textPadding row">进入:{{AllData.entryHospital.count}}</div><div @click="render_list('originalPatient','#E16BB5')" class="YuanRenShu textPadding row">原人数:{{AllData.originalPatient.count}}</div>
                    </li>
                    <li class="level_3">
                        <div @click="render_list('allTransforRecod','#96BFFF')" class="RenYuan textPadding row ">流转人数:{{AllData.allTransforRecod.count}}</div>
                    </li>
                    <li class="level_4">
                        <div @click="render_list('leaveHospital','#FD848B')" class="LiKai textPadding row">离开:{{AllData.leaveHospital.count}}</div><div @click="render_list('currentPatient','#FB7293')" class="XianRenShu textPadding row">现人数:{{AllData.currentPatient.count}}</div>
                    </li>
                    <li class="level_5">
                        <div class="LiKai_box row">
                            <div @click="render_list('outHospitalMap','#B2E4A6')" class="LiKai_a textPadding">出院:{{AllData.outHospitalMap.count}}</div>
                            <div @click="render_list('rollOutMap','#52D5E5')" class="LiKai_b textPadding">转出:{{AllData.rollOutMap.count}}</div>
                            <div @click="render_list('deathMap','#37A2DB')" class="LiKai_c textPadding">死亡:{{AllData.deathMap.count}}</div>
                        </div>
                    </li>
                </ul>

            </div>
            <div class="total">
                <div class="row">
                    <span class="key">病危：<span class="value">{{BingWei_formatter}}</span></span>
                    <span class="key">病急：<span class="value">{{BingZhong_formatter}}</span></span>
                </div>
                <div class="row">
                    <span class="key">一级护理：<span class="value">{{HuLi_formatter}}</span></span>
                    <span class="key">手术：<span class="value">-</span></span>
                </div>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(a,b) in list">
                        <span class="a">{{a.bedName}}</span>
                        <span class="b">{{a.patientName}}</span>
                        <span class="c">（{{a.sexName}} {{a.age}}）</span>
                        <span class="d" :class="{red:whether_row1_special_red(a.diseaseConditionId)}">{{a.diseaseConditionName}}</span>
                        <span v-show="a.nurseClassId" class="e">一级护理</span>
                        <!--<span class="f">术</span>-->
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Badge } from 'mint-ui';
    Vue.component(Badge.name, Badge);
    import {con,tip} from "../../../js/global.js";
    export default {
        name: "JiaoBanChaXun_detail",
        props:['JiaoBanChaXun_detail'],
        data:()=>({
            AllData:{
                inHospitalMap:{
                    count:undefined
                },
                rollInMap:{
                    count:undefined
                },
                entryHospital:{
                    count:undefined
                },
                originalPatient:{count:undefined},
                allTransforRecod:{count:undefined},
                leaveHospital:{count:undefined},
                currentPatient:{count:undefined},
                outHospitalMap:{count:undefined},
                rollOutMap:{count:undefined},
                deathMap:{count:undefined}
            },
            title:{
                name:'流转人数',
                number:0,
                color:'#96BFFF'
            },
            list:[],
            url:''
        }),
        computed:{
            BingWei_formatter(){
                let z=0;
                for(let i=0; i<this.list.length; i++){
                    if(this.list[i].diseaseConditionId==='f2611eefd92a5997a202071ae2f92828'){
                        z++
                    }
                }
                return z;
            },
            BingZhong_formatter(){
                let z=0;
                for(let i=0; i<this.list.length; i++){
                    if(this.list[i].diseaseConditionId==='cc82870c48c750ef873905adc8c38095'){
                        z++
                    }
                }
                return z;
            },
            HuLi_formatter(){
                let z=0;
                for(let i=0; i<this.list.length; i++){
                    if(this.list[i].nurseClassId==='f1245228e841411da8913e9ada3b7480 '){
                        z++
                    }
                }
                return z;
            }
        },
        watch:{
            AllData(){
                this.title.name=this.AllData.allTransforRecod.text;
                this.title.number=this.AllData.allTransforRecod.count;
                this.list=this.AllData.allTransforRecod.children;
            }
        },
        methods:{
            whether_row1_special_red(a){
                return !(a === '8c03350ef1cf5933829989b7bc109ea0' || a === 'cc82870c48c750ef873905adc8c38095');
            },
            R_back(){
                this.$router.go(-1);
            },
            render_list(a,color){
                this.list=this.AllData[a].children;
                this.title.name=this.AllData[a].text;
                this.title.number=this.AllData[a].count;
                this.title.color=color;
            }
        },
        created:function(){
            this.url=this.$store.state.url;
        },
        beforeMount:function () {
            $.ajax({
                type:'post',
                url:this.url+'/nursingSuccession/queryHistorySwitchDetail',
                async:false,
                dataType:'json',
                data:{
                    nurSwitchRecodId:this.JiaoBanChaXun_detail.id,
                    userId:sessionStorage.getItem('userId')
                },
                success:(data)=>{
                    con('交班信息',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this.AllData=data.rows;
                    }
                }
            });
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .JiaoBanChaXun_detail{
        .componentsInit;
        .red{
            color: red;
        }
        .nurseInfo{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.14rem;
            padding: 0.08rem 0.1rem;
            background-color: #fff;
            border-bottom: 0.01rem solid #E4E4E4;
            select{
                background-color: transparent;
                font-size: 0.14rem;
                width: 1rem;
            }
        }
        .JiaoBan_overView{
            padding-bottom: 0.25rem;
            .title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.08rem 0.1rem;
                margin-top: 0.2rem;
                background-color: #fff;
                font-size: 0.14rem;
                .right{
                    display: flex;
                    align-items: center;
                    span{font-size: 0.14rem;}
                }
                border-bottom: 0.01rem solid #E4E4E4;
            }
            .chart{
                display: flex;
                justify-content: center;
                align-items: center;
                white-space: nowrap;
                width: 100%;
                overflow-x: scroll;
                height: 2.5rem;
                .level{
                    color: #fff;
                    font-size: 0.13rem;
                    .textPadding{
                        padding: 0.13rem 0;
                    }
                    .row{
                        text-align: center;
                    }
                    .level_1{
                        .JinRu_box{
                            display: flex;
                            width: 2rem;
                            .JinRu_a{
                                width: 50%;
                                background-color: #B2E4A6;
                            }
                            .JinRu_b{
                                width: 50%;
                                background-color: #33BEE6;
                            }
                        }
                    }
                    .level_2{
                        .JinRu{
                            display: inline-block;
                            width: 2rem;
                            background-color: #FFC36A;
                        }
                        .YuanRenShu{
                            display: inline-block;
                            width: 2rem;
                            background-color: #E16BB5;
                        }
                    }
                    .level_3{
                        .RenYuan{
                            width: 4rem;
                            background-color: #96BFFF;
                        }
                    }
                    .level_4{
                        .LiKai{
                            display: inline-block;
                            width: 2rem;
                            background-color: #FD848B;
                        }
                        .XianRenShu{
                            display: inline-block;
                            width: 2rem;
                            background-color: #FB7293;
                        }
                    }
                    .level_5{
                        .LiKai_box{
                            display: flex;
                            width: 2rem;
                            .LiKai_a{
                                width: calc(100%/3);
                                background-color: #B2E4A6;
                            }
                            .LiKai_b{
                                width: calc(100%/3);
                                background-color: #52D5E5;
                            }
                            .LiKai_c{
                                width: calc(100%/3);
                                background-color: #37A2DB;
                            }
                        }
                    }
                }
            }
            .total{
                background-color: #fff;
                border-bottom: 0.01rem solid #E4E4E4;
                font-size: 0.14rem;
                padding: 0.08rem 0.1rem;
                .row{
                    .key{
                        width: 1.5rem;
                        /*background-color: #27B6F5;*/
                    }
                    .value{
                        font-weight: bold;
                    }
                    margin-top: 0.05rem;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        .list{
            overflow-y: auto;
            height: 2.6rem;
            border-top: 0.01rem solid #E4E4E4;
            background-color: #fff;
            li{
                display: flex;
                align-items: center;
                position: relative;
                font-size: 0.13rem;
                height: 0.5rem;
                border-bottom: 0.01rem solid #E4E4E4;
                span{
                    position: absolute;
                }
                .a{left:0.1rem}
                .b{left:0.7rem}
                .c{left:1.3rem}
                .d{left:2.25rem;}
                .e{left:2.7rem; color: #ff0000;}
                .f{left:3.2rem; color:#27B6F5;font-weight: bold;}
                .g{right:0.1rem; color:#C5C5C5;display: none}
            }
        }
    }
</style>