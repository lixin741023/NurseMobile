<template>
    <div>
        <button @click="f5">f5</button>
    </div>
</template>

<script>
    export default {
        name: "test6",
        methods:{
            f5(){
                console.log('iii');
                this.$forceUpdate();
                console.log('iiii');
            }
        },
        mounted:function () {
            console.log('IOOI')
        }
    }
</script>

<style scoped>

</style>