<template>
    <div>
        <button @click="arr=[3,4,5,5]">change</button>
        <button @click="arr=[3,4,5,8]">change</button>
        <button @click="arr=[3,4,5,10]">change</button>
        <hr>
        <h2 v-for="(a,b) in arr">{{a}}</h2>

    </div>
</template>

<script>
    export default {
        name: "test10",
        data:()=>({
            arr:[1,2,3,4,5]
        })
    }
</script>

<style scoped>
    .LV1{
        border-bottom: 1px solid red;
    }
</style>