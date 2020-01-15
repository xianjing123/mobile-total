<template>
  <div>
    <Header>{{title}}</Header>
    <div class="detail">
      <DetailTable :datalist="station" :title="title" v-if="station.length"></DetailTable>
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
      station: [] //第二个表格内容
    };
  },
  mounted() {
    this.$store.commit("commitShow", false);
    var station;
    var data = JSON.parse(localStorage.getItem("detail"));
    var id = this.$route.query.id;
    this.title = this.$route.query.name;
    console.log(JSON.parse(localStorage.getItem("detail")));
    if (id === "泵站") {
      station = [
        { name: "硫化氢含量", value: data.h2S },
        { name: "氨气含量", value: data.nh3 },
        { name: "状态", value: data.status },
        { name: "运行时间", value: data.date },
        { name: "集水池液位", value: Number(data.value).toFixed(5) }
      ];
    } else if (id === "雨污") {
      station = [
        { name: "硫化氢含量", value: data.h2S },
        { name: "氨气含量", value: data.nh3 },
        { name: "状态", value: data.status },
        { name: "运行时间", value: data.date },
        { name: "集水池液位", value: Number(data.value).toFixed(5) }
      ];
    } else if (id === "积水") {
      station = [
        { name: "硫化氢含量", value: data.h2S },
        { name: "氨气含量", value: data.nh3 },
        { name: "状态", value: data.status },
        { name: "运行时间", value: data.date },
        { name: "集水池液位", value: Number(data.value).toFixed(5) }
      ];
    } else {
      station = [
        { name: "硫化氢含量", value: data.h2S },
        { name: "氨气含量", value: data.nh3 },
        { name: "状态", value: data.status },
        { name: "运行时间", value: data.date },
        { name: "集水池液位", value: Number(data.value).toFixed(5) }
      ];
    }
    this.station = station;
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