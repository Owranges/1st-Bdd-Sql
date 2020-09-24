import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import 'es6-promise/auto'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    tokens : false
  },
  mutations: {
    MUTE_TOKEN: (state, theToken) => {
      state.tokens = theToken
      
    },
    DELETE_TOKEN: (state) => {
      state.tokens = false
    }
  },
  actions: {
    Token (context, theToken) {
      context.commit("MUTE_TOKEN", theToken)
    },
    DeleteToken (context) {
      context.commit("DELETE_TOKEN")
    }
  },
  modules: {
  }
})
