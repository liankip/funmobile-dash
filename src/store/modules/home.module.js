import axios from 'axios';
import baseURL from '@/api/api';
import auth from '@/lib/auth';

const state = {
	counts: [],
	trx: [],
	trxs: [],
	trxp: [],
	trxf: [],
	trxd: []
};

const getters = {
	countAll: (state) => {
		return state.counts;
	},

	countTrx: (state) => {
		return state.trx;
	},

	countTrxs: (state) => {
		return state.trxs;
	},

	countTrxp: (state) => {
		return state.trxp;
	},

	countTrxf: (state) => {
		return state.trxf;
	},

	countTrxd: (state) => {
		return state.trxd
	}
};

const actions = {
	async fetchCounts({ commit }) {
		await axios.get(baseURL + 'dashboard/ca').then((response) => {
			commit('SET_COUNTS', response.data);
		});
	},

	async fetchTrx({ commit }) {
		await axios.get(baseURL + 'dashboard/counttrx').then((response) => {
			commit('SET_TRX', response.data);
		});
	},

	async fetchTrxs({commit}, payload) {
		await axios.get(baseURL + 'dashboard/listtrxs?status='+ payload.status +'&page='+payload.page).then((response) => {
			commit('SET_TRX_S', response.data);
		});
	},

	async fetchTrxp({commit}, payload) {
		await axios.get(baseURL + 'dashboard/listtrxp?status='+ payload.status +'&page='+payload.page).then((response) => {
			commit('SET_TRX_P', response.data);
		});
	},

	async fetchTrxf({commit}, payload) {
		await axios.get(baseURL + 'dashboard/listtrxf?status='+ payload.status +'&page='+payload.page).then((response) => {
			commit('SET_TRX_F', response.data);
		});
	},

	async fetchOrderd({commit}) {
		await axios.get(baseURL + 'dashboard/counttrxd').then((response) => {
			commit('SET_ORDER_D', response.data);
		});
	},
};

const mutations = {
	SET_COUNTS: (state, counts) => (state.counts = counts),
	SET_TRX: (state, trx) => (state.trx = trx),
	SET_TRX_S: (state, trxs) => (state.trxs = trxs),
	SET_TRX_P: (state, trxp) => (state.trxp = trxp),
	SET_TRX_F: (state, trxf) => (state.trxf = trxf),
	SET_TRX_D: (state, trxd) => (state.trxd = trxd),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
