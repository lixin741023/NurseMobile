<template>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" style="border: 1px solid blue;">
        <ul style="border: 1px solid red;">
            <li v-for="item in list">{{ item }}</li>
        </ul>
    </mt-loadmore>
</template>

<script>
    import { Loadmore } from 'mint-ui';
    import Vue from 'vue';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: "test7",
        data:()=>({
           list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
        }),
        methods:{
            loadTop(){
                console.log('loadTop');
            },
            loadBottom(){
                console.log('loadBottom');
            },
            allLoaded(){
                console.log('allLoaded');
            }
        }
    }
</script>

<style scoped>

</style>