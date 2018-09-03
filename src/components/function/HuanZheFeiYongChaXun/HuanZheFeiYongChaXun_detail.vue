<template>
    <div class="HuanZheFeiYongChaXun_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>患者费用查看</span>
        </div>
        <div class="_global_HuanZheBox">
            <span>{{HuanZhe_Info.bedName}}床</span><!--stand by-->
            <span>{{HuanZhe_Info.name}}</span>
            <span>（{{HuanZhe_Info.sex}} {{HuanZhe_Info.age}}）</span>
            <span>{{HuanZhe_Info.clinicNum}}</span>
        </div>
        <div class="filter">
            <div>
                <span>筛选</span>
                <span>分类</span>
            </div>
            <div class="flex">
                <span>汇总</span>
                <mt-switch v-model="whether_summary"></mt-switch>
            </div>
        </div>
        <div class="moneyTotal">
            <div>
                <span>共计</span>
                <span>￥{{moneyTotal}}</span>
            </div>
            <span class="fa fa-calendar"></span>
        </div>
        <div class="box">
            <div class="a" v-show="whether_summary">
                <ul>
                    <li v-for="(a,b) in aData">
                        <span>{{a.costProjectTypeName}}</span>
                        <span>{{a.sum}}</span>
                    </li>
                </ul>
            </div>
            <div class="b" v-show="!whether_summary">
                <ul>
                    <li v-for="(a,b) in bData">
                        <div class="column1">
                            <span class="a">{{a.costProjectName}}</span>
                            <span class="b">{{a.number}}{{a.company}}*￥{{a.unitPrice}}</span>
                            <span class="c">{{a.creationTime}}</span>
                        </div>
                        <div class="column2">
                            <span>{{a.specs}}</span>
                        </div>
                        <div class="column3">
                            <span class="a">{{a.revenue}}</span>
                            <span class="b" v-show="!(a.remit==0)">减免：
                                <span>{{a.remit}}</span>
                            </span>
                            <span class="c" v-show="!(a.remit==0)">共计：{{a.receivable}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Switch } from 'mint-ui';
    Vue.component(Switch.name, Switch);
    import {con,url,tip} from "../../../js/global";
    export default {
        name: "HuanZheFeiYongChaXun_detail",
        props:['HuanZheFeiYongChaXun_detail'],
        data:()=>({
            moneyTotal:undefined,
            aData:[],
            bData:[],
            whether_summary:true,
            HuanZhe_Info:undefined
        }),
        methods:{
            R_back(){
                this.$router.go(-1);
            },
            get_aData(){
                let this_=this;
                $.ajax({
                    type:'get',
                    url:url+'/costProject/querySummary',
                    async:false,
                    dataType: 'json',
                    data:{
                        userId:sessionStorage.getItem('userId'),
                        clinicId:this.HuanZheFeiYongChaXun_detail.clinicId
                    },
                    success:function (data) {
                        con('汇总数据',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this_.aData=data.rows;
                            this_.moneyTotal=data.total;
                        }
                    }
                })
            },
            get_bData(){
                let this_=this;
                $.ajax({
                    type:'get',
                    url:url+'/costProject/queryListDetail',
                    async:false,
                    dataType:'json',
                    data:{
                        userId:sessionStorage.getItem('userId'),
                        clinicId:this.HuanZheFeiYongChaXun_detail.clinicId
                    },
                    success:function (data) {
                        con('明细数据',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this_.bData=data.rows;
                        }
                    }
                })
            }
        },
        watch:{
            whether_summary(a){
                if(a){
                    this.get_aData();
                }else{
                    this.get_bData();
                }
            }
        },
        beforeMount:function () {
            let this_=this;
            $.ajax({
                type:'get',
                url:url+'/user/queryByclinicIdMed',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId'),
                    clinicId:this.HuanZheFeiYongChaXun_detail.clinicId
                },
                success:function (data) {
                    con('患者信息',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this_.HuanZhe_Info=data.resultDomain;
                    }
                }
            })
            this.get_aData();
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .HuanZheFeiYongChaXun_detail{
        .componentsInit;
        .filter{
            color: #ccc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            height: 0.5rem;
            border-bottom: 0.01rem solid #E4E4E4;
            box-sizing: border-box;
            padding: 0 0.15rem;
            font-size: 0.13rem;
            .flex{
                display: flex;
                align-items: center;
                span{
                    font-size: 0.15rem;
                    color: #212529;
                    margin-right: 0.1rem;
                }
            }
        }
        .moneyTotal{
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #F5F5F5;
            border-bottom: 0.01rem solid #E4E4E4;
            box-sizing: border-box;
            font-size: 0.14rem;
            padding: 0.08rem 0.15rem;
            div{
                display: flex;
                flex-direction: column;
                line-height: 1.6;
            }
            .fa{
                font-size: 0.2rem;
            }
        }
        .box{
            overflow-y: auto;
            height: 4.5rem;
            background-color: #fff;
        }
        .a{
            ul{
                li{
                    display: flex;
                    justify-content: space-between;
                    padding: 0.1rem 0.2rem;
                    border-bottom: 0.01rem solid #F7F7F7;
                    font-size: 0.14rem;
                }
            }
        }
        .b{
            ul{
                li{
                    display: flex;
                    justify-content: space-around;
                    padding: 0.1rem 0.1rem;
                    border-bottom: 0.01rem solid #F7F7F7;
                    font-size: 0.13rem;
                    .column1{
                        /*background-color: red;*/
                        white-space: nowrap;
                        width: 1.45rem;
                        display: flex;
                        flex-direction: column;
                        line-height: 1.7;
                        .a{
                            font-size: 0.14rem;
                            font-weight: bold;
                        }
                        .b{

                        }
                        .c{
                            color: #BEBEBE;
                            font-size: 0.13rem;
                        }
                    }
                    .column2{
                        /*background-color: blue;*/
                        white-space: nowrap;
                        width: 0.75rem;
                        display: flex;
                        flex-direction: column;
                        line-height: 1.7;
                    }
                    .column3{
                        /*background-color: green;*/
                        white-space: nowrap;
                        width: 0.75rem;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        line-height: 1.7;
                        .a{
                            font-size: 0.16rem;
                            font-weight: bold;
                        }
                        .b{
                            span{color:blue}
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="less">
    .HuanZheFeiYongChaXun_detail{
        .filter{
            .mint-switch-core{
                width: 0.52rem;
                height: 0.32rem;
                &:before{
                    width: 0.5rem;
                    height: 0.3rem;
                }
                &:after{
                    width: 0.3rem;
                    height: 0.3rem;
                }
            }
        }
    }
</style>