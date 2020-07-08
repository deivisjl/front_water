import Vue from 'vue'
import Vuex from 'vuex'

import services from './services'

Vue.use(Vuex)

const state ={
  services,
  user: {
    loggedIn: false
  }
}

const getters = {
  auth(state) {
      return state.user
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
