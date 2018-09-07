<template>
    <div class="test12">

        <canvas id="lx" width='200' height="200" style="border: 1px solid blue;">

        </canvas>

    </div>
</template>

<script>
    export default {
        name: "test12",
        mounted:function () {
            let lx=document.getElementById('lx');
            let ctx=lx.getContext('2d');
            ctx.fillStyle="#ff0000";
            ctx.fillRect(10,20,100,50);
        }
    }
</script>

<style scoped>

</style>