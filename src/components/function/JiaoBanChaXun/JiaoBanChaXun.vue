<template>
    <div class="JiaoBanChaXun">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>选择查看交班记录</span>
        </div>
        <div class="_global_filter">
            <span>筛选</span>
            <span>分类</span>
        </div>
        <ul class="JiaoBan_List">
            <li v-for="(a,b) in list" @click="R_JiaoBanChaXun_detail(a.nurseSwitchRecodId,a.takeTime)">
                <div class="row1">
                    <span>{{a.diseaseAreaName}}</span>
                    <span>{{a.takeTime}}</span>
                </div>
                <div class="row2">
                    <div>
                        <span>原有</span>
                        <span>{{a.originalPatientCount}}</span>
                    </div>
                    <div>
                        <span>转入</span>
                        <span>{{a.turnInCount}}</span>
                    </div>
                    <div>
                        <span>入院</span>
                        <span>{{a.inHospitalCount}}</span>
                    </div>
                    <div>
                        <span>出院</span>
                        <span>{{a.outHospitalCount}}</span>
                    </div>
                    <div>
                        <span>转出</span>
                        <span>{{a.turnOutCount}}</span>
                    </div>
                    <div>
                        <span>死亡</span>
                        <span>{{a.deadCount}}</span>
                    </div>
                    <div>
                        <span>在院</span>
                        <span>{{a.onHospitalCount}}</span>
                    </div>

                </div>
            </li>

        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Badge } from 'mint-ui';
    import {con,tip} from "../../../js/global";

    Vue.component(Badge.name, Badge);
    export default {
        name: "JiaoBanChaXun",
        data:()=>({
            url:'',
            list:[]
        }),
        methods:{
            R_back(){
                this.$router.go(-1);
            },
            R_JiaoBanChaXun_detail(id,dateTime){
                let obj={
                    id:id,
                    dateTime:dateTime
                }
                this.$router.push({
                    name:'JiaoBanChaXun_detail',
                    params:{
                        JiaoBanChaXun_detail:obj
                    }
                })
            }
        },
        created:function(){
            this.url=this.$store.state.url;
        },
        beforeMount:function () {
            $.ajax({
                type:'get',
                url:this.url+'/nursingSuccession/queryHisSubmit',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId')
                },
                success:(data)=>{
                    con('交班记录列表',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this.list=data.resultDomains;
                    }
                }
            })
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .JiaoBanChaXun{
        .componentsInit;
        .JiaoBan_List{
            position: absolute;
            width: 100%;
            top:1.2rem;
            bottom: 0;
            background-color: #fff;
            overflow-y: auto;
            li{
                padding: 0.11rem;
                box-sizing: border-box;
                background-color: #fff;
                border-bottom: 0.02rem solid #f2f2f2;
                .row1{
                    display: flex;
                    justify-content: space-between;
                    span:nth-child(1){
                        font-size: 0.15rem;
                        font-weight: bold;
                    }
                    span:nth-child(2){
                        font-size: 0.13rem;
                        color: #666;
                    }
                }
                .row2{
                    display: flex;
                    margin-top: 15px;
                    justify-content: space-between;
                    div{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        span:nth-child(2){
                            color: #666;
                        }
                    }
                }
                &:active{
                    background: @activeEvent;
                }
            }
        }
    }
</style>
