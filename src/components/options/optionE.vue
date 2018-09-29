<template>
    <div class="optionE">
        <div class="systemText">
            功能模块开发中……
        </div>
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

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .optionE{
        .componentsInit;
    }
</style>