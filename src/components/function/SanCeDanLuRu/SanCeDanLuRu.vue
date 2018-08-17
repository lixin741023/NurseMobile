<template>
    <div class="SanCeDanLuRu">
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
                <li>
                    <div class="left">
                        <span class="name">留一手好</span>
                        <span class="sex">男</span>
                        <span class="year">124岁</span>
                        <span class="status">危重</span>
                        <span class="HuLi">三级护理</span>
                    </div>
                    <span class="fa fa-chevron-right rightStyle"></span>
                </li>
                <p @click="R_SanCeDanLuRu_detail()">进入</p>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SanCeDanLuRu",
        methods:{
            R_back(){
                this.$router.go(-1);
            },
            R_SanCeDanLuRu_detail(){
                this.$router.push({
                    name:'SanCeDanLuRu_detail',
                    params:{
                        SanCeDanLuRu_detail:'ASSD'
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .SanCeDanLuRu{
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
                        font-size: 0.16rem;
                        left: 0;
                    }
                    .sex{
                        left: 0.8rem;
                    }
                    .year{
                        left: 1rem;
                    }
                    .status{
                        left: 1.52rem;
                    }
                    .status_red{
                        color: red;
                        font-weight: bold;
                        font-size: 0.14rem;
                    }
                    .HuLi{
                        color: #968eff;
                        left: 2rem;
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