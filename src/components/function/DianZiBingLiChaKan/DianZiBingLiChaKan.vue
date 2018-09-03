<template>
    <div class="DianZiBingLiChaKan">
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
                <li v-for="(a,b) in HuanZheList" @click="R_DianZiBingLiChaKan_detail(a)">
                    <div class="left">
                        <span class="name">{{a.name}}</span>
                        <span class="sex">{{a.sex}}</span>
                        <span class="year">{{a.age}}</span>
                        <span class="status" :class="{'red':whether_row1_special_red(a.doctorsId)}">{{a.doctors}}</span>
                        <span class="HuLi">{{a.nurseClass}}</span>
                    </div>
                    <span class="fa fa-chevron-right rightStyle"></span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import {url,tip,con} from "../../../js/global";

    export default {
        name: "DianZiBingLiChaKan",
        data:()=>({
            HuanZheList:undefined
        }),
        methods:{
            R_back(){
                this.$router.go(-1);
            },
            whether_row1_special_red(a){
                return !(a === '8c03350ef1cf5933829989b7bc109ea0' || a === 'cc82870c48c750ef873905adc8c38095');
            },
            get_HuanZheList_sync(){
                $.ajax({
                    type:'get',
                    url:url+'/emr/queryByNurseUserIdMed',
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
            R_DianZiBingLiChaKan_detail(obj){
                this.$router.push({
                    name:'DianZiBingLiChaKan_detail',
                    params:{
                        DianZiBingLiChaKan_detail:obj
                    }
                })
            }
        },
        beforeMount:function () {
            this.get_HuanZheList_sync();
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .DianZiBingLiChaKan{
        .componentsInit;
        .red{
            font-size: 0.14rem;
            font-weight: bold;
            color: red;
        }
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