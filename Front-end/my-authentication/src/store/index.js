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
    contacts: [],
  },
  getters: {
    Contactes: (state) => (contact) => {
      if (state.contacts !== contact) {
        return (state.contacts = contact);
      }
      return state.contacts;
    },
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
    },
    NEW_CONTACTS: (state, contact) => {
      state.contacts.push(contact);
      console.log(contact);
    },
    GET_CONTACTS: (state, contact) => {
      state.contacts = contact;
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
    },
    NewContact(context, contact) {
      context.commit("NEW_CONTACTS", contact);
    },
    GetContacts(context, contact) {
      context.commit("GET_CONTACTS", contact);
    },
  },
});
