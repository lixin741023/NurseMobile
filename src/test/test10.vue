<template>
    <div class="LV1" v-for="(a,b) in allData">
        {{a}}
    </div>
</template>

<script>
    export default {
        name: "test10",
        data:()=>({
            allData:[
                {a:1,b:2,c:3,d:4,e:5,f:6,arr:[
                    11,22,33,44,55
                    ]},
                {a:1,b:2,c:3,d:4,e:5,f:6},
                {a:1,b:2,c:3,d:4,e:5,f:6}
            ]
        })
    }
</script>

<style scoped>

</style>