import esriLoader from "esri-loader";
import map from './map'
function point() {
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
        symbol: markerSymbol,
        attributes: {
          title: '正常设备',
          EquipmentNumber: 'JG002',
          HoleNumber: 'JG002',
          Company: '德清市政',
          Manufacturer: '浙江正元地理信息有限责任公司',
          Installer: '浙江正元地理信息有限责任公司',
          date: '2019/01/01',
          state: '正常'
        }
      });
      graphicsLayer.add(pointGraphic);
      view.on('hold', e => {
        view.hitTest(e).then(res => {
          const graphic = res.results[0].graphic
          var a = view.popup.open({
            location: graphic.geometry,
            content: report(graphic),
          });
          console.log(a)
        })
        // view.popup.open({
        //   title: "hahha",
        //   content: "aaaaaaaaa"  // content displayed in the popup
        // });
      })
    })
  })
}

function report(graphic) {
  return `<div id="mydiv">
    <div id="h1" style="background:linear-gradient(-90deg,rgba(176,225,241,1) 0%,rgba(15,156,149,1) 100%)">
      <span id="title">${graphic.attributes['title']}</span>
    </div>
    <div class="row">
      <div class="left">
        <span id="11" class="title1"> 设备编号:&nbsp&nbsp</span>
        <span id="value11" class="value1"> ${graphic.attributes['EquipmentNumber']}</span>
        </div>              
    </div>
    <div class="row">
      <div class="left">
        <span id="11" class="title1">井盖编号:&nbsp&nbsp</span>
        <span id="value11" class="value1"> ${graphic.attributes['HoleNumber']}</span>
        </div>              
    </div>
    <div class="row">
      <div class="left">
        <span id="11" class="title1">管理单位:&nbsp&nbsp</span>
        <span id="value11" class="value1"> ${graphic.attributes['Company']}</span>
        </div>              
    </div>
    <div class="row change" >
      <div class="left">
        <span id="11" class="title1">生产厂家:&nbsp&nbsp</span>
        <span id="value11" class="content">${graphic.attributes['Manufacturer']}</span>
        </div>              
    </div>
    <div class="row change" >
      <div class="left">
        <span id="11" class="title1"> 安装单位:&nbsp&nbsp</span>
        <span id="value11" class="content"> ${graphic.attributes['Installer']}</span>
        </div>              
    </div>
    <div class="row">
      <div class="left">
        <span id="11" class="title1"> 安装日期:&nbsp&nbsp</span>
        <span id="value11" class="value1"> ${graphic.attributes['date']}</span>
        </div>              
    </div>
    <div class="row change1">
      <div class="left">
        <span id="11" class="title1"> 目前状态:&nbsp&nbsp</span>
        <span id="value11" class="value1"> ${graphic.attributes['state']}</span>
        </div>              
    </div>
  </div>`
}
export {
  point
}