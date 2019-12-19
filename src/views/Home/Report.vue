<template>
  <div>
    <Header>上报</Header>
    <div class="report">
      <div class="report-total">
        <div class="report-push" v-for="(data,index) in datalist" :key="index" @click="ReportTo(data.name)">
          <img :src="data.imgs" alt />
          <span>{{data.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  data() {
    return {
      datalist: [
        { name: "管线", imgs: "/imgs/report-line.png" },
        { name: "道路", imgs: "/imgs/report-road.png" },
        { name: "泵站", imgs: "/imgs/report-station.png" },
        { name: "积水", imgs: "/imgs/report-rain.png" },
        { name: "井盖", imgs: "/imgs/report-manhole.png" },
        { name: "雨污混排", imgs: "/imgs/report-pumping.png" }
      ] //路由导航
    };
  },
  methods:{
      //跳转上报
      ReportTo (name) {
        this.$router.push(`/home/report/map?name=${name}`)
      }
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.report {
  background:url("/imgs/report-background.png") no-repeat;
  background-size:cover;
  width: 100%;
  height: calc(100vh - 1.84rem);
  overflow: hidden;
  .report-total {
    padding: 0 1rem;
    box-sizing: border-box;
    width:100%;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .report-push {
      width: 1.42rem;
      height: 1.42rem;
      border-radius: 0.16rem;
      background: white;
      box-shadow: 0 0 10px 0px #555;
      position: relative;
      margin-top:1rem;
      img {
        width: 0.77rem;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      span {
        position: absolute;
        width:100%;
        text-align:center;
        left: 50%;
        bottom: -0.55rem;
        color: white;
        transform: translateX(-50%);
      }
    }
  }
}
</style>