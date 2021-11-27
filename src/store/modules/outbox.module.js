import axios from 'axios';
import baseURL from '@/api/api';

const state = {
	outbox: []
};

const getters = {
	allOutbox: (state) => {
		return state.outbox
	}
};

const actions = {
	async fetchOutbox({ commit }, payload) {
		await axios.get(baseURL + 'dashboard/listoutbox?page=' + payload.page).then((response) => {
			commit('SET_OUTBOX', response.data);
		});
	},
};

const mutations = {
	SET_OUTBOX(state, outbox) {
		state.outbox = outbox;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
