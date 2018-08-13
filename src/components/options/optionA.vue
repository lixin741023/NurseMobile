<template>
    <div class="optionA" >
        <div class="topArea">
            <div class="search" v-show="whether_search_HuanZhe">
                <div class="a">
                    <span class="fa fa-search"></span>
                    <input type="text" maxlength="50" v-model="searchContent" placeholder="请输入患者腕带上的编号" @keydown="executeSearch">
                </div>
                <ul class="searchResult">
                    <div>
                        <li>
                            <span>12床</span>
                            <span>张立科</span>
                            <span>男</span>
                        </li>
                        <li>
                            <span>13床</span>
                            <span>张立科</span>
                            <span>男</span>
                        </li>
                        <li>
                            <span>14床</span>
                            <span>张立科</span>
                            <span>女</span>
                        </li>
                    </div>
                </ul>
                <img class="b" src="../../images/QRscan.png" >
            </div>
            <div class="HuanZhe" v-show="!whether_search_HuanZhe">
                <div class="a">
                    <div>
                        <span>12床</span>
                        <span>张立科</span>
                        <span>（男 24岁）</span>
                        <span>20180823991230</span>
                    </div>
                    <img src="../../images/index_close.png" @click="whether_search_HuanZhe=true">
                </div>
            </div>
            <div class="top">
                <div v-for="(a,b) in mockData.resultDomain.top" class="topItem" @click="toFun(a.url)">
                    <em>{{a.url}}</em>
                    <img :src="url+a.icon_white">
                    <span class="name">{{a.name}}</span>
                </div>
            </div>
        </div>
        <div class="often">
            <div v-for="(a,b) in mockData.resultDomain.often" class="oftenItem">
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
    import {url,con,tip} from "../../js/global";
    import bottomNav_block from '../nav/bottomNav_block.vue';
    import BScroll from 'better-scroll';
    export default {
        name: "optionA",
        data:()=>({
            searchContent:'',
            whether_search_HuanZhe:true,
            mockData:{
                resultDomain:''
            },
            url:url
        }),
        components:{
            bottomNavBlock:bottomNav_block
        },
        methods:{
            executeSearch(){
                console.log(this.searchContent);
            },
            toFun(dest){
                this.$router.push({
                    name:dest
                })
            }
        },
        computed:{

        },
        beforeMount:function(){
            return;
            $.ajax({
                type:'get',
                url:url+'/operatorAddress/queryByUserId',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId')
                },
                success:(data)=>{
                    con('首页的第一个接口',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this.mockData=data;
                    }
                }
            });
        },
        mounted:function(){
            new BScroll('.searchResult',{click: true});
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
                    height: 1.5rem;
                    z-index: 4;
                    background-color: #fff;
                    padding: 0 0.15rem;
                    border: 1px solid #27B6F5;
                    left: 0.35rem;
                    top: 0.4rem;
                    width: 2.5rem;
                    position: absolute;
                    font-size: 0.14rem;
                    li{
                        padding: 0.09rem 0.1rem;
                        border-bottom: 0.01rem dashed #ccc;
                        span:nth-child(2){
                            margin-left: 0.2rem;
                            margin-right: 0.2rem;
                        }
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
                        width: 0.22rem;
                        height: 0.22rem;
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
                padding-top: 0.18rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                position: relative;
                width: 1.1rem;
                height: 1.1rem;
                border: 1px solid #CDCDCD;
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
                    /*display: none;*/
                    position: absolute;
                    top: 10px;
                }
            }
        }
    }
</style>