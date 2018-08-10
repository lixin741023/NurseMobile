<template>
    <div class="test3">
        <p>{{arr.a.length}}</p>
        <p>{{arr.b.length}}</p>
        <button @click="a">+</button>
        <button @click="b">-</button>
        <p>{{x()}}</p>
    </div>
</template>

<script>
    export default {
        name: "test3",
        data:()=>({
            arr:{
                a:[1,2,3,4,5,6,7,8,9],
                b:['a','b','c','d','e','f']
            }
        }),
        methods:{
            a(){
                this.arr.a.push('i')
            },
            b(){
                this.arr.b.push('i')
            },
            x(){
                console.log(123)
                return this.arr.a.length
            }
        }
    }
</script>

<style scoped>

</style>