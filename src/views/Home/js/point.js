import esriLoader from "esri-loader";
import map from './map'
//公共状态
var active = false;
var graphicsLayer1;
var pipeServer;

function point(node) {
  var esri = map()
  esri.then(res => {
    var map = res.map;
    var view = res.view
    var options = { url: "https://js.arcgis.com/4.13/" };
    esriLoader.loadModules(
      [
        "esri/layers/GraphicsLayer",
        "esri/Graphic"
      ],
      options
    ).then(([GraphicsLayer, Graphic]) => {
      var graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      var point = {
        type: "point", // autocasts as new Point()
        x: 119.91766644773796,
        y: 30.54593674831524
      };

      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [38, 168, 162],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };

      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });
      graphicsLayer.add(pointGraphic);
      view.on('click', e => {
        view.hitTest(e).then(res => {
          if (res.results.length) {
            node.style.display = "block"
            node.style.left = res.screenPoint.x + 'px'
            node.style.top = res.screenPoint.y + 'px'
            node.style.transform = "translate(-43%,-30%)"
          } else {
            node.style.display = "none"
          }
        })
      })
      // view.on('drag', e => {
      //   view.hitTest(e).then(res => {
      //     if (node.style.display === "block") {
      //       console.log(res)
      //       node.style.left = res.screenPoint.x + 'px'
      //       node.style.top = res.screenPoint.y + 'px'
      //     }
      //   })
      // })
    })
  })
}

function normalStation(node, mapActive) {
  if (active) {
    if (mapActive) {//true为官网
      graphicsLayer1.visible = false
      pipeServer.visible = true
    } else {
      graphicsLayer1.visible = true
      pipeServer.visible = false
    }
  } else {
    active = true
    var esri = map()
    esri.then(res => {
      var map = res.map;
      var view = res.view
      var options = { url: "https://js.arcgis.com/4.13/" };
      esriLoader.loadModules(
        [
          "esri/layers/GraphicsLayer",
          "esri/Graphic",
          "esri/layers/MapImageLayer",
          "esri/tasks/QueryTask",
          "esri/tasks/support/Query",
        ],
        options
      ).then(([GraphicsLayer, Graphic, MapImageLayer, QueryTask, Query]) => {
        var graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        graphicsLayer1 = new GraphicsLayer();//道路
        map.add(graphicsLayer1);
        //官网服务
        pipeServer = new MapImageLayer({
          url: "http://218.75.49.82:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/%E7%AE%A1%E7%BD%91%E6%9C%80%E6%96%B0/MapServer",
          title: "pipeServer"
        })
        map.add(pipeServer)

        function queryServer(url, name, type, color, layer) {
          var urlName = url;
          var SerQueryTask = new QueryTask({
            url: urlName
          });
          var SerQuery = new Query();
          // query.returnGeometry = true;
          SerQuery.outFields = ["*"];
          SerQuery.returnGeometry = true
          // query.where = "code='ZGD15'";  // Return all cities with a population greater than 1 million
          SerQuery.where = "1=1"; // Return all cities with a population greater than 1 million
          // When resolved, returns features and graphics that satisfy the query.
          SerQueryTask.execute(SerQuery).then(function (results) {
            var symbol = {
              id: name,
              type: type, // autocasts as new SimpleFillSymbol()
              color: color,
              style: "solid",
              outline: { // autocasts as new SimpleLineSymbol()
                color: color,
                width: 1
              }
            }
            let features = results.features
            // features1 = features[0].symbol = symbol
            features = features.map(item => {
              item.symbol = symbol
              // item.popupTemplate.remove()
              return item
            })
            layer.addMany(features)
          });
        }
        var roadUrl1 = 'http://218.75.49.82:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/DQROAD1/MapServer/0';
        queryServer(roadUrl1, 'road1', "simple-fill", [64, 114, 255, 0.7], graphicsLayer1)

        var roadUrl2 = 'http://218.75.49.82:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/DQROAD1/MapServer/1';
        queryServer(roadUrl2, 'road2', "simple-fill", [16, 213, 255, 0.7], graphicsLayer1)


        var roadUrl3 = 'http://218.75.49.82:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/DQROAD1/MapServer/2';
        queryServer(roadUrl3, 'road3', "simple-fill", [30, 233, 181, 0.7], graphicsLayer1)

        if (mapActive) {//true为官网显示
          graphicsLayer1.visible = false
          pipeServer.visible = true
        } else {//false为道路显示
          graphicsLayer1.visible = true
          pipeServer.visible = false
        }
        var point = {
          type: "point", // autocasts as new Point()
          x: 119.91766644773796,
          y: 30.54593674831524
        };

        var markerSymbol = {
          type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
          url: "/imgs/normal-station.png",
          width: '50px'
        };

        var pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol
        });
        view.on('click', e => {
          view.hitTest(e).then(res => {
            if (res.results.length) {
              if(res.results[0].graphic.geometry.type==="point"){
                node.style.display = "block"
                view.goTo(e.mapPoint)
                node.lastChild.onclick = function () {
                  node.style.display = 'none'
                }
              }
            } else {
              node.style.display = "none"
            }
          })
        })
        graphicsLayer.add(pointGraphic);
      })
    })
  }
}

export {
  point,
  normalStation
}