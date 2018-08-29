let BingQuJiaoBan_chart_1={
    series: {
        type: 'sankey',
        layout: 'none',
        data: [
            {
                name: '进入（12）'
            }, {
                name: '原人数（19）'
            }, {
                name: '转入（3）'
            }, {
                name: '入院（9）'
            }, {
                name: '流转人数（31）'
            }, {
                name: '现人数（16）'
            }, {
                name: '离开（15）'
            }, {
                name: '转出（5）'
            }, {
                name: '出院（9）'
            }, {
                name: '死亡（1）'
            }
        ],
        links: [
            {
                source: '转入（3）',
                target: '进入（12）',
                value: 3
            }, {
                source: '入院（9）',
                target: '进入（12）',
                value: 9
            }, {
                source: '进入（12）',
                target: '流转人数（31）',
                value: 12
            },
            {
                source: '原人数（19）',
                target: '流转人数（31）',
                value: 19
            }, {
                source: '流转人数（31）',
                target: '现人数（16）',
                value: 16
            }, {
                source: '流转人数（31）',
                target: '离开（15）',
                value: 15
            }, {
                source: '离开（15）',
                target: '转出（5）',
                value: 5
            }, {
                source: '离开（15）',
                target: '出院（9）',
                value: 9
            }, {
                source: '离开（15）',
                target: '死亡（1）',
                value: 1
            }]
    }
};
export {BingQuJiaoBan_chart_1};
