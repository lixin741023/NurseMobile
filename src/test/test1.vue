<template>
    <div class="test1">
        <button @click="change_array">down</button>
        <select name="" id="" v-model="i">
            <option value="0">00</option>
            <option value="1">11</option>
            <option value="2">22</option>
            <option value="3">33</option>
        </select>
        <ul>
            <li v-for="(a,b) in arr">{{a}}</li>
        </ul>
        <hr>
        {{arr}}
        <hr>
        {{i}}
        <hr>
        {{arr[i]}}
        <hr>
        <button @click="down">down</button>
        <button @click="change">change</button>
        <div>0</div>
        <div v-for="(a,b) in lx">{{a}}</div>
        <hr>
        <input type="text" v-model="aaaa">
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    let i=0;
    export default {
        name: "test1",
        data:()=>({
            i:undefined,
            arr:[
                'a','b','c','d','e','f','g','h','i','j'
            ],
            lx:[]
        }),
        created:function () {
            this.i=2;
        },
        methods:{
            change_array(){
                i++;
                console.log(this.arr);
                this.arr[2]=i;
                console.log(this.arr);
            },
            down(){
                this.lx=[2,3,4,5,6,7,8];
                console.log(this.lx);
            },
            change(){
                this.lx=[22,33,44,55,66,77,88];
                console.log(this.lx);
            }
        },
        computed:{
            aaaa:{
                get(data){
                    console.log('lx');
                    console.log(data);
                    return  12
                },
                set(data){
                    console.log('wk');
                    console.log(data);
                    return data
                }
            }
        }
    }
</script>

<style scoped lang="less">

</style>