<template>
    <div class="TiWenDanLuRu">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>选择患者</span>
        </div>
        <div class="_global_filter">
            <span>筛选</span>
            <span>分类</span>
        </div>

        <div class="HuanZhe_list">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false" >
                <li v-for="(a,b) in HuanZheList" @click="R_TiWenDanLuRu_detail(a)">
                    <div class="left">
                        <span class="name">{{a.patientName}}</span>
                        <span class="sex">{{a.patientSexName}}</span>
                        <span class="year">{{a.patientAge}}</span>
                        <span class="status" :class="{'red':whether_row1_special_red(a.conditionId)}">{{a.conditionName}}</span>
                        <span class="HuLi">{{a.nurseClass}}</span>
                    </div>
                    <span class="fa fa-chevron-right rightStyle"></span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import {url,con,tip} from "../../../js/global";
    import { InfiniteScroll } from 'mint-ui';
    import Vue from 'vue';
    Vue.use(InfiniteScroll);
    export default {
        name: "TiWenDanLuRu",
        data:()=>({
            loading:false,
            max_HuanZheList:1,
            rows_:10,
            page_:0,
            HuanZheList:[]
        }),
        methods:{
            whether_row1_special_red(a){
                return !(a === '8c03350ef1cf5933829989b7bc109ea0' || a === 'cc82870c48c750ef873905adc8c38095');
            },
            loadMore() {
                this.loading = false;
                this.loadMore_HuanZheList();
            },
            R_back(){
                this.$router.go(-1);
            },
            R_TiWenDanLuRu_detail(obj){
                this.$router.push({
                    name:'TiWenDanLuRu_detail',
                    params:{
                        TiWenDanLuRu_detail:obj
                    }
                })
            },
            loadMore_HuanZheList(){
                let this_=this;
                this.page_++;
                if(this.HuanZheList.length<this.max_HuanZheList){
                    $.ajax({
                        type:'get',
                        url:url+'/patientInfo/findPatientInfosByPage',
                        async:false,
                        dataType:'json',
                        data:{
                            rows:this.rows_,
                            page:this.page_,
                            // diseassAreaId:undefined病区ID
                            // condition姓名/住院号模糊查询
                            hosRegStatus:1,//住院状态: 1 在院,2 预出院,3 出院已结清,4 出院未结清
                            isOneself:0,// 个人或病区:0 个人,1 病区
                            userId:sessionStorage.getItem('userId')
                        },
                        success:function (data) {
                            con('患者列表',data);
                            if(data.error){
                                tip.failed(data.message,1500);
                            }else{
                                this_.max_HuanZheList=data.total;
                                for(let i=0; i<data.rows.length; i++){
                                    this_.HuanZheList.push(data.rows[i]);
                                }
                            }
                        }
                    })
                }else{
                    tip.failed('已经没有更多数据了哦');
                }
            }
        },
        beforeMount:function () {
            this.loadMore_HuanZheList();
        }
    }
</script>
<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .TiWenDanLuRu{
        .componentsInit;
        .red{
            font-size: 0.14rem;
            font-weight: bold;
            color: red;
        }
        .componentsInit;
        .HuanZhe_list{
            overflow-y: auto;
            height: 5.42rem;
            margin-top: 0.16rem;
            li{
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0.11rem;
                background-color: #fff;
                border-bottom: 0.01rem solid #F2F2F2;
                .left{
                    position: relative;
                    width: 3.5rem;
                    height: 0.5rem;
                    display: flex;
                    align-items: center;
                    span{
                        position: absolute;
                    }
                    .name{
                        font-weight: bold;
                        font-size: 0.16rem;
                        left: 0;
                    }
                    .sex{
                        left: 0.8rem;
                    }
                    .year{
                        left: 1.2rem;
                    }
                    .status{
                        left: 1.72rem;
                    }
                    .status_red{
                        color: red;
                        font-weight: bold;
                        font-size: 0.14rem;
                    }
                    .HuLi{
                        color: #968eff;
                        left: 2.3rem;
                    }
                }
                .rightStyle{
                    color: #BDBDBD;
                }
                &:active{
                    background-color: @activeEvent;
                }
            }
        }
    }
</style>