import { createStore } from 'vuex';
import { auth } from './modules/auth.module';
import home from './modules/home.module';
import reseller from './modules/reseller.module';
import product from './modules/product.module';
import provider from './modules/provider.module';

import inbox from './modules/inbox.module';
import outbox from './modules/outbox.module';

import manage from './modules/manage.module'
import report from './modules/report.module'

const store = createStore({
	  state: {
    /* User */
    isFormScreen: false,

    isAsideMobileExpanded: false,
    isAsideLgActive: false,

  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    }
  },
  actions: {
    asideMobileToggle ({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60')

      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      })
    },
    asideLgToggle ({ commit, state }, payload = null) {
      commit('basic', { key: 'isAsideLgActive', value: payload !== null ? payload : !state.isAsideLgActive })
    },
    formScreenToggle ({ commit, state }, value) {
      commit('basic', { key: 'isFormScreen', value })

      document.documentElement.classList[value ? 'add' : 'remove']('form-screen')
    }
  },
	modules: {
		auth,
		home,
		reseller,
		product,
		provider,
		inbox,
		outbox,
		manage,
		report
	},
});

export default store;
