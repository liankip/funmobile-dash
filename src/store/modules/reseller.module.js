import axios from 'axios';
import baseURL from '@/api/api';

const state = {
	resellers: [],
	reseller: {},
	devices: []
};

const getters = {
	allReseller: (state) => {
		return state.resellers;
	},

	getReseller: (state) => {
		return state.reseller;
	},

	allDevices: (state) => {
		return state.devices;
	}
};

const actions = {
	async fetchResellers({ commit }, payload) {
		try {
			await axios.get(baseURL + 'reseller/lr/').then((response) => {
				commit('SET_RESELLERS', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchReseller({ commit }, code) {
		try {
			await axios.get(baseURL + 'reseller/gc/' + code).then((response) => {
				commit('SET_RESELLER', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async updateReseller({commit}, payload) {
		try {
			await axios.put(baseURL + 'reseller/ur/' + payload.kode, {
				nama: payload.nama,
				saldo: payload.saldo,
				markup: payload.markup,
				poin: payload.poin,
				nomor_ktp: payload.nomor_ktp,
				npwp: payload.npwp,
				aktif: payload.aktif,
				oid: payload.oid,
				suspend: payload.suspend
			}).then((response) => {
				console.log(response.data)
				commit('UPDATE_RESELLER', payload.kode);
			});
		} catch(e) {}
	},

	async fetchDevice({commit}, code) {
		try {
			await axios.get(baseURL + 'reseller/gd/' + code).then((response) => {
				commit('SET_DEVICE', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async removeReseller({ commit }, kode) {
		try {
			await axios.delete(baseURL + 'reseller/rd/' + kode);
			commit('REMOVE_RESELLER', kode);
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async multipleDevice({ commit }, payload) {
		try {
			await axios
			.put(baseURL + 'reseller/rn/' + payload.kode, payload)
			.then((response) => {
				commit('DEVICE_RESELLER', response.data[1]);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async clearLogin({ commit }, payload) {
		try {
			await axios
			.put(baseURL + 'reseller/rn/' + payload.kode, payload)
			.then((response) => {
				commit('AUTH_RESELLER', response.data[1]);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async removeDevice({commit}, payload) {
		try {
			await axios
			.delete(baseURL + 'reseller/md/' + payload.kode)
			.then((response) => {
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	}
};

const mutations = {
	SET_RESELLERS(state, resellers) {
		state.resellers = resellers;
	},

	SET_RESELLER(state, reseller) {
		state.reseller = reseller;
	},

	SET_DEVICE(state, devices) {
		state.devices = devices;
	},

	UPDATE_RESELLER: (state, kode) => {
		const index = state.resellers.findIndex(reseller => reseller.kode === kode);

		if (index !== -1) {
			state.resellers.splice(index, 1, kode);
		}
	},

	REMOVE_RESELLER(state, kode) {
		const cIndex = state.resellers.result.findIndex((c) => c.kode === kode)
		state.resellers.result.splice(cIndex, 1)
	},

	DEVICE_RESELLER(state, deviceReseller) {
		const index = state.resellers[0].reseller_data.findIndex((reseller) => reseller.kode_reseller === deviceReseller.kode_reseller);

		if (index !== -1) {
			state.resellers[0].reseller_data.splice(index, 1, deviceReseller);
		}
	},

	AUTH_RESELLER(state, authReseller) {
		const index = state.resellers[0].reseller_data.findIndex((reseller) => reseller.kode_reseller === authReseller.kode_reseller);

		if (index !== -1) {
			state.resellers[0].reseller_data.splice(index, 1, authReseller);
		}
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
