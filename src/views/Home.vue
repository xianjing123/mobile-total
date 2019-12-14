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
      <MonitorPopup>地图类型</MonitorPopup>
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
      <MonitorPopup>监测点</MonitorPopup>
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
  </div>
</template>
 
<script>
import Header from "../components/Header";
import esriLoader from "esri-loader";
import MonitorPopup from "./Home/monitor-popup";
export default {
  data() {
    return {
      popupVisible: false,
      mapActive: false,
      datalist: [
        { name: "泵站", imgs: "/imgs/pumping.png" },
        { name: "雨污混排", imgs: "/imgs/sewage.png" },
        { name: "积水", imgs: "/imgs/rain.png" },
        { name: "井盖", imgs: "/imgs/manhole.png" }
      ],
      mapActiveIndex: 0
    };
  },
  methods: {
    monitorType() {
      this.popupVisible = true;
    },
    mapActiveClick(index) {
      this.mapActiveIndex = index;
    },
    monitorReport() {
      this.$router.push('/home/report')
    }
  },
  mounted() {
    var options = { url: "https://js.arcgis.com/4.13/" };
    esriLoader
      .loadModules(
        [
          "esri/views/MapView",
          "esri/Map",
          "esri/Basemap",
          "esri/layers/MapImageLayer"
        ],
        options
      )
      .then(([MapView, Map, Basemap, MapImageLayer]) => {
        const map = new Map({
          basemap: "streets"
        });
        var view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 12,
          center: [119.94, 30.54]
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  components: {
    Header,
    MonitorPopup
  }
};
</script>
<style lang="scss" scoped>
@import url("https://js.arcgis.com/4.13/esri/css/main.css");
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
</style>