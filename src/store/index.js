import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShow : true
  },
  mutations: {
    commitShow (state,payload){
      state.isShow = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
