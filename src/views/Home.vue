<template>
  <div class="monitor">
    <Header>掌上市政平台</Header>
    <div id="viewDiv" ref="map"></div>
    <div class="sliderbar">
      <div class="slider" @click="monitorType"></div>
      <div class="slider"></div>
    </div>
    <mt-popup v-model="popupVisible" position="right" class="monitor-popup">
      <MonitorPopup>地图类型</MonitorPopup>
      <div class="map-type">
        <div style="height:65px;width:65px;">
          <img src="/imgs/line.png" alt="" style="width:100%;">
        </div>
      </div>
      <MonitorPopup>监测点</MonitorPopup>
    </mt-popup>
  </div>
</template>
 
<script>
import Vue from "vue";
import Header from "../components/Header";
import esriLoader from "esri-loader";
import MonitorPopup from './Home/monitor-popup'
export default {
  data() {
    return {
      popupVisible: true
    };
  },
  methods: {
    monitorType() {
      this.popupVisible = true;
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
    width: 0.96rem;
    height: 0.96rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 10px rgba(228, 239, 251, 1);
    opacity: 1;
    border-radius: 0.48rem;
    margin-top: 0.2rem;
  }
}
.monitor-popup{
  width:4.76rem;
  height:calc(100vh - 1.84rem);
  background:white;
  top:49%;
  .map-type{
    height:2.2rem;
    padding-top:0.4rem;
    box-sizing:border-box;
  }
}
</style>