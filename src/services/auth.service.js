import axios from 'axios';
import baseURL from '@/api/api';

class AuthService {
	login(user) {
		return axios
		.post(baseURL + 'auth/signin', {
			username: user.username,
			password: user.password,
		})
		.then((response) => {
			if (response.data.token) {
				 localStorage.setItem('user', JSON.stringify(response.data));
			}

			return response.data
		});
	}

	logout() {
		localStorage.clear();
	}

	register(user) {
		return axios.post(baseURL + 'reseller/signup', {
			name: user.name,
			phone: user.phone,
			password: user.password,
		});
	}
}

export default new AuthService();
