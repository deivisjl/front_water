import Vue from 'vue'
import Vuex from 'vuex'

import services from './services'

Vue.use(Vuex)

const state ={
  services,
  user: {
    loggedIn: false
  },
  menu:[]
},

mutations = {
  setMenu(state, menu) {
    state.menu = []
    state.menu = menu
  },
},

actions = {
  setMenu({ commit }, menu) {
    commit("setMenu", menu)
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
  mutations,
  actions,
  modules: {
  }
})
