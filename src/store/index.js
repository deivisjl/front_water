import Vue from 'vue'
import Vuex from 'vuex'

import services from './services'

Vue.use(Vuex)

const state ={
  services,
  user: {
    loggedIn: false
  },
  menu:[],
  permisos:[]
},

mutations = {
  setMenu(state, menu) {
    state.menu = []
    state.menu = menu
  },
  setPermisos(state, permisos) {
    state.permisos = []
    state.permisos = permisos
  },
},

actions = {
  setMenu({ commit }, menu) {
    commit("setMenu", menu)
  },
  setPermisos({ commit }, permisos) {
    commit("setPermisos", permisos)
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
