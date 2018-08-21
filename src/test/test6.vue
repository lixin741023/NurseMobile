<template>
    <div>
        <div>
            <span>params:</span>
            <div>{{x}}</div>
        </div>
        <button @click="f5">f5</button>
    </div>
</template>

<script>
    export default {
        name: "test6",
        props:['x'],
        methods:{
            f5(){
                this.$router.go(0)
                // console.log('iii');
                // this.$forceUpdate();
                // console.log('iiii');
            }
        },
        mounted:function () {
            console.log('IOOI')
        }
    }
</script>

<style scoped>

</style>