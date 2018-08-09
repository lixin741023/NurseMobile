<template>
    <div class="test1">
        <p>test1</p>
        <div class="a" style="border: 1px solid red; ">
            <div class="b">
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
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name: "test1",
        mounted:()=>{
            new BScroll('.a')
        }
    }
</script>

<style scoped lang="less">

</style>