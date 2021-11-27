<template>
	<main-section>
		<card-component class="w-11/12 md:w-5/12 shadow-2xl rounded-lg" form>
			<field label="username" help="">
				<control
					v-model="username"
					:icon="mdiAccount"
					name="Username"
					autocomplete="username"
					placeholder="Masukkan username"
				/>
			</field>

			<field label="Password" help="">
				<control
					v-model="password"
					:icon="mdiAsterisk"
					type="password"
					name="password / pin"
					autocomplete="current-password"
					placeholder="Masukkan password / pin"
					@keyup.enter="handleLogin"
				/>
			</field>

			<div class="relative">
				<button
					type="button"
					@click="handleLogin"
					class="
						w-full
						bg-blue-500
						hover:bg-blue-700
						text-white
						font-bold
						py-2
						px-4
						border border-blue-700
						rounded
						right-0
					"
				>
					Masuk
				</button>
			</div>
		</card-component>
	</main-section>
</template>

<script>
import { mdiAccount, mdiAsterisk } from '@mdi/js';
import MainSection from '@/components/MainSection';
import CardComponent from '@/components/CardComponent';

import Field from '@/components/Field';
import Control from '@/components/Control';

import baseURL from '@/api/api';
import axios from 'axios';

export default {
	name: 'Login',
	components: {
		MainSection,
		CardComponent,
		Field,
		Control,
		/* 		JbButton,
		JbButtons, */
	},

	data() {
		return {
			username: '',
			password: '',
		};
	},

	setup() {
		return {
			mdiAccount,
			mdiAsterisk,
		};
	},

	methods: {
		handleLogin() {
			if (this.username === '' || this.password === '') {
				this.$swal(
					'Login gagal',
					'No teleusername dan password kosong',
					'error'
				);
			} else {
				this.$store
					.dispatch('auth/login', {
						username: this.username,
						password: this.password,
					})
					.then((res) => {
						if (res.error != 99) {
							this.$swal
								.fire(
									'Login berhasil',
									'Klik OK untuk melanjutkan',
									'success'
								)
								.then((okay) => {
									if (okay) {
										window.location.href = `/`;
									}
								});
						} else {
							this.$swal(
								'Login gagal',
								'Akun salah mohon diperiksa kembali',
								'error'
							);
						}
					});
			}
		},
	},
};
</script>
