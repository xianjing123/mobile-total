<template>
  <div>
    <Header>{{title}}</Header>
    <div class="detail">
      <DetailTable :datalist="datalist" :title="title" v-if="datalist.length"></DetailTable>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import DetailTable from "./Detail-table";
import DetailEcharts from "./Detail-echarts";
export default {
  data() {
    return {
      title: "",
      datalist: [] //第二个表格内容
    };
  },
  mounted() {
    this.$store.commit("commitShow", false);
    var datalist;
    var data = JSON.parse(localStorage.getItem("detail"));
    var id = this.$route.query.id;
    this.title = this.$route.query.name;
    // console.log(JSON.parse(localStorage.getItem("detail")));
    if (id === "泵站") {
      datalist = [
        { name: "硫化氢含量", value: data.h2S },
        { name: "氨气含量", value: data.nh3 },
        { name: "状态", value: data.status },
        { name: "运行时间", value: data.date },
        { name: "集水池液位", value: Number(data.value).toFixed(5) }
      ];
    } else if (id === "雨污") {
      datalist = [
        { name: "设备编号", value: data.code },
        { name: "管理单位", value: data.operationUnit },
        { name: "生产厂家", value: data.productionUnit },
        { name: "安装厂家", value: data.constructionUnit },
        { name: "目前状态", value: data.status },
        { name: "安装日期", value: data.createTime }
      ];
    } else if (id === "积水") {
      datalist = [
        { name: "设备编号", value: data.code },
        { name: "管理单位", value: data.operationUnit },
        { name: "生产厂家", value: data.productionUnit },
        { name: "安装单位", value: data.constructionUnit },
        { name: "当前水位", value: data.date },
        { name: "LED显示", value: "减速慢行" },
        { name: "采集时间", value: data.createTime }
      ];
    } else {
      datalist = [
        { name: "设备编号", value: data.code },
        { name: "管理单位", value: data.operationUnit },
        { name: "生产厂家", value: data.productionUnit },
        { name: "安装厂家", value: data.constructionUnit },
        { name: "目前状态", value: data.status },
        { name: "安装日期", value: data.createTime }
      ];
    }
    this.datalist = datalist;
  },
  destroyed() {
    this.$store.commit("commitShow", true);
  },
  components: {
    Header,
    DetailTable,
    DetailEcharts
  }
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 0 0.32rem;
  .echarts {
    margin: 0.3rem 0;
  }
}
</style>