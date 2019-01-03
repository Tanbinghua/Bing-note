import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { getInfo } from '../utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    create_time: "",
    email: "",
    id: "",
    language: 'en',
    name: "",
    theme: '#409EFF',
  },
  mutations: {
    SET_LANGUAGE (state, language) {
      state.language = language
    },
    SET_THEME (state, theme) {
      state.theme = theme
    },
    LOGIN_OUT (state) {
      state.id = null
    },
    SET_INFO (state, data) {
      const { id, name, email, language, avatar, create_time } = data;
      state.id = id
      state.name = name
      state.email = email
      state.language = language
      state.avatar = avatar
      state.create_time = create_time
    }
  },
  actions: {
    getUserInfo({ commit }) {
      getInfo().then((data) => {
        commit('SET_INFO', data.data);
      })
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setTheme({ commit }, theme) {
      commit('SET_THEME', theme)
    },
    logOut({ commit }) {
      commit('LOGIN_OUT')
    }
  },
  getters
})
