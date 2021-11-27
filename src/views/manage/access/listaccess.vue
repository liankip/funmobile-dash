<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>User Akses</hero-bar>
	<main-section>
		<div class="shadow flex mb-6">
			<span class="w-auto flex justify-end items-center p-2">
				<svg
					class="fill-current w-4 h-4 mr-2"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path :d="mdiMagnify" />
				</svg>
			</span>
			<input
				class="w-full rounded p-2"
				type="text"
				placeholder="Masukkan kode transaksi yang ingin dicari"
				v-model="searchNama"
				@input="
					page = 1;
					retrieveUsers();
				"
			/>
		</div>

		<card-component title="Manage Akses" :icon="mdiAccount" has-table>
			<table>
				<thead>
					<tr>
						<th>nama</th>
						<th>username</th>
						<th>akses</th>
						<th>status</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in allUser" :key="user.R_ID">
						<td data-label="nama">{{ user.R_Name }}</td>
						<td data-label="username">
							{{ user.R_Username }}
						</td>
						<td data-label="akses">
							{{ user.R_Role }}
						</td>
						<td data-label="Status">
							<span
								class="
									inline-flex
									items-center
									justify-center
									px-2
									py-1
									text-xs
									font-bold
									leading-none
									text-green-100
									bg-green-600
									rounded-full
									uppercase
								"
								v-if="user.R_Status == 1"
								>Aktif</span
							>
							<span
								class="
									inline-flex
									items-center
									justify-center
									px-2
									py-1
									text-xs
									font-bold
									leading-none
									text-red-100
									bg-red-600
									rounded-full
									uppercase
								"
								v-if="user.R_Status == 0"
								>Tidak Aktif</span
							>
						</td>
						<td class="is-actions-cell">
							<jb-buttons
								type="justify-start lg:justify-end"
								no-wrap
							>
								<jb-button
									class="mr-3"
									color="success"
									:icon="mdiEye"
									small
									@click="toAccess(user.R_ID)"
								/>
								<jb-button
									color="danger"
									:icon="mdiTrashCan"
									small
									@click="deleteUser(user.R_ID)"
								/>
							</jb-buttons>
						</td>
					</tr>
				</tbody>
			</table>
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { username, address, currency, active, formatdate } from '@/lib/util.js';
import { ref } from 'vue';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import JbButtons from '@/components/JbButtons';
import JbButton from '@/components/JbButton';

import {
	mdiAccountMultiple,
	mdiCartOutline,
	mdiFinance,
	mdiMonitorCellphone,
	mdiReload,
	mdiGithub,
	mdiEye,
	mdiTrashCan,
	mdiMagnify,
	mdiAccount,
} from '@mdi/js';

export default {
	components: {
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
		JbButtons,
		JbButton,
	},
	data() {
		return {
			page: 1,
			searchNama: '',
		};
	},
	computed: {
		...mapGetters(['allUser']),
	},
	methods: {
		...mapActions(['fetchUsers', 'deleteUser']),

		getRequestPayload(searchNama, page) {
			let params = {};

			searchNama ? (params['name'] = searchNama) : (params['name'] = '');

			if (page) {
				params['page'] = page;
			}

			return params;
		},

		retrieveUsers() {
			let payload = this.getRequestPayload(this.searchNama, this.page);

			this.$store.dispatch('fetchUsers', payload);
		},

		toAccess(kode) {
			this.$router.push({
				name: 'sAccess',
				params: {
					code: kode,
				},
			});
		},

		username,
		address,
		currency,
		active,
		formatdate,
	},

	setup() {
		const titleStack = ref(['Admin', 'Akses']);

		return {
			titleStack,
			mdiAccount,
			mdiAccountMultiple,
			mdiCartOutline,
			mdiFinance,
			mdiMonitorCellphone,
			mdiReload,
			mdiGithub,
			mdiEye,
			mdiTrashCan,
			mdiMagnify,
		};
	},

	mounted() {
		this.retrieveUsers();
	},
};
</script>
