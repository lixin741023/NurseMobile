<template>
    <div class="SanCeDanLuRu_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>三测单录入</span>
        </div>
        <div class="_global_HuanZheBox">
            <span>22床</span>
            <span>苗琳</span>
            <span>（女 24岁）</span>
            <span>20180817222</span>
        </div>
        <div class="_global_HuanZheBox" style="margin-top: 0.16rem">
            <span>时间筛选</span>
        </div>

        <div class="tabTitle">
            <span v-for="(a,b) in tabTitle" :class="{'active_tabTitle':active===a.id}" @click="active=a.id">{{a.name}}</span>
        </div>
        <mt-tab-container v-model="active" class="tabContent">
            <mt-tab-container-item id="a" class="a" style="border: 1px solid red;">
                11
            </mt-tab-container-item>
            <mt-tab-container-item id="b" class="b" style="border: 1px solid red;">
                <div class="morning row">
                    <p>上午·血压</p>
                    <div>
                        <input type="number" placeholder="收缩压">
                        <span>/</span>
                        <input type="number" placeholder="舒张压">
                        <span>mmHg</span>
                    </div>
                </div>
                <div class="afternoon row">
                    <p>下午·血压</p>
                    <div>
                        <input type="number" placeholder="收缩压">
                        <span>/</span>
                        <input type="number" placeholder="舒张压">
                        <span>mmHg</span>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="c" class="c" style="border: 1px solid red;">
                3
            </mt-tab-container-item>
        </mt-tab-container>
        <button class="LuRuBtn">录入</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { TabContainer, TabContainerItem } from 'mint-ui';
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    export default {
        name: "SanCeDanLuRu_detail",
        data:()=>({
            tabTitle:[
                {
                    name:'三测信息',
                    id:'a'
                },
                {
                    name:'血压',
                    id:'b'
                },
                {
                    name:'出入量',
                    id:'c'
                }
            ],
            active:'b'
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
    .SanCeDanLuRu_detail{
        .componentsInit;
        .tabTitle{
            padding: 0.1rem 0 0 0;
            margin-top: 0.16rem;
            display: flex;
            justify-content: space-around;
            background-color: #fff;
            font-size: 0.13rem;
            border-bottom: 0.01rem solid #E4E4E4;
            span{
                padding: 0 0.1rem 0.08rem;
                border-bottom: 0.03rem solid transparent;
            }
            .active_tabTitle{
                border-bottom: 0.03rem solid #27B6F5;
            }
        }
        .tabContent{
            overflow-y: auto;
            border: 1px solid blue;
            height: 3.8rem;
            .a{}
            .b{
                background-color: #fff;
                .row{
                    margin-top: 0.2rem;
                    p{
                        padding-left: 0.08rem;
                        font-size: 0.14rem;
                        border-bottom: 0.01rem solid #EDEDED;
                        padding-bottom: 0.05rem;
                    }
                    div{
                        padding:0 0.08rem;
                        margin-top: 0.1rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        span{
                            font-size: 0.16rem;
                        }
                        input{
                            width: 1.3rem;
                            height: 0.33rem;
                            background-color: #E6E6E6;
                            padding-left: 0.12rem;
                            font-size: 0.16rem;
                        }
                    }
                }
            }
        }
        .LuRuBtn{
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
