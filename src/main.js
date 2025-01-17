import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as dd from 'dingtalk-jsapi'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/Allmint.css'
import echarts from 'echarts'
import axios from 'axios'
// import weekSlider from 'v-week-slider'
// Vue.use(weekSlider)
Vue.prototype.axios = axios;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(MintUI)
console.log(dd.ready)
// dd.config({
//   agentId: '', // 必填，微应用ID
//   corpId: '',//必填，企业ID
//   timeStamp: '', // 必填，生成签名的时间戳
//   nonceStr: '', // 必填，生成签名的随机串
//   signature: '', // 必填，签名
//   type:0/1,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
//   jsApiList : [] // 必填，需要使用的jsapi列表，注意：不要带dd。
// });

// dd.ready(function() {
// dd.runtime.permission.requestAuthCode({
//     corpId: _config.corpId, // 企业id
//     onSuccess: function (info) {
//               code = info.code // 通过该免登授权码可以获取用户身份
//     }});
// })
// FastClick.prototype.onTouchStart = function (event) {



//   let e = event || window.event

//   e.stopPropagation() // 阻止事件的进一步传播，包括（冒泡，捕获），无参数

//   e.cancelBubble = true

// }

// FastClick.prototype.onTouchMove = function (event) {

//   let e = event || window.event

//   e.stopPropagation() // 阻止事件的进一步传播，包括（冒泡，捕获），无参数

//   e.cancelBubble = true

// }

// FastClick.prototype.onTouchEnd = function (event) {



//   let e = event || window.event

//   e.stopPropagation() // 阻止事件的进一步传播，包括（冒泡，捕获），无参数

//   e.cancelBubble = true

// }
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')