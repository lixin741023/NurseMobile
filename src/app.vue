<template>
    <div class="app">
        <router-view></router-view>
        <bottomNav></bottomNav>
    </div>
</template>

<script>
    import bottomNav from './components/nav/bottomNav.vue';
    export default {
        components:{
            bottomNav
        },
        watch:{
            $route(a,b){

            }
        }
    }
</script>

<style scoped lang="less">
    @import url('./styles/custom.less');
    .app{
        .appInit;
        border-top: 1px solid red;
    }
</style>