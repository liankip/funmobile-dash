import axios from 'axios';
import baseURL from '@/api/api';

const state = {
	providers: [],
	provider: {},
};

const getters = {
	allProvider: (state) => {
		return state.providers;
	},

	getProvider: (state) => {
		return state.provider;
	},
};

const actions = {
	async fetchProviders({ commit }) {
		try {
			await axios.get(baseURL + 'olahdata/provider').then((response) => {
				commit('SET_PROVIDERS', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchProvider({ commit }, kode) {
		try {
			await axios.get(baseURL + 'olahdata/provider/' + kode).then((response) => {
				commit('SET_PROVIDER', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async addProvider({ commit }, payload) {
		try {
			await axios.post(baseURL + 'olahdata/provider', {
				kode: payload.kode,
				nama: payload.nama,
				prefix_tujuan: payload.prefix_tujuan,
				gangguan: payload.gangguan,
				kosong: payload.kosong,
				regex_tujuan: payload.regex_tujuan,
				catatan: payload.catatan,
				apk_ikon: payload.apk_ikon
			}).then((response) => {
				commit('ADD_PROVIDER', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async updateProvider({ commit }, payload) {
		try {
			await axios.put(baseURL + 'olahdata/provider/'+ payload.kode, {
				nama: payload.nama,
				prefix_tujuan: payload.prefix_tujuan,
				gangguan: payload.gangguan,
				kosong: payload.kosong,
				regex_tujuan: payload.regex_tujuan,
				catatan: payload.catatan,
				apk_ikon: payload.apk_ikon
			})

			commit('UPDATE_PROVIDER', payload.kode);
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async deleteProvider({ commit }, kode) {
		await axios.delete(baseURL + 'olahdata/provider/' + kode);
		commit('DELETE_PROVIDER', kode);
	},
};

const mutations = {
	SET_PROVIDERS: (state, providers) => state.providers = providers,

	SET_PROVIDER: (state, provider) => state.provider = provider,

	ADD_PROVIDER:(state, newProvider) => state.Providers.result.unshift(newProvider),

	UPDATE_PROVIDER: (state, updatedProvider) => state.providers.findIndex(provider => provider.kode === updatedProvider.kode),

	DELETE_PROVIDER (state, kode) {
		const pIndex = state.providers.result.findIndex((p) => p.kode === kode)
		state.providers.result.splice(pIndex, 1)
	}
};

export default {
	state,
	getters,
	actions,
	mutations,
};
