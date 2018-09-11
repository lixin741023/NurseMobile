<template>
    <div class="bottomNav">
        <div class="item" @click="style('optionA',0)" :class="{'active':view[0]}">
            <img v-show="view[0]" src="../../images/optionA_check.png" alt="首页">
            <img v-show="!view[0]" src="../../images/optionA.png" alt="首页">
            <span class="activeSpan">首页</span>
        </div>
        <div class="item" @click="style('optionB',1)" :class="{'active':view[1]}">
            <img v-show="view[1]" src="../../images/optionB_check.png" alt="护理">
            <img v-show="!view[1]" src="../../images/optionB.png" alt="护理">
            <span class="activeSpan">护理</span>
        </div>
        <div class="item" @click="style('optionC',2)" :class="{'active':view[2]}">
            <img v-show="view[2]" src="../../images/optionC_check.png" alt="功能">
            <img v-show="!view[2]" src="../../images/optionC.png" alt="功能">
            <span class="activeSpan">功能</span>
        </div>
        <div class="item" @click="style('optionD',3)" :class="{'active':view[3]}">
            <img v-show="view[3]" src="../../images/optionD_check.png" alt="消息">
            <img v-show="!view[3]" src="../../images/optionD.png" alt="消息">
            <span class="activeSpan">消息</span>
        </div>
        <div class="item" @click="style('optionE',4)" :class="{'active':view[4]}">
            <img v-show="view[4]" src="../../images/optionE_check.png" alt="设置">
            <img v-show="!view[4]" src="../../images/optionE.png" alt="设置">
            <span class="activeSpan">设置</span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        name: "bottomNav",
        data:()=>({
            view:[],
        }),
        watch:{
            $route(a,b){
                this.viewControl(a.name);
            }
        },
        methods:{
            viewControl(currentRoute){
                switch (currentRoute) {
                    case 'optionA':this.view=[true,false,false,false,false];break;
                    case 'optionB':this.view=[false,true,false,false,false];break;
                    case 'optionC':this.view=[false,false,true,false,false];break;
                    case 'optionD':this.view=[false,false,false,true,false];break;
                    case 'optionE':this.view=[false,false,false,false,true];break;
                }
            },
            style(x,img){
                this.$router.push({
                    name:x
                });
            }
        },
        beforeMount:function () {
            this.viewControl(this.$route.name);
        }
    }
</script>

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .bottomNav{
        .active{
            color: #27B6F5;
        }
        .fixedInit;
        display: flex;
        justify-content: space-between;
        bottom: 0;
        box-sizing: border-box;
        padding: 0.09rem  0.1rem;
        border-top: 1.5px solid #F4F4F4;
        background-color: #fff;
        .item{
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                width: 0.3rem;
                height: 0.3rem;
            }
            span{
                margin-top: 0.05rem;
                font-size: 0.14rem;
            }
        }
    }
</style>