<template>
    <div class="test11">
        <h2>animation>>></h2>

        <button @click="control">toggle</button>
        <hr>

        <transition name="test">
        <p v-if="whether_show_hidden"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias explicabo minus voluptatum! Beatae doloremque eligendi esse ex fugit illo inventore iure, laudantium necessitatibus neque numquam omnis, reiciendis sit soluta unde!</p>
        </transition>

    </div>
</template>

<script>
    export default {
        name: "test11",
        data:()=>({
            whether_show_hidden:1
        }),
        methods:{
            control(){
                this.whether_show_hidden^=1;
            }
        }

    }
</script>

<style scoped lang="less">
    p{
        margin-left: 50px;
    }
    .test-leave{
        /*margin-left: 100px;*/
    }
    /*.test-leave-active{*/
        /*transition: 2.5s;*/
        /*opacity: 0;*/
    /*}*/
    .test-leave-to{
        transition: 2.5s;
        opacity: 0;
        margin-left: 200px;
    }
</style>