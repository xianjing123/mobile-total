import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShow: true,
    urls: 'http://192.168.2.193:8080/'
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
