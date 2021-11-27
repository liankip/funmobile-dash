import axios from 'axios';
import baseURL from '@/api/api';

const state = {
	products: [],
	product: {},
};

const getters = {
	allProducts: (state) => {
		return state.products;
	},

	getProduct: (state) => {
		return state.product;
	},
};

const actions = {
	async fetchProducts({ commit }, payload) {
		try {
			await axios
			.get(baseURL + 'olahdata/allproduct/?name=' + payload.name + '&page=' + payload.page + '&size=10')
			.then((response) => {
				commit('SET_PRODUCTS', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchProduct({ commit }, id) {
		try {
			await axios
			.get(baseURL + 'olahdata/getProduct/' + id)
			.then((response) => {
				commit('SET_PRODUCT', response.data[0]);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async removeProduct({ commit }, id) {
		try {
			await axios.get(baseURL + 'olahdata/getProduct/' + id)
			commit('REMOVE_PRODUCT', id);
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	}
};

const mutations = {
	SET_PRODUCTS: (state, products) => state.products = products,

	SET_PRODUCT: (state, product) => state.product = product,

	REMOVE_PRODUCT (state, kode) {
		const pIndex = state.products.result.findIndex((p) => p.kode === kode)
		state.products.result.splice(pIndex, 1)
	}
};

export default {
	state,
	getters,
	actions,
	mutations,
};
