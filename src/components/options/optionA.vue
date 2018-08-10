<template>
    <div class="optionA">
        <div class="topArea">
            <div class="search">
                <div class="a">
                    <span class="fa fa-search"></span>
                    <input type="text" maxlength="50" placeholder="请输入患者腕带编号">
                </div>
                <img class="b" src="../../images/QRscan.png" >
            </div>
            <div class="HuanZhe"></div>
            <div class="top">
                <div class="topItem">
                    <em>XXX</em>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {url} from "../../js/global";

    export default {
        name: "optionA"
    }
</script>

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .optionA{
        .componentsInit;
        .topArea{
            background-color: #27B6F5;
            padding: 0 0.1rem;
            padding-bottom: 40px;
            .search{
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
                }
                .b{
                    width: 0.35rem;
                    height: 0.35rem;
                }
            }
        }
    }
</style>