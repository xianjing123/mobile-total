import esriLoader from "esri-loader";
import map from './map'
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
function normalStation(node) {
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
        type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
        url: "/imgs/normal-station.png",
        width: '50px'
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
            node.style.transform = "translate(-43%,-95%)"
          } else {
            node.style.display = "none"
          }
        })
      })
    })
  })
}

export {
  point,
  normalStation
}