<template>
    <div class="test13">
        {{a}}
        <hr>
        <div id="data"><font>2017年10月17日 15:11:11</font></div>


    </div>
</template>

<script>
    export default {
        name: "test13",
        data:()=>({
            a:123,
        }),
        methods:{
            showLocale(objD){
                var str, colorhead, colorfoot;
                var yy = objD.getYear();
                if (yy < 1900) yy = yy + 1900;  var MM = objD.getMonth() + 1;
                if (MM < 10) MM = '0' + MM;  var dd = objD.getDate();
                if (dd < 10) dd = '0' + dd;  var hh = objD.getHours();
                if (hh < 10) hh = '0' + hh;  var mm = objD.getMinutes();
                if (mm < 10) mm = '0' + mm;  var ss = objD.getSeconds();
                if (ss < 10) ss = '0' + ss;  var ww = objD.getDay();
                if (ww == 0) colorhead = "";
                if (ww > 0 && ww < 7) colorhead = "";
                str = colorhead + yy + "年" + MM + "月" + dd + "日 " + hh + ":" + mm + ":" + ss + " ";
                return (str);
            },
            tick() {
                var today;
                today = new Date();
                document.getElementById("new_data").innerHTML = this.showLocale(today);
                window.setTimeout("tick()", 1000);
            }
        },
        beforeMount:function () {
            this.tick();
        }
    }
</script>

<style scoped>

</style>