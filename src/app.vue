<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="less">
    @import url('./styles/custom.less');
    .app{
        .appInit;
        border-top: 1px solid red;
        border-bottom: 1px solid red;
    }
</style>