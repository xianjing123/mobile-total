<template>
  <div>
    <Header>任务名称</Header>
    <div id="viewDiv" ref="map"></div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import esriLoader from "esri-loader";
export default {
  data() {
    return {};
  },
  components: {
    Header
  },
  mounted() {
    var options = { url: "https://js.arcgis.com/4.13/" };
    this.$store.commit("commitShow", false);
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
  destroyed() {
    this.$store.commit("commitShow", true);
  }
};
</script>

<style lang="scss" scoped>
#viewDiv {
  height: calc(100vh - 0.8rem);
  width: 100%;
}
</style>
