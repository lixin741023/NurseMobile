<template>
    <div class="HuanZheFeiYongChaXun">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>选择患者</span>
        </div>
        <div class="_global_filter">
            <span>筛选</span>
            <span>分类</span>
        </div>
        <mt-loadmore :maxDistance="150" :bottom-method="loadBottom" :autoFill="false" ref="loadmore" class="HuanZhe_list">
            <ul>
                <li v-for="(a,b) in HuanZheList" @click="R_HuanZheFeiYongChaXun_detail(a)">
                    <div class="left">
                        <div class="row1">
                            <span class="name">{{a.name}}</span>
                            <span class="sex">{{a.sex}}</span>
                            <span class="year">{{a.age}}</span>
                            <span class="status" :class="{'red':whether_row1_special_red(a.conditionId)}">{{a.condition}}</span>
                            <span class="HuLi">一级护理</span>
                        </div>
                        <div class="row2 row2_true" :class="{'red_':whether_row2_special_red(a.sum)}">
                            {{a.sum|moneyAbout}}：
                            {{a.sum}}元
                        </div>
                    </div>
                    <span class="fa fa-chevron-right rightStyle"></span>
                </li>
            </ul>
        </mt-loadmore>

    </div>
</template>

<script>
    import Vue from 'vue';
    import { Loadmore } from 'mint-ui';
    import {url,tip,con} from "../../../js/global";

    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: "HuanZheFeiYongChaXun",
        data:()=>({
            HuanZheList:[],
        }),
        methods:{
            R_HuanZheFeiYongChaXun_detail(obj){
              this.$router.push({
                  name:'HuanZheFeiYongChaXun_detail',
                  params:{
                      HuanZheFeiYongChaXun_detail:obj
                  }
              })
            },
            whether_row2_special_red(money){
                if(money>=0){
                    return false
                }else{
                    return true
                }
            },
            whether_row1_special_red(a){
                return !(a === '8c03350ef1cf5933829989b7bc109ea0' || a === 'cc82870c48c750ef873905adc8c38095');
            },
            loadBottom(){

            },
            R_back(){
                this.$router.go(-1);
            }
        },
        filters:{
            moneyAbout(data){
                if(data>=0){
                    return '共计'
                }else{
                    return '欠费'
                }
            }
        },
        beforeMount:function () {
            let this_=this;
            $.ajax({
                type:'get',
                url:url+'/costProject/findCostListMed',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId')
                },
                success:function (data) {
                    con('患者列表',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this_.HuanZheList=data.resultDomains;
                    }
                }
            })
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .HuanZheFeiYongChaXun{
        .componentsInit;
        .red{
            font-size: 0.14rem;
            font-weight: bold;
            color: red;
        }
        .red_{
            color: red!important;
        }
        .HuanZhe_list{
            overflow-y: auto;
            height: 5.42rem;
            margin-top: 0.16rem;
            li{
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0.11rem;
                background-color: #fff;
                border-bottom: 0.01rem solid #F2F2F2;
                .row1{
                    position: relative;
                    width: 3.5rem;
                    height: 0.3rem;
                    display: flex;
                    align-items: flex-end;
                    span{
                        position: absolute;
                    }
                    .name{
                        font-weight: bold;
                        font-size: 0.16rem;
                        left: 0;
                    }
                    .sex{
                        left: 0.8rem;
                    }
                    .year{
                        left: 1.2rem;
                    }
                    .status{
                        left: 1.72rem;
                    }
                    .HuLi{
                        color: #968eff;
                        left: 2.3rem;
                    }
                }
                .row2{
                    margin-top: 0.08rem;
                    font-size: 0.12rem;
                }
                .row2_true{
                    color: #7A7A7A;
                }
                .row2_false{
                    color: red;
                }
                &:active{
                    background-color: @activeEvent;
                }
            }
        }
    }
</style>