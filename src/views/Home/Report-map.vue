<template>
  <div>
    <Header>上报</Header>
    <div id="viewDiv" ref="map"></div>
    <div class="problem">
      <div class="problem-title">{{name}}</div>
      <div class="problem-content">
        <p>{{name}}问题</p>
        <p>在地图确定问题位置</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import map from "./js/map";
import {point} from './js/point'
export default {
  data () {
		return {
			name:""
		}
	},
  mounted() {
    this.$store.commit("commitShow", false);
    this.name = this.$route.query.name
    point()
  },
  destroyed() {
    this.$store.commit("commitShow", true);
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
#viewDiv {
  position: absolute;
  top: 0.8rem;
  height: calc(100vh - 2.4rem);
  width: 100%;
}
.problem {
  height: 1.6rem;
  width: 100%;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  box-sizing: border-box;
  padding: 0.3rem 0 0 0.3rem;
  display: flex;
  .problem-title {
    width: 0.9rem;
    height: 0.9rem;
    border: 2px solid rgba(50, 150, 250, 1);
    border-radius: 50%;
    color: rgba(50, 150, 250, 1);
    line-height: 0.9rem;
    text-align: center;
		margin-right: 0.22rem;
		overflow: hidden;
  }
  .problem-content {
    height:0.94rem;
    box-sizing: border-box;
    padding-top:0.1rem;
    p:nth-of-type(1) {
      color: black;
      font-weight:bold;
    }
    p:nth-of-type(2) {
      font-size: 0.28rem;
      color: rgba(25, 31, 37, 1);
    }
  }
}
</style>