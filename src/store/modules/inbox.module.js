import axios from 'axios';
import baseURL from '@/api/api';

const state = {
	inbox: []
};

const getters = {
	allInbox: (state) => {
		return state.inbox
	}
};

const actions = {
	async fetchInbox({ commit }, payload) {
		await axios.get(baseURL + 'dashboard/listinbox?page=' + payload.page).then((response) => {
			commit('SET_INBOX', response.data);
		});
	},
};

const mutations = {
	SET_INBOX(state, inbox) {
		state.inbox = inbox;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
