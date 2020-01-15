import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShow: true,
    urls: 'http://192.168.2.199:8080/',
    serverPath:'http://218.75.49.82:6080/'
  },
  mutations: {
    commitShow(state, payload) {
      state.isShow = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
