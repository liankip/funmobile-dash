<template>
	<nav-bar />
	<aside-menu :menu="menu" />
	<router-view :key="$route.fullPath" />
	<footer-bar />
</template>

<script>
//import Nav from '@/components/Nav.vue';
import { useStore } from 'vuex';
import menu from '@/menu.js';
import NavBar from '@/components/NavBar';
import AsideMenu from '@/components/AsideMenu';
import FooterBar from '@/components/FooterBar';

export default {
	name: 'Home',
	components: {
		//	Nav,
		FooterBar,
		AsideMenu,
		NavBar,
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		},
	},
	mounted() {
		if (!this.currentUser) {
			this.$router.push('/login');
		}
	},
	setup() {
		const store = useStore();

		store.commit('user', {
			name: 'John Doe',
			email: 'john@example.com',
			avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
		});

		return {
			menu,
		};
	},
};
</script>

<style>
#example_wrapper {
	margin: 20px 10px;
}
</style>