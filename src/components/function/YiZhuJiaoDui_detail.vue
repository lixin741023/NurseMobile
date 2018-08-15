<template>
    <div class="YiZhuJiaoDui_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>校对医嘱</span>
        </div>
        <div>{{YiZhuJiaoDui_detail}}</div>
        <div class="HuanZhe_info">
            <span>12床</span>
            <span>张立科可</span>
            <span>（男 24岁）</span>
            <span>20180808222522</span>
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
                <li>
                    <div @click="enlarge()" class="name item">服维生素片</div>
                    <!--<div class="type item">药品</div>-->
                    <div @click="enlarge()" class="doctor item">医生姓名</div>
                    <div @click="enlarge()" class="KeShi item">门诊呼吸肿瘤科D</div>
                    <div class="number item">
                        <span class="a">+</span>
                        <input maxlength="3" class="b" type="number">
                        <span class="a">-</span>
                    </div>
                    <div class="unit item">盒盒</div>
                </li>
                <li>
                    <div class="name item">服维</div>
                    <!--<div class="type item">药品</div>-->
                    <div class="doctor item">医生名</div>
                    <div class="KeShi item">门诊肿瘤科</div>
                    <div class="number item">
                        <span class="a">+</span>
                        <span class="b">15</span>
                        <span class="a">-</span>
                    </div>
                    <div class="unit item">盒</div>
                </li>
                <li>
                    <div class="name item">服维</div>
                    <!--<div class="type item">药品</div>-->
                    <div class="doctor item">医生名</div>
                    <div class="KeShi item">门诊肿瘤科</div>
                    <div class="number item">
                        <span class="a">+</span>
                        <span class="b">105</span>
                        <span class="a">-</span>
                    </div>
                    <div class="unit item">盒</div>
                </li>
                <li>
                    <div class="name item">服维</div>
                    <!--<div class="type item">药品</div>-->
                    <div class="doctor item">医生名</div>
                    <div class="KeShi item">门诊肿瘤科</div>
                    <div class="number item">
                        <span class="a">+</span>
                        <span class="b">105</span>
                        <span class="a">-</span>
                    </div>
                    <div class="unit item">盒</div>
                </li>
            </ul>
        </div>

        <button class="JiaoDuiBtn">校对</button>
    </div>
</template>

<script>
    import { Checklist } from 'mint-ui';
    import Vue from 'vue';
    Vue.component(Checklist.name, Checklist);
    export default {
        name: "YiZhuJiaoDui_detail",
        props:['YiZhuJiaoDui_detail'],
        data:()=>({
            check_YiZhuList:[],
            YiZhuList:[
                {
                    label: '选项A',
                    value: '值A'
                },
                {
                    label: '选项B',
                    value: '值B'
                },
                {
                    label: '选项B',
                    value: '值C'
                },
                {
                    label: '选项B',
                    value: '值D'
                },
                {
                    label: '交付给偶尔个女交付给偶尔个女交付给偶尔个女交付给偶尔个女交付给偶尔个女交付给偶尔个女交付给偶尔个女交付给偶尔个女',
                    value: '值F',
                    disabled: true
                },
            ]
        }),
        methods:{
            R_back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .YiZhuJiaoDui_detail{
        .componentsInit;
        .HuanZhe_info{
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: #fff;
            height: 0.4rem;
            font-size: 0.13rem;
            border-bottom: 0.01rem solid #E4E4E4;
        }
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
                    background-color: aquamarine;
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
                    .a{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 0.25rem;
                        height: 100%;
                        border-left: 1px solid #D9D9D9;
                        border-right: 1px solid #D9D9D9;
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
