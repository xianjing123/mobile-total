import esriLoader from "esri-loader";
import map from './map'
function point () {
    var view = map()
    view.then(res=>{
        console.log(res)
    })
}

export {
    point
}