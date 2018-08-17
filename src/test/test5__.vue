<template>
    <div id="app">
        <input v-for="(item, index) in list" :key="index" v-model="list[index]" @change="print" />
    </div>
</template>

<script>
    export default {
        name: "test5",
        data:()=>({
            list:[11,22,33,44,55,66,77,88]
        }),
        methods:{
            print() {
                console.log(this.list);
            }
        }
    }
</script>

<style scoped lang="less">

</style>