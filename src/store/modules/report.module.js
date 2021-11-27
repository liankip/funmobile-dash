import axios from 'axios';
import baseURL from '@/api/api';

const state = {
	orders: [],
	order: {},
	orderd: [],

	profit: [],

	deposit: [],

	commission: [],

	mutations: [],
	mutation: {},

	winpays: [],
	winpay: {}
};

const getters = {
	allOrders: (state) => {
		return state.orders;
	},

	getOrder: (state) => {
		return state.order;
	},

	allProfit: (state) => {
		return state.profit
	},

	allDeposit: (state) => {
		return state.deposit
	},

	allCommission: (state) => {
		return state.commission
	},

	allMutation: (state) => {
		return state.mutations;
	},

	getMutation: (state) => {
		return state.mutation;
	},

	allWinpay: (state) => {
		return state.winpays;
	},

	getWinpay: (state) => {
		return state.winpay;
	},

};

const actions = {
	async fetchOrders({ commit }, payload) {
		try {
			console.log(payload)
			await axios.get(baseURL + 'report/transaction?kode=' + payload.code + '&page=' + payload.page + '&size=' + payload.size + '&start=' + payload.start + '&end=' + payload.end + '&number=' + payload.number)
			.then((response) => {
				commit('SET_ORDERS', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchOrder({ commit }, code) {
		try {
			await axios
			.get(baseURL + 'report/detailtransaction/' + code)
			.then((response) => {
				commit('SET_ORDER', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async removeOrder({commit}, kode) {
		try {
			await axios.delete(baseURL + 'report/removetransaction/' + kode)
			commit('REMOVE_ORDER', kode);
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchProfit({ commit }, payload) {
		try {
			await axios.get(baseURL + `dashboard/profit/${payload.start}/${payload.end}`).then((response) => {
				commit('SET_PROFIT', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchDeposit({ commit }, payload) {
		await axios.get(baseURL + 'report/deposit?page=' + payload.page)
		.then((response) => {
			commit('SET_DEPOSIT', response.data);
		});
	},

	async fetchCommission({ commit }, payload) {
		await axios.get(baseURL + 'report/commission?page=' + payload.page).then((response) => {
			commit('SET_COMMISSION', response.data);
		});
	},

	async fetchMutations({ commit }, payload) {
		await axios.get(baseURL + 'report/mutation?nama=' + payload.name + '&page=' + payload.page)
		.then((response) => {
			commit('SET_MUTATIONS', response.data);
		});
	},

	async fetchMutation({ commit }, code) {
		try {
			await axios.get(baseURL + 'report/detailmutation/' + code).then((response) => {
				commit('SET_MUTATION', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async removeMutation({commit}, code) {
		try {
			await axios.delete(baseURL + 'report/removemutation/' + code)
			commit('REMOVE_MUTATION', code);
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchWinpays({commit}) {
		try {
			await axios.get(baseURL + 'report/mutationwinpay/').then((response) => {
				commit('SET_WINPAYS', response.data);
			});
		} catch (e) {}
	},

	async fetchWinpay({commit}, code) {
		try {
			await axios.get(baseURL + 'report/mutationwinpay/' + code).then((response) => {
				commit('SET_WINPAY', response.data);
			});
		} catch (e) {}
	},
};

const mutations = {
	// Transaksi
	SET_ORDERS(state, orders) {
		state.orders = orders;
	},

	SET_ORDER(state, order) {
		state.order = order;
	},

	REMOVE_ORDER(state, kode) {
		const oIndex = state.orders.result.findIndex((o) => o.kode === kode)
		state.orders.result.splice(oIndex, 1)
	},

	// Laba
	SET_PROFIT(state, profit) {
		state.profit = profit;
	},

	//
	SET_DEPOSIT(state, deposit) {
		state.deposit = deposit;
	},

	SET_COMMISSION(state, commission) {
		state.commission = commission;
	},

	SET_MUTATIONS(state, mutations) {
		state.mutations = mutations;
	},

	SET_MUTATION(state, mutation) {
		state.mutation = mutation;
	},

	REMOVE_MUTATION(state, kode) {
		const mIndex = state.mutations.result.findIndex((o) => o.kode === kode)
		state.mutations.result.splice(mIndex, 1)
	},

	//Winpay
	SET_WINPAYS(state, winpays) {
		state.winpays = winpays;
	},

	SET_WINPAY(state, winpay) {
		state.winpay = winpay;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
