<template>
    <div @touchstart="gtouchstart()" @touchmove="gtouchmove()" @touchend="gtouchend()">
        31231231
    </div>
</template>

<script>
    let timeOutEvent;
    export default {
        name: "test2",
        methods:{
            gtouchstart:function gtouchstart(item){
                timeOutEvent = setTimeout(function(){
                    timeOutEvent = 0;
                    console.log(1)
                },500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
                return false;
            },
            //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
            gtouchend:function gtouchend(item){
                clearTimeout(timeOutEvent);//清除定时器
                if(timeOutEvent!=0){
//这里写要执行的内容（尤如onclick事件）
                    console.log(2)
                }
                return false;
            },
            //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
            gtouchmove:function gtouchmove(){
                clearTimeout(timeOutEvent);//清除定时器
                timeOutEvent = 0;
            },
            //真正长按后应该执行的内容
            longPress:function longPress(item){
                timeOutEvent = 0;
                //执行长按要执行的内容，如弹出菜单
                $api.css($api.dom('.Popup'), 'display:block');
            }
        }
    }
</script>

<style scoped>

</style>





