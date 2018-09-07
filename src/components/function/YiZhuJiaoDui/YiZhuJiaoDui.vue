<template>
    <div class="YiZhuJiaoDui">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>选择患者</span>
        </div>
        <div class="_global_filter">
            <span>筛选</span>
            <span>分类</span>
        </div>
        <div class="HuanZhe_list">
            <ul>
                <li v-for="(a,b) in HuanZheList" @click="R_YiZhuJiaoDui_detail(a)">
                    <div class="left">
                        <div class="row1 row">
                            <span class="name">{{a.name}}</span>
                            <span class="sex">{{a.sex}}</span>
                            <span class="year">{{a.age}}</span>
                            <span class="row1_special" :class="{'row1_special_red':whether_row1_special_red(a.conditionId)}">{{a.condition}}</span>
                            <span class="HuLi">三级护理</span>
                        </div>
                        <div class="row2 row">
                            <span class="title">医嘱：</span>
                            <span class="item">
                                <span>临时</span>
                                <span class="value">{{a.sNumber}}</span>
                            </span>
                            <span class="item">
                                <span>长期</span>
                                <span class="value">{{a.lNumber}}</span>
                            </span>
                        </div>
                        <div class="row3 row">
                            <span class="title">类型：</span>
                            <span v-for="(a,b) in a.advCate" class="item">
                                <span>{{a.value}}</span>
                                <span class="value">{{a.number}}</span>
                            </span>
                        </div>
                    </div>
                    <span class="fa fa-chevron-right rightStyle"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {tip,con} from '../../../js/global.js';
    import BScroll from 'better-scroll';
    export default {
        name: "YiZhuJiaoDui",
        data:()=>({
           HuanZheList:[],
           url:''
        }),
        mounted:function () {
            // new  BScroll('.HuanZhe_list')
        },
        methods:{
            get_HuanZheList_sync(){
                $.ajax({
                    type:'get',
                    url:this.url+'/performDoctorAdvice/findAdvInfoByUserId',
                    async:false,
                    dataType:'json',
                    data:{
                        userId:sessionStorage.getItem('userId')
                    },
                    success:(data)=>{
                        con('患者列表',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this.HuanZheList=data.resultDomains;
                        }
                    }
                })
            },
            whether_row1_special_red(a){
                return !(a === '8c03350ef1cf5933829989b7bc109ea0' || a === 'cc82870c48c750ef873905adc8c38095');
            },
            R_YiZhuJiaoDui_detail(obj){
                this.$router.push({name:'YiZhuJiaoDui_detail',params:{YiZhuJiaoDui_detail:obj}});
            },
            R_back(){
                this.$router.go(-1);
            }
        },
        created:function(){
            this.url=this.$store.state.url;
            this.url='http://7.0.0.114:8083/StarTrekMED';
        },
        beforeMount:function () {
            this.get_HuanZheList_sync();
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .YiZhuJiaoDui{
        .componentsInit;
        .HuanZhe_list{
            position: absolute;
            width: 100%;
            top:1.2rem;
            bottom: 0;
            background-color: #fff;
            overflow-y: auto;
            li{
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0.11rem;
                background-color: #fff;
                border-bottom: 0.01rem solid #F2F2F2;
                .left{
                    width: 3.5rem;
                    overflow-x: hidden;
                }
                .rightStyle{
                    color: #BDBDBD;
                }
                &:active{
                    background-color: @activeEvent;
                }
                .row1{
                    display: flex;
                    align-items: flex-end;
                    position: relative;
                    height: 0.2rem;
                    span{
                        position: absolute;
                    }
                    .name{
                        font-size: 0.16rem;
                        font-weight: bold;
                        left: 0;
                    }
                    .sex{
                        font-size: 0.12rem;
                        left: 0.8rem;
                    }
                    .year{
                        font-size: 0.12rem;
                        left: 1rem;
                    }
                    .row1_special{
                        font-size: 0.12rem;
                        left: 1.52rem;
                    }
                    .row1_special_red{
                        font-size: 0.14rem;
                        font-weight: bold;
                        color: red;
                    }
                    .HuLi{
                        font-size: 0.12rem;
                        color: #968EFF;
                        left: 2rem;
                    }
                }
                .row2{
                    display: flex;
                    align-items: flex-end;
                    height: 0.2rem;
                    font-size: 0.14rem;
                    color: #949494;
                    .item{
                        width: 0.65rem;
                        margin-right: 0.1rem;
                        .value{
                            /*font-weight: bold;*/
                            color: red;
                        }
                    }
                    .item:last-child{margin-right: 0}
                }
                .row3{
                    display: flex;
                    align-items: flex-end;
                    height: 0.2rem;
                    font-size: 0.14rem;
                    color: #949494;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .item{
                        margin-right: 0.1rem;
                        .value{
                            /*font-weight: bold;*/
                            color: red;
                        }
                    }
                    .item:last-child{margin-right: 0}
                }
                .row{
                    margin-top: 0.05rem;
                }
            }
        }
    }
</style>