<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Provider</hero-bar>
	<section class="text-gray-600 body-font">
		<div class="container px-4 mx-auto max-w-7x1">
			<div class="flex flex-wrap w-full p-4">
				<div class="w-full mb-6 lg:mb-0">
					<h1
						class="
							sm:text-2xl
							text-2xl
							font-medium font-bold
							title-font
							text-gray-900
						"
					>
						<router-link to="/provider/create"
							>+ Tambah Provider</router-link
						>
					</h1>
					<div class="h-1 w-20 bg-indigo-500 rounded"></div>
				</div>
			</div>
		</div>
	</section>
	<main-section>
		<card-component has-table>
			<table id="example">
				<thead>
					<tr>
						<th>Kode</th>
						<th>Nama</th>
						<th>Gangguan</th>
						<th>Kosong</th>
						<th>Icon</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr v-for="(provider, index) in allProvider" :key="index">
						<td data-label="code">{{ provider.kode }}</td>
						<td data-label="name">{{ provider.nama }}</td>
						<td data-label="gangguan">
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
								v-if="provider.gangguan == 0"
								>Normal</span
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
								v-if="provider.gangguan == 1"
								>gangguan</span
							>
						</td>
						<td data-label="stok">
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
								v-if="provider.kosong == 0"
								>Tersedia</span
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
								v-if="provider.kosong == 1"
								>kosong</span
							>
						</td>
						<td data-label="image">
							<img class="h-auto w-24" :src="provider.apk_ikon" />
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
									@click="toProvider(provider.kode)"
								/>
								<jb-button
									type="button"
									color="danger"
									:icon="mdiTrashCan"
									small
									@click="deleteProvider(provider.kode)"
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
import { currency, format_date, formatRupiah } from '@/lib/util.js';
import { ref } from 'vue';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import $ from 'jquery';

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
			searchMutation: '',
		};
	},
	computed: {
		...mapGetters(['allProvider']),
	},
	methods: {
		...mapActions(['fetchProviders', 'deleteProvider']),

		retrieveProviders() {
			this.$store.dispatch('fetchProviders');
		},

		toProvider(kode) {
			this.$router.push({
				name: 'sProvider',
				params: {
					code: kode,
				},
			});
		},

		currency,
		format_date,
		formatRupiah,
	},

	setup() {
		const titleStack = ref(['Admin', 'Provider']);

		return {
			titleStack,
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
		this.retrieveProviders();
		$('#example').DataTable();
	},
};
</script>