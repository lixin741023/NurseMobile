<template>
    <div class="test8">

        <div  id="main" class="b" style="height: 2.5rem; border: 1px solid blue;"></div>

    </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        name: "test8",
        mounted:function () {
            let lx=echarts.init(document.querySelector('.b'));
            lx.setOption({
                series: {
                    type: 'sankey',
                    layout:'none',
                    left:'40%',
                    height:'50%',
                    data: [
                        {
                            name:'a',
                            itemStyle:{
                                color:'#96BFFF'
                            },
                            label:{
                                show:true,
                                formatter:'流动人数（31）'
                            },
                            emphasis:{
                                itemStyle:{
                                    color:'red'
                                }
                            }
                        },
                        {name:'a1',
                        left:300},
                        {name:'a2'},
                        {name:'a3'},
                        {name:'a4'},
                        {name:'a3_1'},
                        {name:'a3_2'},
                        {name:'a4_1'},
                        {name:'a4_2'},
                        {name:'a4_3'},
                    ],
                    links: [
                        {
                            source:'a',
                            target:'a1',
                            value:19,
                            left:300,
                            height:'30%'
                        },
                        {
                            source:'a',
                            target:'a2',
                            value:16
                        },
                        {
                            source:'a',
                            target:'a3',
                            value:12
                        },
                        {
                            source:'a',
                            target:'a4',
                            value:15
                        },
                        {
                            source:'a3',
                            target:'a3_1',
                            value:9
                        },
                        {
                            source:'a3',
                            target:'a3_2',
                            value:3
                        },
                        {
                            source:'a4',
                            target:'a4_1',
                            value:19
                        },
                        {
                            source:'a4',
                            target:'a4_2',
                            value:5
                        },
                        {
                            source:'a4',
                            target:'a4_3',
                            value:1
                        }
                    ]
                }
            })
        }
    }
</script>

<style scoped>

</style>