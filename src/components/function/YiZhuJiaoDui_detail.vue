<template>
    <div class="YiZhuJiaoDui_detail">
        <div class="_global_normalHead">
            <router-link class="fa fa-chevron-left" tag="span" to="/"></router-link>
            <span>校对医嘱</span>
        </div>
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
    </div>
</template>

<script>
    export default {
        name: "YiZhuJiaoDui_detail"
    }
</script>

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .YiZhuJiaoDui_detail{
        .HuanZhe_info{
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: #fff;
            height: 0.4rem;
            font-size: 0.13rem;
            border-bottom: 0.01rem solid #E4E4E4;
        }
    }
</style>