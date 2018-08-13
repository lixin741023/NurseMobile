<template>
    <div class="test4">

    <div style="position: relative; border: 2px solid blue">
       <ul class="q" style="width: 200px; height: 200px; border: 1px solid blue;">
           <div>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
               <li>1</li>
           </div>
       </ul>
    </div>

    </div>
</template>

<script>
    import BS from 'better-scroll';
    export default {
        name: "test4",
        methods:{
            test(dest){
                console.log(this.$router)
            }
        },
        mounted:function () {
            new BS('.q')
        }
    }
</script>

<style scoped lang="less">
    .q{
        position: absolute;
        left: 1rem;
        top: 3.5rem;
    }
</style>