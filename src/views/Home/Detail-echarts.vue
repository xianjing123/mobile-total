<template>
    <div class="echarts">
        <div ref="echarts" class="echarts-photo"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    mounted () {
        var myChart = echarts.init(this.$refs.echarts);
        var option = {
            legend: {
                data: ['参数值'],
                align: 'left',
                x: "right"
            },
            xAxis: {
                type: 'category',
                name: "时间",
                boundaryGap: false,
                nameTextStyle:{
                    align:'center'
                },
                data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                name: "检测值",
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        type: 'dashed'
                    }
                }
            },
            series: [{
                name: "参数值",
                data: ["1","2","3","4","5","7","3"],
                type: 'line',
                areaStyle: {}
            }],
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: '#B1D6FD' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: 'white' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            },
            lineStyle: {
                color: "#3196FA"
            }
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}
</script>

<style lang="scss" scoped>
    .echarts{
        width:100%;
        .echarts-photo {
            width:100%;
            height:5rem;
        }
    }
</style>