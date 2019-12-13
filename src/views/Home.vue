<template>
  <div>
    <Header>掌上市政平台</Header>
    <div id="viewDiv" ref="map"></div>
  </div>
</template>
 
<script>
import Header from "../components/Header";
import esriLoader from "esri-loader";
export default {
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
    Header
  }
};
</script>
<style scoped>
@import url("https://js.arcgis.com/4.13/esri/css/main.css");
#viewDiv {
  height: calc(100vh - 0.92rem);
  width: 100%;
}
</style>