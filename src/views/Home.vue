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
        <div class="map-photo" :class="mapActive?'active':''" @click="mapActiveShow(true)">
          <div class="map-photo_active">
            <img src="/imgs/line.png" alt />
          </div>
          <img src="/imgs/map-active.png" alt class="map-active" />
          <span>管线</span>
        </div>
        <div class="map-photo" :class="mapActive?'':'active'" @click="mapActiveShow(false)">
          <div class="map-photo_active">
            <img src="/imgs/road.png" alt />
          </div>
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
          <div class="map-photo_active">
            <img :src="data.imgs" alt />
          </div>
          <img src="/imgs/map-active.png" alt class="map-active" />
          <span>{{data.name}}</span>
        </div>
      </div>
    </mt-popup>
    <Modal ref="modal" @navigation="navigationShow($event)" :data="data" :id="id" v-if="isModalShow"></Modal>
    <div class="navigation">
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
  </div>
</template>
 
<script>
import Header from "../components/Header";
import Modal from "./Home/Modal";
import axios from "axios";
import esriLoader from "esri-loader";
import map from './Home/js/map'
var serverGraphicsLayer;//管线图层
var pipeServer;//官线服务
var graphicsLayer;//泵站
var graphicsLayer1;//雨污混排
var graphicsLayer2;//积水
var graphicsLayer3;//井盖
export default {
  data() {
    return {
      name: "xxx监测点", //标题
      popupVisible: false, //侧边栏是否显示
      mapActive: false, //地图类型active
      mapActiveIndex: 0, //监测点active
      sheetVisible: false, //导航栏是否显示
      datalist: [
        { name: "泵站", imgs: "/imgs/pumping.png" },
        { name: "雨污混排", imgs: "/imgs/sewage.png" },
        { name: "积水", imgs: "/imgs/rain.png" },
        { name: "井盖", imgs: "/imgs/manhole.png" }
      ], //侧边栏内容
      actions: [
        {
          name: "高德地图",
          method: function() {
            location.href =
              "https://uri.amap.com/marker?position=119.977401,30.54251&name=德清";
          }
        }
      ], //导航栏内容
      data:null, //动态数据
      isModalShow:false, //是否显示弹出层
      id:""
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
      //this.$refs.modal.$el
      this.normalStation(
        "",
        this.mapActive,
        this.mapActiveIndex,
        true
      );
    },
    //上传
    monitorReport() {
      this.$router.push("/home/report");
    },
    //导航栏显示
    navigationShow(evt) {
      this.sheetVisible = evt;
    },
    //地图类型切换
    mapActiveShow(show) {
      this.mapActive = show;
      this.normalStation(
        "",
        this.mapActive,
        this.mapActiveIndex,
        true
      );
    },
    //地图点、道路渲染
    normalStation(node, mapActive, mapActiveIndex, active = true) {
      var that =this
      if (active) {
        if (mapActive) {
          //true为官网
          serverGraphicsLayer.visible = false;
          pipeServer.visible = true;
        } else {
          //false为道路
          serverGraphicsLayer.visible = true;
          pipeServer.visible = false;
        }
        //控制监测点
        if (mapActiveIndex === 0) {
          that.id = "泵站"
          graphicsLayer.visible = true;
          graphicsLayer1.visible = false;
          graphicsLayer2.visible = false;
          graphicsLayer3.visible = false;
        } else if (mapActiveIndex === 1) {
          that.id = "雨污"
          graphicsLayer.visible = false;
          graphicsLayer1.visible = true;
          graphicsLayer2.visible = false;
          graphicsLayer3.visible = false;
        } else if (mapActiveIndex === 2) {
          that.id = "积水"
          graphicsLayer.visible = false;
          graphicsLayer1.visible = false;
          graphicsLayer2.visible = true;
          graphicsLayer3.visible = false;
        } else {
          that.id = "井盖"
          graphicsLayer.visible = false;
          graphicsLayer1.visible = false;
          graphicsLayer2.visible = false;
          graphicsLayer3.visible = true;
        }
      } else {
        var esri = map();
        esri.then(res => {
          var map = res.map;
          var view = res.view;
          var options = { url: "https://js.arcgis.com/4.13/" };
          esriLoader
            .loadModules(
              [
                "esri/layers/GraphicsLayer",
                "esri/Graphic",
                "esri/layers/MapImageLayer",
                "esri/tasks/QueryTask",
                "esri/tasks/support/Query"
              ],
              options
            )
            .then(
              ([GraphicsLayer, Graphic, MapImageLayer, QueryTask, Query]) => {
                graphicsLayer = new GraphicsLayer(); //泵站
                map.add(graphicsLayer);

                graphicsLayer1 = new GraphicsLayer(); //雨污混排
                map.add(graphicsLayer1);

                graphicsLayer2 = new GraphicsLayer(); //积水
                map.add(graphicsLayer2);

                graphicsLayer3 = new GraphicsLayer(); //井盖
                map.add(graphicsLayer3);

                serverGraphicsLayer = new GraphicsLayer(); //道路
                map.add(serverGraphicsLayer);
                //官网服务
                pipeServer = new MapImageLayer({
                  url:
                    "http://218.75.49.82:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/%E7%AE%A1%E7%BD%91%E6%9C%80%E6%96%B0/MapServer",
                  title: "pipeServer"
                });
                map.add(pipeServer);

                function queryServer(url, name, type, color, layer) {
                  var urlName = url;
                  var SerQueryTask = new QueryTask({
                    url: urlName
                  });
                  var SerQuery = new Query();
                  // query.returnGeometry = true;
                  SerQuery.outFields = ["*"];
                  SerQuery.returnGeometry = true;
                  // query.where = "code='ZGD15'";  // Return all cities with a population greater than 1 million
                  SerQuery.where = "1=1"; // Return all cities with a population greater than 1 million
                  // When resolved, returns features and graphics that satisfy the query.
                  SerQueryTask.execute(SerQuery).then(function(results) {
                    var symbol = {
                      id: name,
                      type: type, // autocasts as new SimpleFillSymbol()
                      color: color,
                      style: "solid",
                      outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: color,
                        width: 1
                      }
                    };
                    let features = results.features;
                    // features1 = features[0].symbol = symbol
                    features = features.map(item => {
                      item.symbol = symbol;
                      // item.popupTemplate.remove()
                      return item;
                    });
                    layer.addMany(features);
                  });
                }
                var roadUrl1 =
                  "http://218.75.49.82:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/DQROAD1/MapServer/0";
                queryServer(
                  roadUrl1,
                  "road1",
                  "simple-fill",
                  [64, 114, 255, 0.7],
                  serverGraphicsLayer
                );

                var roadUrl2 =
                  "http://218.75.49.82:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/DQROAD1/MapServer/1";
                queryServer(
                  roadUrl2,
                  "road2",
                  "simple-fill",
                  [16, 213, 255, 0.7],
                  serverGraphicsLayer
                );

                var roadUrl3 =
                  "http://218.75.49.82:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/DQROAD1/MapServer/2";
                queryServer(
                  roadUrl3,
                  "road3",
                  "simple-fill",
                  [30, 233, 181, 0.7],
                  serverGraphicsLayer
                );

                if (mapActive) {
                  //true为官网显示
                  serverGraphicsLayer.visible = false;
                  pipeServer.visible = true;
                } else {
                  //false为道路显示
                  serverGraphicsLayer.visible = true;
                  pipeServer.visible = false;
                }

                var path =
                  "http://192.168.2.199:8080/station/TimeMonitoreController/getPumpMessage";
                var path1 =
                  "http://192.168.2.199:8080/sewage/timeMonitoring/getByPage";
                var path2 =
                  "http://192.168.2.199:8080/floodedRoad/timeMonitoring/getByPage";
                var path3 =
                  "http://192.168.2.199:8080/cover/timeMonitoring/getDeviceAndFacility";
                function http(url, number) {
                  var install = [], police = [], offline = []
                  var xhr = new XMLHttpRequest();
                  xhr.open("get", url, true);
                  xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) return;
                    if (xhr.status < 200 || xhr.status >= 300) return;
                    JSON.parse(xhr.responseText).data.forEach(item => {
                      if (item.status === "在线" || item.status === "运行" || item.status === "停止") {
                        if (item.warn || item.wid) {
                          police.push(item)
                        } else {
                          install.push(item)
                        }
                      } else if (item.status === "离线") {
                        offline.push(item)
                      }
                    });
                    layerPointer(install,"",number)
                    layerPointer(police,1,number)
                  };
                  xhr.send();
                }
                //ajax请求数据
                http(path, "")
                http(path1, 1);
                http(path2, 2);
                http(path3, 3);

                var markerSymbol = {
                  type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
                  url: "/imgs/normal-station.png",
                  width: "50px"
                };

                var markerSymbol1 = {
                  type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
                  url: "/imgs/police-station.png",
                  width: "50px"
                };

                //渲染点
                function layerPointer(arr, number, int) {
                  // console.log(arr)
                  arr.forEach(item => {
                    var point = {
                      type: "point", // autocasts as new Point()
                      x: item.longitude,
                      y: item.latitude
                    };
                    var pointGraphic = new Graphic({
                      geometry: point,
                      symbol: eval("markerSymbol" + number),
                      attributes: item
                    });
                    eval("graphicsLayer" + int).add(pointGraphic);
                  });
                }

                view.on("click", e => {
                  view.hitTest(e).then(res => {
                    if (res.results.length) {
                      if (res.results[0].graphic.geometry.type === "point") {
                        that.data = res.results[0].graphic.attributes
                        that.isModalShow = true
                        setTimeout(()=>{
                          that.$refs.modal.$el.lastChild.onclick = function () {
                            that.isModalShow = false
                          }
                          view.goTo(e.mapPoint);
                        },0)
                      }
                    } else {
                      that.isModalShow = false;
                    }
                  });
                });
                if (mapActiveIndex === 0) {
                  that.id = "泵站"
                  graphicsLayer.visible = true;
                  graphicsLayer1.visible = false;
                  graphicsLayer2.visible = false;
                  graphicsLayer3.visible = false;
                } else if (mapActiveIndex === 1) {
                  that.id = "雨污"
                  graphicsLayer.visible = false;
                  graphicsLayer1.visible = true;
                  graphicsLayer2.visible = false;
                  graphicsLayer3.visible = false;
                } else if (mapActiveIndex === 2) {
                  that.id = "积水"
                  graphicsLayer.visible = false;
                  graphicsLayer1.visible = false;
                  graphicsLayer2.visible = true;
                  graphicsLayer3.visible = false;
                } else {
                  that.id = "井盖"
                  graphicsLayer.visible = false;
                  graphicsLayer1.visible = false;
                  graphicsLayer2.visible = false;
                  graphicsLayer3.visible = true;
                }
              }
            );
        });
      }
    }
  },
  mounted() {
    this.normalStation(
      "",
      this.mapActive,
      this.mapActiveIndex,
      false
    );
  },
  components: {
    Header,
    Modal
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
      text-align: center;
      .map-photo_active {
        width: 1.38rem;
        margin: 0 auto;
        box-sizing: border-box;
        border: 2px solid rgba(163, 165, 167, 1);
        border-radius: 7px;
      }
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
      .map-photo_active {
        border: 2px solid rgba(33, 144, 255, 1);
        box-shadow: 0 0 10px 0 rgba(33, 144, 255, 0.3);
      }
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