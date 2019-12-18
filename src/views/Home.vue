<template>
  <div class="monitor">
    <Header>掌上市政平台</Header>
    <div id="viewDiv" ref="map"></div>
    <div class="sliderbar">
      <div class="slider" @click="monitorType">
        <img src="/imgs/map-type.png" alt />
      </div>
      <div class="slider" @click="monitorReport">
        <img src="/imgs/report.png" alt />
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="right" class="monitor-popup">
      <div class="monitor-content">地图类型</div>
      <div class="map-type">
        <div class="map-photo" :class="mapActive?'active':''" @click="()=>{mapActive=true}">
          <img src="/imgs/line.png" alt />
          <img src="/imgs/map-active.png" alt class="map-active" />
          <span>管线</span>
        </div>
        <div class="map-photo" :class="mapActive?'':'active'" @click="()=>{mapActive=false}">
          <img src="/imgs/road.png" alt />
          <img src="/imgs/map-active.png" alt class="map-active" />
          <span>道路</span>
        </div>
      </div>
      <div class="monitor-content">监测点</div>
      <div class="map-type map-monitor">
        <div
          class="map-photo"
          v-for="(data,index) in datalist"
          :key="index"
          :class="index===mapActiveIndex?'active':''"
          @click="mapActiveClick(index)"
        >
          <img :src="data.imgs" alt />
          <img src="/imgs/map-active.png" alt class="map-active" />
          <span>{{data.name}}</span>
        </div>
      </div>
    </mt-popup>
    <div ref="chatBox" class="chat">
      <div class="chat-box">
        <span>{{name}}</span>
        <span @click="navigation">导航</span>
        <p @click="determine">详情</p>
      </div>
    </div>
    <div class="navigation">
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
  </div>
</template>
 
<script>
import Header from "../components/Header";
import { point } from "./Home/js/point";
export default {
  data() {
    return {
      name: "xxx监测点", //弹出层标题
      popupVisible: false, //侧边栏是否显示
      mapActive: false, //地图类型active
      datalist: [
        { name: "泵站", imgs: "/imgs/pumping.png" },
        { name: "雨污混排", imgs: "/imgs/sewage.png" },
        { name: "积水", imgs: "/imgs/rain.png" },
        { name: "井盖", imgs: "/imgs/manhole.png" }
      ], //侧边栏内容
      mapActiveIndex: 0, //监测点active
      sheetVisible: false, //导航状态
      actions: [
        {
          name: "百度地图",
          method: function() {
            console.log("百度地图");
          }
        },
        {
          name: "高德地图",
          method: function() {
            console.log("高德地图");
          }
        }
      ] //导航栏内容
    };
  },
  methods: {
    //地图类型切换
    monitorType() {
      this.popupVisible = true;
    },
    //监测点切换
    mapActiveClick(index) {
      this.mapActiveIndex = index;
    },
    //地图点点击
    determine() {
      this.$refs.chatBox.style.display = "none";
      this.$router.push(`/home/detail?name=${this.name}`);
    },
    //上传
    monitorReport() {
      this.$router.push("/home/report");
    },
    //导航栏
    navigation() {
      this.sheetVisible = true;
    }
  },
  mounted() {
    point(this.$refs.chatBox);
  },
  components: {
    Header
  }
};
</script>
<style lang="scss" scoped>
@import url("https://js.arcgis.com/4.13/esri/css/main.css");
@import url("../assets/css/map.css");
#viewDiv {
  position: absolute;
  top: 0.8rem;
  height: calc(100vh - 1.84rem);
  width: 100%;
}
.sliderbar {
  position: absolute;
  right: 0.2rem;
  top: 1rem;
  .slider {
    img {
      width: 1.5rem;
    }
  }
}
.monitor-popup {
  width: 4.76rem;
  height: calc(100vh - 1.84rem);
  background: white;
  top: 49%;
  .monitor-content {
    margin-top: 0.2rem;
    width: 100%;
    height: 0.68rem;
    background: rgba(50, 150, 250, 1);
    font-size: 0.36rem;
    color: white;
    line-height: 0.68rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
  }
  .map-type {
    height: 2.2rem;
    padding-top: 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .map-photo {
      position: relative;
      width: 1.3rem;
      border-radius: 7px;
      text-align: center;
      img:first-child {
        width: 1.3rem;
        display: block;
        margin: 0 auto;
      }
      .map-active {
        position: absolute;
        display: none;
        bottom: 0.6rem;
        left: 50%;
        transform: translateX(-50%);
      }
      span {
        color: rgba(163, 165, 167, 1);
        position: relative;
        top: 0.1rem;
      }
    }
    .active {
      .map-active {
        display: block;
      }
      span {
        color: black;
      }
    }
  }
  .map-monitor {
    height: auto;
    padding: 0;
    .map-photo {
      width: 50%;
      margin-top: 0.4rem;
    }
    .active {
      .map-active {
        bottom: 0.5rem;
      }
    }
  }
}
.chat {
  display: none;
  position: absolute;
  width: 5.5rem;
  .chat-box {
    width: 100%;
    height: 0.8rem;
    background: url("/imgs/chat-box.png") no-repeat;
    background-size: cover;
    display: flex;
    line-height: 0.8rem;
    padding-left: 0.4rem;
    font-size: 0.28rem;
    position: relative;
    p {
      height: 0.4rem;
      position: absolute;
      right: 0.4rem;
      top: 0.2rem;
      padding-left: 0.2rem;
      line-height: 0.4rem;
      border-left: 1px solid black;
      color: RGBA(50, 150, 250, 1);
      font-weight: bold;
    }
  }
}
</style>