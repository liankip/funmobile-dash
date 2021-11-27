<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Laba</hero-bar>
	<main-section>
		<card-component
			title="Pencarian Laba"
			:icon="mdiMonitorCellphone"
			has-form
		>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="
							block
							uppercase
							tracking-wide
							text-gray-700 text-xs
							font-bold
							mb-2
						"
						for="grid-first-name"
					>
						Tanggal Awal
					</label>
					<datepicker
						class="
							appearance-none
							block
							w-full
							bg-gray-200
							text-gray-700
							rounded
							py-3
							px-4
							mb-3
							leading-tight
							focus:outline-none
							focus:bg-white
						"
						id="grid-first-name"
						type="text"
						placeholder="Jane"
						v-model="startDate"
					/>
				</div>
				<div class="w-full md:w-1/2 px-3">
					<label
						class="
							block
							uppercase
							tracking-wide
							text-gray-700 text-xs
							font-bold
							mb-2
						"
						for="grid-last-name"
					>
						Tanggal Akhir
					</label>
					<datepicker
						class="
							appearance-none
							block
							w-full
							bg-gray-200
							text-gray-700
							border border-gray-200
							rounded
							py-3
							px-4
							leading-tight
							focus:outline-none
							focus:bg-white
							focus:border-gray-500
						"
						v-model="endDate"
						id="grid-last-name"
						type="text"
						placeholder="Doe"
					/>
				</div>
			</div>
			<button
				class="
					bg-blue-500
					hover:bg-blue-700
					text-white
					font-bold
					py-2
					px-4
					rounded
				"
				type="button"
				@click="retrieveProfit()"
			>
				Cari
			</button>
		</card-component>

		<card-component
			title="Daftar Laba"
			:icon="mdiMonitorCellphone"
			has-table
		>
			<table>
				<thead>
					<tr>
						<th>Tanggal</th>
						<th>Penjualan</th>
						<th>Pembelian</th>
						<th>Total Komisi</th>
						<th>Total Laba</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(profit, index) in allProfit.result"
						:key="index"
					>
						<td>{{ dateFormat(profit.tanggal) }}</td>
						<td>{{ formatRupiah(profit.penjualan) }}</td>
						<td>{{ formatRupiah(profit.pembelian) }}</td>
						<td>{{ formatRupiah(profit.komisi) }}</td>
						<td>{{ formatRupiah(profit.laba) }}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>Total</td>
						<td>{{ formatRupiah(countPenjualan) }}</td>
						<td>{{ formatRupiah(countPembelian) }}</td>
						<td>{{ formatRupiah(countKomisi) }}</td>
						<td>{{ formatRupiah(countProfit) }}</td>
					</tr>
				</tfoot>
			</table>
			<v-pagination
				v-model="page"
				style="list-style: disc outside; list-style-type: none"
				:pages="allProfit.pages"
				:range-size="1"
				active-color="#DCEDFF"
				@update:modelValue="updateHandler"
			/>
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VPagination from '@hennge/vue3-pagination';
import { formatRupiah } from '@/lib/util.js';
import { ref } from 'vue';
import moment from 'moment';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import Datepicker from 'vue3-datepicker';

import {
	mdiMonitorCellphone,
	mdiReload,
	mdiEye,
	mdiTrashCan,
	mdiMagnify,
} from '@mdi/js';

export default {
	components: {
		VPagination,
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
		Datepicker,
	},
	data() {
		return {
			page: 1,
			as: 1,
			size: 50,
			searchProfit: '',
			startDate: new Date(),
			endDate: new Date(),
		};
	},

	computed: {
		...mapGetters(['allProfit']),

		countProfit() {
			var p = this.allProfit.result;
			let sum = 0;
			for (var key in p) {
				sum += p[key]['laba'];
			}
			return sum;
		},

		countKomisi() {
			var p = this.allProfit.result;
			let sum = 0;
			for (var key in p) {
				sum += p[key]['komisi'];
			}
			return sum;
		},

		countPembelian() {
			var p = this.allProfit.result;
			let sum = 0;
			for (var key in p) {
				sum += p[key]['pembelian'];
			}
			return sum;
		},

		countPenjualan() {
			var p = this.allProfit.result;
			let sum = 0;
			for (var key in p) {
				sum += p[key]['penjualan'];
			}
			return sum;
		},
	},

	methods: {
		...mapActions(['fetchProfit']),

		getRequestPayload() {
			var sDate = moment(this.startDate).format(
				'yyyy-MM-DD 00:00:00.000'
			);
			var eDate = moment(this.endDate).format('yyyy-MM-DD 23:59:59.999');

			let params = {};

			params['start'] = sDate;
			params['end'] = eDate;

			return params;
		},

		retrieveProfit() {
			let payload = this.getRequestPayload();

			this.$store.dispatch('fetchProfit', payload);
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveProfit();
		},

		persist(event) {
			localStorage.setItem('order', event.target.value);
		},

		dateFormat(date) {
			return moment().format(`${date} MMMM YYYY`);
		},

		formatRupiah,
	},

	setup() {
		const myRef = ref(null);
		const dateValue = ref([]);

		const titleStack = ref(['Admin', 'Laba']);

		return {
			titleStack,
			mdiMonitorCellphone,
			mdiReload,
			mdiEye,
			mdiTrashCan,
			mdiMagnify,
			myRef,
			dateValue,
		};
	},

	mounted() {
		this.retrieveProfit();
	},
};
</script>