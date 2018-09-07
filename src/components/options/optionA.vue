<template>
    <div class="optionA" >
        <div class="topArea">
            <div class="search" v-show="whether_search_HuanZhe">
                <div class="a">
                    <span class="fa fa-search"></span>
                    <input maxlength="30" type="number" v-model="searchContent" placeholder="请输入患者腕带上的编号" >
                    <span v-show="searchContent.length!==0" @click="searchContent=''" class="fa fa-close"></span>
                </div>
                <ul v-show="searchContent.length>=8" class="searchResult">
                    <li class="x" v-for="(a,b) in searchResult" @click="makeSure_HuanZhe(a)">
                        <span>{{a.bedName}}床</span>
                        <span>{{a.name}}</span>
                        <span>{{a.sex}}</span>
                    </li>
                    <li v-show="searchResult.length===0" style="color: #c7c8c8;text-align: center">未查询到患者数据……</li>
                </ul>
                <img class="b" src="../../images/QRscan.png" >
            </div>
            <div class="HuanZhe" v-show="!whether_search_HuanZhe">
                <div class="a">
                    <div>
                        <span>{{HuanZhe_Info.bedName}}</span>
                        <span>{{HuanZhe_Info.name}}</span>
                        <span>（{{HuanZhe_Info.sex}} {{HuanZhe_Info.age}}）</span>
                        <span>{{HuanZhe_Info.number}}</span>
                    </div>
                    <img @click="cancel_HuanZhe" src="../../images/index_close.png" >
                </div>
            </div>
            <div class="top">
                <div v-for="(a,b) in mockData.resultDomain.top" class="topItem" @click="R_fun(a.url)">
                    <em>{{a.url}}</em>
                    <img :src="url+a.icon_white">
                    <span class="name">{{a.name|tooWidth}}</span>
                </div>
            </div>
        </div>
        <div class="often">
            <div v-for="(a,b) in mockData.resultDomain.often" class="oftenItem" @click="R_fun(a.url)">
                <em>{{a.url}}</em>
                <img :src="url+a.icon">
                <span class="name">{{a.name}}</span>
            </div>
            <router-link :to="{name:'optionC'}" tag="div" class="oftenItem">
                <em>optionC</em>
                <img src="../../images/oftenItem_more.png" >
                <span class="name">更多</span>
            </router-link>
        </div>
        <bottomNavBlock></bottomNavBlock>
    </div>
</template>

<script>
    import {con,tip,platform_YiHu} from "../../js/global";
    import bottomNav_block from '../nav/bottomNav_block.vue'

    export default {
        name: "optionA",
        data:()=>({
            HuanZhe_Info:{},
            searchResult:[],
            searchContent:'',
            mockData:undefined,
            url:''
        }),
        watch:{
            searchContent(a,b){
                if(this.searchContent.length>=8){
                    $.ajax({
                        post:'get',
                        url:this.url+'/user/queryByclinic',
                        async:true,
                        dataType: 'json',
                        data:{
                            userId:sessionStorage.getItem('userId'),
                            clinicNum:this.searchContent,
                        },
                        success:(data)=>{
                            con('患者搜索结果',data);
                            if(data.error){
                                tip.failed(data.message,1500);
                            }else{
                                this.searchResult=data.resultDomains;
                            }
                        }
                    })
                }
            }
        },
        components:{
            bottomNavBlock:bottomNav_block
        },
        methods:{
            R_fun(dest){
                this.$router.push({
                    name:dest
                })
            },
            makeSure_HuanZhe(a){
                this.$store.commit('makeSure_HuanZhe',a);
                this.HuanZhe_Info=this.$store.state.HuanZhe;
            },
            cancel_HuanZhe(){
                this.$store.commit('makeSure_HuanZhe',undefined);
                this.HuanZhe_Info={};
            }
        },
        computed:{
            whether_search_HuanZhe(){
                let a=JSON.stringify(this.HuanZhe_Info);
                if(a==="{}"){
                    console.log('空：展示搜索框');
                    return true
                }else{
                    console.log('非空：展示患者框');
                    return false
                }
            }
        },
        filters:{
            tooWidth(data){
                if(data.length>=6){
                    return data.substring(0,data.length-2)+'..'
                }else{
                    return data
                }
            }
        },
        created:function(){
            this.url=this.$store.state.url;
            this.url='http://7.0.0.114:8083/StarTrekMED';
        },
        beforeMount:function(){
            $.ajax({
                type:'get',
                url:this.url+'/operatorAddress/queryByUserId',
                async:false,
                dataType:'json',
                data:{
                    platformId:platform_YiHu,
                    userId:sessionStorage.getItem('userId')
                },
                success:(data)=>{
                    con('首页的第一个接口',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        console.log(this);
                        this.mockData=data;
                    }
                }
            });
            if(this.$store.state.HuanZhe){
                this.HuanZhe_Info=this.$store.state.HuanZhe;
            }
        },
        mounted:function(){

        },
    }
</script>

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .optionA{
        .componentsInit;
        .topArea{
            background-color: #27B6F5;
            padding-bottom: 10px;
            .search{
                position: relative;
                padding: 0 0.1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 0.4rem;
                .a{
                    display: flex;
                    align-items: center;
                    width: 3rem;
                    height: 0.32rem;
                    background-color: #25ADE9;
                    padding-left: 0.1rem;
                    span{
                        color: #1F92C4;
                        font-size: 0.16rem;
                    }
                    .fa-close{
                        color: #fff;
                        margin-left: 0.1rem;
                        font-size: 0.13rem;
                    }
                    input{
                        width: 80%;
                        color: #fff;
                        margin-left: 0.05rem;
                        background-color: transparent;
                        font-size: 0.14rem;
                        border: 0;
                        outline: none;
                        margin-top: 0.02rem;
                    }
                    input::-webkit-input-placeholder{
                        color:#fff;
                    }
                    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                        color:#fff;
                    }
                    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                        color:#fff;
                    }
                    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                        color:#fff;
                    }
                }
                .b{
                    width: 0.3rem;
                    height: 0.3rem;
                }
                .searchResult{
                    overflow-y: scroll;
                    max-height: 1.8rem;
                    z-index: 4;
                    background-color: #fff;
                    padding: 0 0.15rem;
                    /*border: 10px solid #27B6F5;*/
                    border: 1px solid #25ADE9;
                    left: 0.35rem;
                    top: 0.4rem;
                    width: 2.5rem;
                    position: absolute;
                    font-size: 0.14rem;
                    li{
                        position: relative;
                        padding: 0.09rem 0.1rem;
                        height: 0.15rem;
                        border-bottom: 0.01rem dashed #ccc;
                        &:last-child{
                            border: 0;
                        }
                        span{
                            position: absolute;
                        }
                        span:nth-child(1){
                            left: 0.1rem;
                        }
                        span:nth-child(2){
                            left: 0.9rem;
                        }
                        span:nth-child(3){
                            left: 1.9rem;
                        }
                    }
                    .x:active{
                        background-color: @activeEvent;
                    }
                }
            }
            .HuanZhe{
                padding: 0 0.1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 0.4rem;
                .a{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 4rem;
                    height: 0.32rem;
                    background-color: #25ADE9;
                    padding:0 0.1rem;
                    span{
                        font-size: 0.12rem;
                        color: #fff;
                    }
                    img{
                        width: 0.2rem;
                        height: 0.2rem;
                    }
                }
            }
            .top{
                margin-top: 0.12rem;
                display: flex;
                justify-content: space-around;
                .topItem{
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    position: relative;
                    width: 0.9rem;
                    height: 0.92rem;
                    &:active{
                        background-color: @activeEvent_theme;
                    }
                    img{
                        width: 0.4rem;
                        height: 0.4rem;
                    }
                    .name{
                        color: #fff;
                        font-size: 0.14rem;
                    }
                    em{
                        display: none;
                        position: absolute;
                        top: 10px;
                    }
                }
            }
        }
        .often{
            margin-top: 0.1rem;
            display: flex;
            flex-wrap: wrap;
            .oftenItem{
                margin-left: 0.11rem;
                box-sizing: border-box;
                padding-top: 0.07rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                position: relative;
                width: 1.1rem;
                height: 1.1rem;
                border: 1px solid #CDCDCD;
                border: 1px solid transparent;
                margin-bottom: 0.1rem;
                &:active{
                    background-color: @activeEvent;
                }
                img{
                    width: 0.4rem;
                    height: 0.4rem;
                }
                .name{
                    font-size: 0.14rem;
                }
                em{
                    display: none;
                    position: absolute;
                    top: 10px;
                }
            }
        }
    }
</style>