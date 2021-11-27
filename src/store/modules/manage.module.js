import axios from 'axios';
import baseURL from '@/api/api';

const state = {
	users: [],
	user: {},

	services: [],
	service: {},

	infos: [],
	info: {},

	banners: [],
	banner: {},

	flashs: [],
	flash: {},

	rewards: [],
	reward: {}
};

const getters = {
	/* User Akses */
	allUser: (state) => {
		return state.users;
	},

	getUser: (state) => {
		return state.user;
	},

	/* Customer Service */
	allService: (state) => {
		return state.services;
	},

	getService: (state) => {
		return state.service;
	},

	/* Banner */
	allBanner: (state) => {
		return state.banners;
	},

	getBanner: (state) => {
		return state.banner;
	},

	/* Flash */
	allFlash: (state) => {
		return state.flashs;
	},

	getFlash: (state) => {
		return state.flash;
	},

	/* Info */
	allInfo: (state) => {
		return state.infos;
	},

	getInfo: (state) => {
		return state.info;
	},

	/* Reward */
	allReward: (state) => {
		return state.rewards;
	},

	getReward: (state) => {
		return state.reward;
	},
};

const actions = {
	/* User Akses */
	async fetchUsers({ commit }, payload) {
		try {
			await axios.get(baseURL + 'auth/lauth?name=' + payload.name).then((response) => {
				commit('SET_USERS', response.data);
			});
		} catch (e) {}
	},

	async fetchUser({ commit }, payload) {
		try {
			await axios.get(baseURL + 'auth/gauth/' + payload).then((response) => {
				commit('SET_USER', response.data);
			});
		} catch (e) {}
	},

	async createUser({commit}, payload) {
		try {
			await axios.post(baseURL + 'auth/cauth', {
				R_Name: payload.R_Name,
				R_Username: payload.R_Username,
				R_Password: payload.R_Password,
				R_Role: payload.R_Role,
				R_Status: payload.R_Status,
			}).then((response) => {
				commit('ADD_USER', response.data);
			});
		} catch(e) {}
	},

	async updateUser({commit}, payload) {
		try {
			await axios.put(baseURL + 'auth/uauth/' + payload.R_ID, {
				R_Name: payload.R_Name,
				R_Username: payload.R_Username,
				R_Password: payload.R_Password,
				R_Role: payload.R_Role,
				R_Status: payload.R_Status,
			}).then((response) => {
				commit('UPDATE_USER', payload.R_ID);
			});
		} catch(e) {}
	},

	async deleteUser({commit}, payload) {
		try {
			await axios.delete(baseURL + 'auth/dauth/' + payload)
			commit('DELETE_USER', payload);
		} catch(e) {}
	},

	/* Customer Service */
	async fetchServices({commit}) {
		try {
			await axios.get(baseURL + 'lib/service/').then((response) => {
				commit('SET_SERVICES', response.data);
			});
		} catch(e) {}
	},

	async fetchService({commit}, payload) {
		try {
			await axios.get(baseURL + 'lib/service/' + payload).then((response) => {
				commit('SET_SERVICE', response.data);
			});
		} catch(e) {}
	},

	async createService({commit}, payload) {
		try {
			await axios.post(baseURL + 'lib/service', {
				title_support: payload.title_support,
				url_support: payload.url_support,
				contact_support: payload.contact_support,
				link_support: payload.link_support,
			}).then((response) => {
				commit('ADD_SERVICE', response.data);
			});
		} catch(e) {}
	},

	async updateService({commit}, payload) {
		try {
			await axios.put(baseURL + 'lib/service/' + payload.code_support, {
				title_support: payload.title_support,
				url_support: payload.url_support,
				contact_support: payload.contact_support,
				link_support: payload.link_support,
			}).then((response) => {
				commit('UPDATE_SERVICE', payload.code_support);
			});
		} catch(e) {}
	},

	async deleteService({commit}, payload) {
		try {
			await axios.delete(baseURL + 'lib/service/' + payload)
			commit('DELETE_SERVICE', payload);
		} catch(e) {}
	},

	/* Banner */
	async fetchBanners({ commit }) {
		try {
			await axios.get(baseURL + 'lib/banner').then((response) => {
				commit('SET_BANNERS', response.data);
			});
		} catch (e) {}
	},

	async fetchBanner({ commit }, payload) {
		try {
			await axios.get(baseURL + 'lib/banner/' + payload).then((response) => {
				commit('SET_BANNER', response.data);
			});
		} catch (e) {}
	},

	async createBanner({commit}, payload) {
		try {
			await axios.post(baseURL + 'lib/banner', {
				name_banner: payload.name_banner,
				img_banner: payload.img_banner,
				desc_banner: payload.desc_banner,
				link_banner: payload.link_banner
			}).then((response) => {
				commit('ADD_BANNER', response.data);
			});
		} catch(e) {}
	},

	async updateBanner({commit}, payload) {
		try {
			await axios.put(baseURL + 'lib/banner/' + payload.code_banner, {
				name_banner: payload.name_banner,
				img_banner: payload.img_banner,
				desc_banner: payload.desc_banner,
				link_banner: payload.link_banner
			}).then((response) => {
				commit('UPDATE_BANNER', payload.code_banner);
			});
		} catch(e) {}
	},

	async deleteBanner({commit}, payload) {
		try {
			await axios.delete(baseURL + 'lib/banner/' + payload)
			commit('DELETE_BANNER', payload);
		} catch(e) {}
	},

	/* Flash */
	async fetchFlashs({ commit }) {
		try {
			await axios.get(baseURL + 'lib/flash').then((response) => {
				commit('SET_FLASHS', response.data);
			});
		} catch(e) {}
	},

	async fetchFlash({ commit }, payload) {
		try {
			await axios.get(baseURL + 'lib/flash/' + payload).then((response) => {
				commit('SET_FLASH', response.data[0]);
			});
		} catch(e) {}
	},

	async createFlash({commit}, payload) {
		try {
			await axios.post(baseURL + 'lib/flash', {
				title_flash: payload.title_flash,
				desc_flash: payload.desc_flash,
				img_flash: payload.img_flash,
				link_flash: payload.link_flash,
				start_flash: payload.start_flash,
				end_flash: payload.end_flash,
				type_flash: payload.type_flash,
				status_flash: payload.status_flash,
			}).then((response) => {
				commit('ADD_FLASH', response.data);
			});
		} catch(e) {}
	},

	async updateFlash({commit}, payload) {
		try {
			await axios.put(baseURL + 'lib/flash/' + payload.code_flash, {
				title_flash: payload.title_flash,
				desc_flash: payload.desc_flash,
				image_flash: payload.image_flash,
				link_flash: payload.link_flash,
				start_flash: payload.start_flash,
				end_flash: payload.end_flash,
				type_flash: payload.type_flash,
				status_flash: payload.status_flash,
			}).then((response) => {
				commit('UPDATE_FLASH', payload.code_flash);
			});
		} catch(e) {}
	},

	async deleteFlash({commit}, payload) {
		try {
			await axios.delete(baseURL + 'lib/flash/' + payload)
			commit('DELETE_FLASH', payload);
		} catch(e) {}
	},

	/* Info */
	async fetchInfos({ commit }) {
		try {
			await axios.get(baseURL + 'lib/info').then((response) => {
				commit('SET_INFOS', response.data);
			});
		} catch (e) {}
	},

	async fetchInfo({ commit }, payload) {
		try {
			await axios.get(baseURL + 'lib/info/' + payload).then((response) => {
				commit('SET_INFO', response.data);
			});
		} catch (e) {}
	},

	async createInfo({commit}, payload) {
		try {
			await axios.post(baseURL + 'lib/info', {
				name_info: payload.name_info,
				img_info: payload.img_info,
				desc_info: payload.desc_info,
				content_info: payload.content_info,
			}).then((response) => {
				commit('ADD_INFO', response.data);
			});
		} catch(e) {}
	},

	async updateInfo({commit}, payload) {
		try {
			await axios.put(baseURL + 'lib/info/' + payload.code_info, {
				name_info: payload.name_info,
				img_info: payload.img_info,
				desc_info: payload.desc_info,
				content_info: payload.content_info,
			}).then((response) => {
				commit('UPDATE_INFO', payload.code_info);
			});
		} catch(e) {}
	},

	async deleteInfo({commit}, payload) {
		try {
			await axios.delete(baseURL + 'lib/info/' + payload)
			commit('DELETE_INFO', payload);
		} catch(e) {}
	},

	/* Reward */
	async fetchRewards({ commit }) {
		try {
			await axios.get(baseURL + 'lib/reward').then((response) => {
				commit('SET_REWARDS', response.data);
			});
		} catch(e) {}
	},

	async fetchReward({ commit }, payload) {
		try {
			await axios.get(baseURL + 'lib/reward/' + payload).then((response) => {
				commit('SET_REWARD', response.data);
			});
		} catch(e) {}
	},

	async createReward({commit}, payload) {
		try {
			await axios.post(baseURL + 'lib/reward', {
				kode: payload.kode,
				jml_poin: payload.jml_poin,
				nama: payload.nama,
				h_desc: payload.h_desc,
				h_img: payload.h_img,
				h_stock: payload.h_stock,
			}).then((response) => {
				commit('ADD_REWARD', response.data);
			});
		} catch(e) {}
	},

	async updateReward({commit}, payload) {
		try {
			await axios.put(baseURL + 'lib/reward/' + payload.kode, {
				jml_poin: payload.jml_poin,
				nama: payload.nama,
				h_desc: payload.h_desc,
				h_img: payload.h_img,
				h_stock: payload.h_stock,
			}).then((response) => {
				commit('UPDATE_REWARD', payload.kode);
			});
		} catch(e) {}
	},

	async deleteReward({commit}, payload) {
		try {
			await axios.delete(baseURL + 'lib/reward/' + payload)
			commit('DELETE_REWARD', payload);
		} catch(e) {}
	},
};

const mutations = {
	/* User Akses */
	SET_USERS(state, users) {
		state.users = users;
	},

	SET_USER(state, user) {
		state.user = user;
	},

	ADD_USER: (state,newUser) => state.users.unshift(newUser),

	UPDATE_USER: (state, R_ID) => {
		const index = state.users.findIndex(user => user.R_ID === R_ID);

		if (index !== -1) {
			state.users.splice(index, 1, R_ID);
		}
	},

	DELETE_USER:(state,R_ID) => state.users = state.users.filter((user) => user.R_ID !== R_ID),

	/* Costumer Service */
	SET_SERVICES(state, services) {
		state.services = services;
	},

	SET_SERVICE(state, service) {
		state.service = service;
	},

	ADD_SERVICE: (state,newService) => state.services.unshift(newService),

	UPDATE_SERVICE: (state, code_support) => {
		const index = state.services.findIndex(service => service.code_support === code_support);

		if (index !== -1) {
			state.services.splice(index, 1, code_support);
		}
	},

	DELETE_SERVICE:(state,code_support) => state.services = state.services.filter((service) => service.code_support !== code_support),

	/* Banner */
	SET_BANNERS(state, banners) {
		state.banners = banners;
	},

	SET_BANNER(state, banner) {
		state.banner = banner;
	},

	ADD_BANNER: (state,newBanner) => state.banners.unshift(newBanner),

	UPDATE_BANNER: (state, code_banner) => {
		const index = state.banners.findIndex(banner => banner.code_banner === code_banner);

		if (index !== -1) {
			state.banners.splice(index, 1, code_banner);
		}
	},

	DELETE_BANNER:(state,code_banner) => state.banners = state.banners.filter((banner) => banner.code_banner !== code_banner),

	/* Flash */
	SET_FLASHS(state, flashs) {
		state.flashs = flashs;
	},

	SET_FLASH(state, flash) {
		state.flash = flash;
	},

	ADD_FLASH: (state,newFlash) => state.flashs.unshift(newFlash),

	UPDATE_FLASH: (state, code_flash) => {
		const index = state.flashs.findIndex(flash => flash.code_flash === code_flash);

		if (index !== -1) {
			state.flashs.splice(index, 1, code_flash);
		}
	},

	DELETE_FLASH:(state,code_flash) => state.flashs = state.flashs.filter((flash) => flash.code_flash !== code_flash),

	/* Info */
	SET_INFOS(state, infos) {
		state.infos = infos;
	},

	SET_INFO(state, info) {
		state.info = info;
	},

	ADD_INFO: (state,newInfo) => state.infos.unshift(newInfo),

	UPDATE_INFO: (state, code_info) => {
		const index = state.infos.findIndex(info => info.code_info === code_info);

		if (index !== -1) {
			state.infos.splice(index, 1, code_info);
		}
	},

	DELETE_INFO:(state,code_info) => state.infos = state.infos.filter((info) => info.code_info !== code_info),

	/* Reward */
	SET_REWARDS(state, rewards) {
		state.rewards = rewards
	},

	SET_REWARD(state, reward) {
		state.reward = reward
	},

	ADD_REWARD: (state, newReward) => state.rewards.unshift(newReward),

	UPDATE_REWARD: (state, kode) => {
		const index = state.rewards.findIndex(reward => reward.kode === kode);

		if (index !== -1) {
			state.rewards.splice(index, 1, kode);
		}
	},

	DELETE_REWARD:(state, kode) => state.rewards = state.rewards.filter((reward) => reward.kode !== kode),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
