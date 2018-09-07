<template>
    <div class="bottomNav">
        <div class="item" @click="style('optionA','a')" :class="{'active':a}">
            <img v-show="a" src="../../images/optionA_check.png" alt="首页">
            <img v-show="!a" src="../../images/optionA.png" alt="首页">
            <span class="activeSpan">首页</span>
        </div>
        <div class="item" @click="style('optionB','b')" :class="{'active':b}">
            <img v-show="b" src="../../images/optionB_check.png" alt="护理">
            <img v-show="!b" src="../../images/optionB.png" alt="护理">
            <span class="activeSpan">护理</span>
        </div>
        <div class="item" @click="style('optionC','c')" :class="{'active':c}">
            <img v-show="c" src="../../images/optionC_check.png" alt="功能">
            <img v-show="!c" src="../../images/optionC.png" alt="功能">
            <span class="activeSpan">功能</span>
        </div>
        <div class="item" @click="style('optionD','d')" :class="{'active':d}">
            <img v-show="d" src="../../images/optionD_check.png" alt="消息">
            <img v-show="!d" src="../../images/optionD.png" alt="消息">
            <span class="activeSpan">消息</span>
        </div>
        <div class="item" @click="style('optionE','e')" :class="{'active':e}">
            <img v-show="e" src="../../images/optionE_check.png" alt="设置">
            <img v-show="!e" src="../../images/optionE.png" alt="设置">
            <span class="activeSpan">设置</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bottomNav",
        data:()=>({
            a:true,
            b:false,
            c:false,
            d:false,
            e:false
        }),
        methods:{
            style(x,img){
                let arr=['a','b','c','d','e'];
                this.$router.push({
                    name:x
                });
                for(let i=0; i<arr.length; i++){
                    if(img===arr[i]){
                        this[img]^=1;
                    }else{
                        this[arr[i]]=false;
                    }
                }
            }
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