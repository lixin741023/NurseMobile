var data = [
    [1, 10],
    [2, 20],
    [3, 30],
    [4, 40],
    [5, 50],
    [6, 60],
    [7, 70],
    [8, 80],
    [9, 90],
    [10,
        100],
    [11, 110],
    [12, 120],
    [13, 130],
    [14, 140],
    [15, 150],
    [16, 160],
    [17, 170],
    [18, 180],
    [19, 190],

    [20, 200],
    [21, 210],
    [22, 220],
    [23, 230],
    [24, 240],
    [25, 250],
    [26, 260],
    [27, 270],
    [28, 280],
    [29,
        290],
    [30, 300],
    [31, 310],
    [32, 320],
    [33, 330],
    [34, 340],
    [35, 350],
    [36, 360],
    [37, 370],
    [38, 380],

    [39, 390],
    [40, 400],
    [41, 410],
    [42, 420]
];

// See https://github.com/ecomfe/echarts-stat
var myRegression =
    ecStat.regression('exponential', data);

myRegression.points.sort(function(a, b) {
    return a[0] - b[0];
});

option = {
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
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        splitNumber:
            30
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
        data: data
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
};
