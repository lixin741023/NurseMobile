<template>
    <div class="TiWenDanChaKan_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>体温单查看</span>
        </div>
        <div class="HuanZheInfo">
            <div class="row">
                <span class="key">
                    姓名：
                    <span class="value">{{HuanZheInfo.name}}</span>
                </span>
                <span class="key">
                    性别：
                    <span class="value">{{HuanZheInfo.sexName}}</span>
                </span>
                <span class="key">
                    年龄：
                    <span class="value">{{HuanZheInfo.patientAge}}</span>
                </span>
            </div>
            <div class="row">
                <span class="key">
                    床位：
                    <span class="value">{{HuanZheInfo.bedNumber}}</span>
                </span>
                <span class="key">
                    入院日期：
                    <span class="value">{{HuanZheInfo.joinTime}}</span>
                </span>
            </div>
            <div class="row">
                <span class="key">
                    病历号：
                    <span class="value">{{HuanZheInfo.number}}</span>
                </span>
            </div>
        </div>
        <div style="overflow: auto; padding-bottom: 0.5rem">
        <div class="chartBox2">
            <div id="main" style="width: 1000px;height: 1000px;"></div>
            <table class="headerTableData" width="795" cellpadding="0" cellspacing="0">
                <tr class="hosDate"> <!--住院日期-->
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="hosDay"> <!--住院天数-->
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="shuhouDay"> <!--术后天数-->
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <table class="breathTableData" width="795" cellpadding="0" cellspacing="0">
                <tr class="breathingsTr">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <table class="bloodData" width="795" cellpadding="0" cellspacing="0">
                <tr class="Blood">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <table class="footerTableData" width="795" cellpadding="0" cellspacing="0">
                <tr class="weight">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="cacationCoun">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="insertSize">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="outSize">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="urineSize">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <p class="cutLine"></p> <!--37℃分割线-->
            <div class="leftFrame"> <!--左侧划线-->
                <div class="leftFrameHeader">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div class="leftFrameFooter">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
        </div>
        <div class="control_page">
            <div @click="previousPage">上一页</div>
            <span>-{{nowPage}}-</span>
            <div @click="nextPage">下一页</div>
        </div>
    </div>
</template>

<script>
    import {drawThreeTestList} from "./render_Echarts";
    import {con,tip} from "../../../js/global";
    export default {
        name: "TiWenDanChaKan_detail",
        props:['TiWenDanChaKan_detail'],
        data:()=>({
            HuanZheInfo:{},
            nowPage:1,
            allPage:undefined,
            url:''
        }),
        methods:{
            R_back(){
                this.$router.go(-1);
            },
            previousPage(){
                if (this.nowPage <= 1) {
                    tip.failed('当前第一页',1500);
                } else if (this.nowPage >= 1) {
                    this.nowPage--;
                    drawThreeTestList(this.TiWenDanChaKan_detail.clinicId,this.nowPage);
                }
            },
            nextPage(){
                if (this.nowPage >= this.allPage) {
                    tip.failed('已是最后一页',1500);
                } else if (this.nowPage <= this.allPage) {
                    this.nowPage++;
                    drawThreeTestList(this.TiWenDanChaKan_detail.clinicId,this.nowPage);
                    // drawThreeTestList(clinicId, nowPage);
                }
            }
        },
        created:function(){
            this.url=this.$store.state.url;
        },
        beforeMount:function () {
            let this_=this;
            $.ajax({
                type:'get',
                url:this.url+'/threetest/findPaitientByClinicId',
                async:false,
                dataType:'json',
                data:{
                    clinicId:this.TiWenDanChaKan_detail.clinicId,
                    userId:sessionStorage.getItem('userId')
                },
                success:(data)=>{
                    con('患者信息',data);
                    if(data.error){
                        tip.failed(data.message,1500)
                    }else{
                        this_.HuanZheInfo=data.resultDomain;
                    }
                }
            });
            $.ajax({
                type:'get',
                url:this.url+'/threetest/findTttotalByClinicId',
                async:false,
                dataType:'json',
                data:{
                    clinicId:this.TiWenDanChaKan_detail.clinicId,
                    rows:7
                },
                success:(data)=>{
                    con('总页数',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this_.allPage=data.resultDomain;
                        this.nowPage=this.allPage;
                    }
                }
            })
        },
        mounted:function () {
            // this.render_charts(this.TiWenDanChaKan_detail.clinicId,this.nowPage);
            drawThreeTestList(this.TiWenDanChaKan_detail.clinicId,this.nowPage);
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .TiWenDanChaKan_detail{
        .componentsInit;
        .HuanZheInfo{
            background-color: #fff;
            margin-top: 0.2rem;
            padding: 0.1rem 0.1rem 0.1rem 0.1rem;
            border-bottom: 0.01rem solid #E4E4E4;
            .row:first-child{
                margin-top: 0;
            }
            .row{
                display: flex;
                justify-content: space-between;
                margin-top: 0.1rem;
                .key{
                    color: lighten(#212529,30%);
                }
                .value{
                    color: #212529;
                }
            }
        }
        .chartBox1{
            width: 100%;
            height: 4.1rem;
            margin-top: 0.2rem;
            background-color: #fff;
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            overflow: auto;
        }
        .chartBox2{
            position: relative;
            margin: 15px auto 0;
            width: 1000px;
            background-color: #fff;
            .headerTableData{
                font-size: 14px;
                position: absolute;
                top: 3px;
                left: 105px;
                td{
                    width: 14.2%;
                    text-align: center;
                    color: #333;
                }
            }
            .breathTableData{
                position: absolute;
                bottom: 135px;
                left: 103px;
                font-size: 12px;
                tr{
                    display: flex;
                    td{
                        margin: 0;
                        padding: 0;
                        width: 19px;
                        height:20px;
                        line-height: 20px;
                        text-align: center;
                        color: #333;
                    }
                }
            }
            .bloodData{
                position: absolute;
                bottom: 116.5px;
                left: 103px;
                font-size: 12px;
                color: #333;
                tr{
                    display: flex;
                    td{
                        width:57px;
                        text-align: center;
                    }
                }
            }
            .footerTableData{
                position: absolute;
                bottom: 12px;
                left: 103px;
                font-size: 12px;
                color: #333;
                tr{
                    display: flex;
                    height:20px;
                    td{
                        width: 114px;
                        text-align: center;
                    }
                }
            }
            .leftFrame{
                position: absolute;
                top: 1px;
                left: 0;
                width: 105px;
                height: 986px;
                border-left: 1px solid black;
            }
            .leftFrameHeader>p{
                margin: 0;
                height: 19px;
                border-top: 1px solid #000;
                /*border-right: 1px solid #000;*/
            }
            .leftFrameHeader>p:nth-of-type(4){
                height: 49px;
            }
            .leftFrameFooter{
                position: absolute;
                bottom: -18px;
                width: 104px;
            }
            .leftFrameFooter>p{
                margin: 0;
                height: 19px;
                border-top: 1px solid #000;
                /*border-right: 1px solid #000;*/
            }
            .leftFrameFooter>p:last-child{
                border-right: 0;
            }
        }
        .control_page{
            .fixedInit;
            border-top: 0.01rem solid #E4E4E4;
            bottom: 0;
            background-color: #fff;
            padding: 0.1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div{
                border: 0.01rem solid #65717e;
                color: #65717e;
                border-radius: 7px;
                padding: 0.05rem 0.1rem;
                &:active{
                    background-color: #27B6F5;
                    color: #fff;
                    border: 0.01rem solid #27B6F5;
                }
            }
        }
    }
</style>
