<template>
    <div class="bottomNav">
        <router-link :to="{name:'optionA'}" class="item" tag="div">
            <img src="../../images/optionA_check.png" alt="首页">
            <span class="activeSpan">首页</span>
        </router-link>
        <router-link :to="{name:'optionB'}" class="item" tag="div">
            <img src="../../images/optionB_check.png" alt="护理">
            <span>护理</span>
        </router-link>
        <router-link :to="{name:'optionC'}" class="item" tag="div">
            <img src="../../images/optionC_check.png" alt="功能">
            <span>功能</span>
        </router-link>
        <router-link :to="{name:'optionD'}" class="item" tag="div">
            <img src="../../images/optionD_check.png" alt="消息">
            <span>消息</span>
        </router-link>
        <router-link :to="{name:'optionE'}" class="item" tag="div">
            <img src="../../images/optionE_check.png" alt="设置">
            <span>设置</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "bottomNav",
        methods:{

        }
    }
</script>

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .bottomNav{
        .router-link-active{
            color: #27B6F5;
        }
        .fixedInit;
        display: flex;
        justify-content: space-between;
        bottom: 0;
        box-sizing: border-box;
        padding: 0.05rem  0.1rem;
        border-top: 1.5px solid #F4F4F4;
        background-color: #fff;
        .item{
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                width: 0.4rem;
                height: 0.4rem;
            }
            span{
                margin-top: 0.05rem;
                font-size: 0.14rem;
            }
        }
    }
</style>