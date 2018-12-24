import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'en',
  },
  mutations: {
    SET_LANGUAGE (state, language) {
      state.language = language
    },
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
  },
  getters
})
