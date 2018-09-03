<template>
    <div class="bottomNav_block" style="opacity: 0;">
        <div class="item">
            <img src="../../images/optionA_check.png" alt="首页">
            <span class="activeSpan">XX</span>
        </div>
        <div class="item">
            <img src="../../images/optionA_check.png" alt="首页">
            <span class="activeSpan">XX</span>
        </div>
        <div class="item">
            <img src="../../images/optionA_check.png" alt="首页">
            <span class="activeSpan">XX</span>
        </div>
        <div class="item">
            <img src="../../images/optionA_check.png" alt="首页">
            <span class="activeSpan">XX</span>
        </div>
        <div class="item">
            <img src="../../images/optionA_check.png" alt="首页">
            <span class="activeSpan">XX</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bottomNav_block",
        methods:{

        }
    }
</script>

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .bottomNav_block{
        .router-link-active{
            color: #27B6F5;
        }
        display: flex;
        justify-content: space-between;
        bottom: 0;
        box-sizing: border-box;
        padding: 0.05rem  0.1rem;
        border-top: 1.5px solid #F4F4F4;
        background-color: aquamarine;
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