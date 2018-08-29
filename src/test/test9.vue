<template>
    <div class="chart" style="margin-top: 20px">
        <!--<div class="row1">-->
            <!--<span class="title standard_width">日期</span>-->
            <!--<span class="standard_width">2018-08-13</span>-->
            <!--<span class="standard_width">14</span>-->
            <!--<span class="standard_width">15</span>-->
            <!--<span class="standard_width">16</span>-->
            <!--<span class="standard_width">17</span>-->
            <!--<span class="standard_width">18</span>-->
            <!--<span class="standard_width">19</span>-->
            <!--<span class="standard_width">20</span>-->
        <!--</div>-->
        <!--<div class="row1">-->
            <!--<span class="title standard_width">住院天数</span>-->
            <!--<span class="standard_width">22</span>-->
            <!--<span class="standard_width">21</span>-->
            <!--<span class="standard_width">22</span>-->
            <!--<span class="standard_width">23</span>-->
            <!--<span class="standard_width">24</span>-->
            <!--<span class="standard_width">25</span>-->
            <!--<span class="standard_width">26</span>-->
            <!--<span class="standard_width">27</span>-->
        <!--</div>-->
        <!--<div class="row1">-->
            <!--<span class="title standard_width">术后天数</span>-->
            <!--<span class="standard_width">-->
                <!--<span style="width: 49%">-->
                    <!--<span style="width: 33%">4</span>-->
                    <!--<span style="width: 33%">8</span>-->
                    <!--<span style="width: 33%">12</span>-->
                <!--</span>-->
                <!--<span style="width: 49%">-->
                    <!--<span style="width: 33%">16</span>-->
                    <!--<span style="width: 33%">20</span>-->
                    <!--<span style="width: 33%">24</span>-->
                <!--</span>-->
            <!--</span>-->
            <!--<span class="standard_width">-->
                <!--<span style="width: 49%;">上午</span>-->
                <!--<span style="width: 49%;">下午</span>-->
            <!--</span>-->
            <!--<span class="standard_width"></span>-->
            <!--<span class="standard_width"></span>-->
            <!--<span class="standard_width"></span>-->
            <!--<span class="standard_width"></span>-->
            <!--<span class="standard_width"></span>-->
            <!--<span class="standard_width"></span>-->
        <!--</div>-->
        <div class="chart_core"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {testData} from "./3";
    import charts from 'echarts';
    export default {
        name: "test9",
        mounted:function () {
            let myCharts=charts.init(document.querySelector('.chart_core'));
            myCharts.setOption({
                title: {
                    text: '文字可更改',
                    subtext: 'By ecStat.regression',
                    sublink: 'https://github.com/ecomfe/echarts-stat',
                    left:
                        'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                xAxis: {
                    type: 'value',
                    position:'bottom',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    splitNumber:30
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }

                    }
                },
                series: [{
                    name: 'scatter',
                    type: 'scatter',
                    label: {
                        emphasis: {
                            show:
                                true,
                            position: 'left',
                            textStyle: {
                                color: 'blue',
                                fontSize: 16

                            }
                        }
                    },
                    data: testData
                }, {
                    name: 'line',
                    type: 'line',
                    showSymbol: false,

                    smooth: true,
                    data: myRegression.points,
                    markPoint: {
                        itemStyle: {
                            normal: {

                                color: 'transparent'
                            }
                        },
                        label: {
                            normal: {
                                show:
                                    true,
                                position: 'left',
                                formatter: myRegression.expression,
                                textStyle: {

                                    color: '#333',
                                    fontSize: 14
                                }
                            }
                        },

                        data: [{
                            coord: myRegression.points[myRegression.points.length - 1]
                        }]
                    }
                }]
            });
        }
    }
</script>

<style scoped lang="less">
    .chart{
        display: table;
        font-size: 12px;
        border: 1px solid black;
        width: 1600px;
        padding-bottom: 20px;
        .standard_width{
            width: 140px;
            height: 21px;
            line-height: 21px;
            text-align: center;
        }
        .row1{
            display: table;
            border-bottom: 1px solid black;
            span:last-child{
                border-right: 0;
            }
            span{
                float: left;
                border-right: 1px solid red;
                background-color: #27B6F5;
                display: inline-block;
            }
        }
    }
</style>