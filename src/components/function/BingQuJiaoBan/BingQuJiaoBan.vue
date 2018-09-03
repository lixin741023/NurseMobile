<template>
    <div class="BingQuJiaoBan">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>病区交班</span>
        </div>
        <div class="nurseInfo">
            <span>张新你</span>
            <select name="" id="" v-model="check_KeShi">
                <option v-for="(a,b) in KeShiList" :value="a.id">{{a.name}}</option>
            </select>
            <span>2018-08-23 10:39:23</span>
        </div>
        <div class="JiaoBan_overView">
            <div class="title">
                <span>交班概况</span>
                <div class="right">
                    <span>流转人数：</span>
                    <mt-badge size="normal">10</mt-badge>
                </div>
            </div>
            <div class="chart">

            </div>
            <div class="total">
                <div class="row">
                    <span class="key">病危：<span class="value">120</span></span>
                    <span class="key">病重：<span class="value">12</span></span>
                </div>
                <div class="row">
                    <span class="key">一级护理：<span class="value">122</span></span>
                    <span class="key">手术：<span class="value">892</span></span>
                </div>
            </div>
            <div class="list">
                <ul>
                    <li>
                        <span class="a">24床</span>
                        <span class="b">张明明</span>
                        <span class="c">（男 100岁）</span>
                        <span class="d">危</span>
                        <span class="e">一级护理</span>
                        <span class="f">术</span>
                        <span class="g fa fa-chevron-right"></span>
                    </li>
                    <li>
                        <span class="a">214床</span>
                        <span class="b">张明明</span>
                        <span class="c">（男 100岁）</span>
                        <span class="d">重</span>
                        <span class="e">一级护理</span>
                        <span class="f">术</span>
                        <span class="g fa fa-chevron-right"></span>
                    </li>
                    <li>
                        <span class="a">214床</span>
                        <span class="b">张明明</span>
                        <span class="c">（男 100岁）</span>
                        <span class="d">重</span>
                        <span class="e">一级护理</span>
                        <span class="f">术</span>
                        <span class="g fa fa-chevron-right"></span>
                    </li>
                    <li>
                        <span class="a">214床</span>
                        <span class="b">张明明</span>
                        <span class="c">（男 10岁）</span>
                        <span class="d">重</span>
                        <span class="e">一级护理</span>
                        <span class="f">术</span>
                        <span class="g fa fa-chevron-right"></span>
                    </li>
                    <li>
                        <span class="a">214床</span>
                        <span class="b">张明明</span>
                        <span class="c">（男 10岁）</span>
                        <span class="d">重</span>
                        <span class="e">一级护理</span>
                        <span class="f">术</span>
                        <span class="g fa fa-chevron-right"></span>
                    </li>
                    <li>
                        <span class="a">214床</span>
                        <span class="b">张明明</span>
                        <span class="c">（男 10岁）</span>
                        <span class="d">重</span>
                        <span class="e">一级护理</span>
                        <span class="f">术</span>
                        <span class="g fa fa-chevron-right"></span>
                    </li>
                    <li>
                        <span class="a">214床</span>
                        <span class="b">张明明</span>
                        <span class="c">（男 10岁）</span>
                        <span class="d">重</span>
                        <span class="e">一级护理</span>
                        <span class="f">术</span>
                        <span class="g fa fa-chevron-right"></span>
                    </li>
                </ul>
            </div>
            <button class="JiaoBanBtn">交班</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Badge } from 'mint-ui';
    Vue.component(Badge.name, Badge);
    import echarts from 'echarts';
    import {url,con,tip} from "../../../js/global.js";
    export default {
        name: "BingQuJiaoBan",
        data:()=>({
            BingQuJiaoBan_chart_1:{
                series: {
                    type: 'sankey',
                    layout:'none',
                    data: [
                        {
                            name:'a',
                        },
                        {
                            name:'a1'
                        },
                        {
                            name:'a2'
                        },
                        {
                            name:'a3'
                        },
                        {
                            name:'a3_1'
                        },
                        {
                            name:'a3_2'
                        },
                        {
                            name:'a4'
                        },
                        {
                            name:'a4_1'
                        },
                        {
                            name:'a4_2'
                        },
                        {
                            name:'a4_3'
                        },
                    ],
                    links: [
                        {
                            source:'a1',
                            target:'a',
                            value:1
                        },
                        {
                            source:'a3_1',
                            target:'a3',
                            value:1
                        },
                        {
                            source:'a3_2',
                            target:'a3',
                            value:1
                        },
                        {
                            source:'a3',
                            target:'a',
                            value:1
                        },
                        {
                            source:'a',
                            target:'a2',
                            value:1
                        },
                        {
                            source:'a',
                            target:'a4',
                            value:1
                        },
                        {
                            source:'a4',
                            target:'a4_1',
                            value:1
                        },
                        {
                            source:'a4',
                            target:'a4_2',
                            value:1
                        },
                        {
                            source:'a4',
                            target:'a4_3',
                            value:1
                        }
                    ]
                }
            },
            check_KeShi:undefined,
            KeShiList:[],
            whether_all:true
        }),
        watch:{
            check_KeShi(){
                this.query_JiaoBan();
            }
        },
        methods:{
            R_back(){
                this.$router.go(-1);
            },
            query_JiaoBan(){
                let this_=this;
                $.ajax({
                    type:'get',
                    url:url+'/nursingSuccession/queryNursingSuccessionMessage',
                    async:false,
                    dataType:'json',
                    data:{
                        diseassId:this.check_KeShi,
                        userId:sessionStorage.getItem('userId')
                    },
                    success:(data)=>{
                        con('交班信息',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            // Vue.set(this_.BingQuJiaoBan_chart_1.series.links,0,{
                            //     source:'a1',
                            //     target:'a',
                            //     value:19
                            // });
                            // Vue.set(this_.BingQuJiaoBan_chart_1.series.links[1],{
                            //     source:'a3_1',
                            //     target:'a3',
                            //     value:9
                            // });
                            // Vue.set(this_.BingQuJiaoBan_chart_1.series.links[2],{
                            //     source:'a3_2',
                            //     target:'a3',
                            //     value:3
                            // });
                            // Vue.set(this_.BingQuJiaoBan_chart_1.series.links[3],{
                            //     source:'a3',
                            //     target:'a',
                            //     value:12
                            // });
                            // Vue.set(this_.BingQuJiaoBan_chart_1.series.links[4],{
                            //     source:'a',
                            //     target:'a2',
                            //     value:16
                            // });
                            // Vue.set(this_.BingQuJiaoBan_chart_1.series.links[5],{
                            //     source:'a',
                            //     target:'a4',
                            //     value:15
                            // });
                            // Vue.set(this_.BingQuJiaoBan_chart_1.series.links[6],{
                            //     source:'a4',
                            //     target:'a4_1',
                            //     value:9
                            // });
                            // Vue.set(this_.BingQuJiaoBan_chart_1.series.links[7],{
                            //     source:'a4',
                            //     target:'a4_2',
                            //     value:5
                            // });
                            // Vue.set(this_.BingQuJiaoBan_chart_1.series.links[8],{
                            //     source:'a4',
                            //     target:'a4_3',
                            //     value:1
                            // });

                            this_.BingQuJiaoBan_chart_1.series.links[0].value=data.result.originalPatient.children.length;
                            this_.BingQuJiaoBan_chart_1.series.links[1].value=data.result.inHospitalMap.children.length;
                            this_.BingQuJiaoBan_chart_1.series.links[2].value=data.result.rollInMap.children.length;
                            this_.BingQuJiaoBan_chart_1.series.links[3].value=data.result.entryHospital.children.length;
                            this_.BingQuJiaoBan_chart_1.series.links[4].value=data.result.currentPatient.children.length;
                            this_.BingQuJiaoBan_chart_1.series.links[5].value=data.result.leaveHospital.children.length;
                            this_.BingQuJiaoBan_chart_1.series.links[6].value=data.result.outHospitalMap.children.length;
                            this_.BingQuJiaoBan_chart_1.series.links[7].value=data.result.rollOutMap.children.length;
                            this_.BingQuJiaoBan_chart_1.series.links[8].value=data.result.deathMap.children.length;
                            console.log(this_.BingQuJiaoBan_chart_1);
                            let myChart=echarts.init(document.querySelector('.chart'));
                            myChart.setOption(this.BingQuJiaoBan_chart_1);
                            return
                        }
                    }
                })
            }
        },
        beforeMount:function () {
            let this_=this;
            $.ajax({
                type:'get',
                url:url+'/nursingSuccession/findDisea',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId'),
                },
                success:(data)=>{
                    con('科室集合',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this_.KeShiList=data.resultDomains;
                        this_.check_KeShi=data.resultDomains[0].id;
                    }
                }
            });
        },
        mounted:function () {

        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .BingQuJiaoBan{
        .componentsInit;
        .nurseInfo{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.14rem;
            padding: 0.08rem 0.1rem;
            background-color: #fff;
            border-bottom: 0.01rem solid #E4E4E4;
            select{
                font-size: 0.14rem;
                width: 1rem;
            }
        }
        .JiaoBan_overView{
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
                width: 100%;
                height: 2.5rem;
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
                .d{left:2.25rem; color:#ff0000;}
                .e{left:2.5rem; color: #ff0000;}
                .f{left:3.2rem; color:#27B6F5;font-weight: bold;}
                .g{right:0.1rem; color:#C5C5C5;}
                &:active{
                    background-color: @activeEvent;
                    .g{color: #212529}
                }
            }
        }
        .JiaoBanBtn{
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
    }
</style>