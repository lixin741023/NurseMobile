<template>
    <div class="optionE">
        <p @click="i">optionE</p>

    </div>
</template>

<script>
    export default {
        name: "optionE",
        methods:{
            i(){
                let ob={
                    a:undefined
                };
                if(JSON.stringify(ob)==='{}'){
                    console.log(1)
                }else{
                    console.log(2)
                }
                // this.$store.commit('makeSure_HuanZhe',12)
            }
        }
    }
</script>

<style scoped>

</style>