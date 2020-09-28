import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import "es6-promise/auto";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    tokens: false,
    tokenNames: false,
    tokenIDs: false,
    tokenMail: false,
  },
  mutations: {
    MUTE_TOKEN: (state, theToken) => {
      state.tokens = theToken;
    },
    DELETE_TOKEN: (state) => {
      state.tokens = false;
    },
    TOKEN_INFO: (state, tokenInfo) => {
      state.tokenNames = tokenInfo.Tokename;
      state.tokenIDs = tokenInfo.Tokeid;
      state.tokenMail = tokenInfo.Tokenemail;
      console.log(state.tokenIDs);
    },
  },
  actions: {
    Token(context, theToken) {
      context.commit("MUTE_TOKEN", theToken);
    },
    DeleteToken(context) {
      context.commit("DELETE_TOKEN");
    },
    tokenName(context, tokenName) {
      context.commit("TOKEN_INFO", tokenName);
      console.log(tokenName);
    },
  },
});
