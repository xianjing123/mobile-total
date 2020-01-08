module.exports = {
    devServer: {
        proxy:{
            '/arcgis':{
                target:'http://192.168.2.89:6080',
                changeOrigin:true
            }
        }
    }
}