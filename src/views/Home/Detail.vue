<template>
    <div>
        <Header>{{title}}</Header>
        <div class="detail">
            <DetailTable :datalist="datalist" :title="title" v-if="datalist.length"></DetailTable>
            <DetailEcharts class="echarts"></DetailEcharts>
            <DetailTable :datalist="station" :title="title" v-if="station.length"></DetailTable>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header'
import DetailTable from './Detail-table'
import DetailEcharts from './Detail-echarts'
export default {
    data () {
        return {
            title:"舞阳泵站",
            datalist:[],
            station:[]
        }
    },
    mounted () {
        var datalist = ["设备编号","井盖编号","管理单位","生产厂家","安装单位","安装日期","目前状态","采集时间"]
        var station = ["硫化氢含量","氨气含量","状态","电流","运行时间","集水池液位"]
        datalist.forEach(item=>{
            this.datalist.push({name:item})
        })
        station.forEach(item=>{
            this.station.push({name:item})
        })
        this.$store.commit("commitShow",false)
    },
    destroyed () {
        this.$store.commit("commitShow",true)
    },
    components:{
        Header,
        DetailTable,
        DetailEcharts
    }
}
</script>

<style lang="scss" scoped>
    .detail {
        padding:0 0.32rem;
        .echarts {
            margin:0.3rem 0;
        }
    }
</style>