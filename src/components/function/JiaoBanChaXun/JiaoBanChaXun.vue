<template>
    <div class="JiaoBanChaXun">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>交班查询</span>
        </div>
        <div class="nurseInfo">
            <span>张新你</span>
            <select name="" id="">
                <option value="">呼吸血液肿瘤科</option>
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
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Badge } from 'mint-ui';
    Vue.component(Badge.name, Badge);
    export default {
        name: "JiaoBanChaXun",
        data:()=>({
            whether_all:true
        }),
        methods:{
            R_back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .JiaoBanChaXun{
        .componentsInit;
        .nurseInfo{
            display: flex;
            justify-content: space-between;
            font-size: 0.14rem;
            padding: 0.08rem 0.1rem;
            background-color: #fff;
            border-bottom: 0.01rem solid #E4E4E4;
            select{
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
        }
    }
</style>
