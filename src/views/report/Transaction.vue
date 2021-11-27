<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Transaksi</hero-bar>
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
					>Kode Transaksi
					</label>
					<input class="
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
						v-model="searchOrder"
						type="text"
						placeholder="Masukkan kode transaksi yang ingin dicari"
					/>
				</div>
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
					>Nomor Tujuan
					</label>
					<input class="
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
						v-model="searchNumber"
						type="text"
						placeholder="Masukkan nomor tujuan yang ingin dicari"
					/>
				</div>
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
				@click="retrieveOrders()"
			>
				Cari
			</button>
		</card-component>

		<card-component title="Transaksi" :icon="mdiMonitorCellphone" has-table>
			<table>
				<thead>
					<tr>
						<th>ID TRX</th>
						<th>Tanggal</th>
						<th>Produk</th>
						<th>Tujuan</th>
						<th>Harga</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(order, index) in allOrders.result" :key="index">
						<td>
							{{ order.kode }}
						</td>
						<td>{{ formatdate(order.tgl_entri) }}</td>
						<td>{{ order['produk.nama'] }}</td>
						<td>{{ order.tujuan }}</td>
						<td>{{ currency(order.harga) }}</td>
						<td data-label="staus">
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
								v-if="order.status == 20"
								>sukses</span
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
									text-yellow-100
									bg-yellow-600
									rounded-full
									uppercase
								"
								v-if="order.status == 2"
								>PENDING</span
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
								v-if="order.status >= 40"
								>GAGAL</span
							>
						</td>
					</tr>
				</tbody>
			</table>
			<v-pagination
				v-model="page"
				style="list-style: disc outside; list-style-type: none"
				:pages="allOrders.pages"
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
import { currency, formatdate } from '@/lib/util.js';
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
		Datepicker
	},
	data() {
		return {
			page: 1,
			size: 10,
			searchOrder: '',
			searchNumber: '',
			startDate: new Date(),
			endDate: new Date(),
		};
	},
	computed: {
		...mapGetters(['allOrders']),
	},
	methods: {
		...mapActions(['fetchOrders', 'removeOrder']),

		getRequestPayload(searchOrder, searchNumber, page, size) {
			let params = {};

			var sDate = moment(this.startDate).format(
				'yyyy-MM-DD 00:00:00.000'
			);
			var eDate = moment(this.endDate).format('yyyy-MM-DD 23:59:59.999');

			params['start'] = sDate;
			params['end'] = eDate;

			searchNumber
				? (params['number'] = searchNumber)
				: (params['number'] = '');

			searchOrder
				? (params['code'] = searchOrder)
				: (params['code'] = '');

			if (page) {
				params['page'] = page;
			}

			if (size) {
				params['size'] = size;
			}

			return params;
		},

		retrieveOrders() {
			let payload = this.getRequestPayload(
				this.searchOrder,
				this.searchNumber,
				this.page,
				this.size
			);

			this.$store.dispatch('fetchOrders', payload);
		},

		refreshList() {
			this.retrieveOrders();
		},

		toOrder(kode) {
			this.$router.push({
				name: 'Transaction',
				params: {
					code: kode,
				},
			});
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveOrders();
		},

		persist(event) {
			localStorage.setItem('order', event.target.value);
		},

		formatdate,
		currency,
	},

	setup() {
		const titleStack = ref(['Admin', 'Transaksi']);

		return {
			titleStack,
			mdiMonitorCellphone,
			mdiReload,
			mdiEye,
			mdiTrashCan,
			mdiMagnify,
		};
	},

	mounted() {
		this.retrieveOrders();
	},
};
</script>