import esriLoader from "esri-loader";
async function map() {
    var options = { url: "https://js.arcgis.com/4.13/" };
    var map, view
    await esriLoader.loadModules(
        [
            "esri/Map",
            "esri/Basemap",
            "esri/views/SceneView",
            "esri/layers/MapImageLayer"
        ],
        options
    ).then(([Map, Basemap, SceneView, MapImageLayer]) => {
        var basemap = new Basemap({
            baseLayers: [
                new MapImageLayer({
                    url:
                        "http://218.75.49.82:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/%E5%BA%95%E5%9B%BE/MapServer",
                    title: "Basemap"
                })
            ],
            title: "basemap",
            id: "basemap"
        });
        map = new Map({
            basemap: basemap
        });
        view = new SceneView({
            container: "viewDiv",
            map: map,
            spatialReference: {
                wkid: 4326
            },
            camera: {
                position: [119.94, 30.54, 20000]
            }
        });
        // 移除底部ESRI logo
        view.ui.remove("attribution");
        // 移除地图切换方式控件
        view.ui.empty("top-left");
    }).catch(err => {
        console.error(err);
    });
    return {
        map,
        view
    }
}
export default map