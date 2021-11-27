<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Dashboard</hero-bar>
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
				v-model="searchProduct"
				class="w-full rounded p-2"
				type="text"
				placeholder="Masukkan nama produk yang ingin dicari"
				@input="
					page = 1;
					retrieveProducts();
					persist($event);
				"
			/>
		</div>

		<card-component title="Produk" :icon="mdiMonitorCellphone" has-table>
			<table>
				<thead>
					<tr>
						<th>Kode Produk</th>
						<th>Nama Produk</th>
						<th>Harga Beli</th>
						<th>Harga Jual</th>
						<th>Status</th>
						<th>Gangguan</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(product, index) in allProducts.result"
						:key="index"
					>
						<td>{{ product.kode }}</td>
						<td>{{ product.nama }}</td>
						<td>
							{{ currency(product.harga_beli) }}
						</td>
						<td>
							{{ currency(product.harga_jual) }}
						</td>
						<td>
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
								v-if="product.aktif == 1"
								>AKTIF</span
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
								v-else
								>TIDAK</span
							>
						</td>
						<td>
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
								v-if="product.gangguan == 1"
								>GANGGUAN</span
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
									text-green-100
									bg-green-600
									rounded-full
									uppercase
								"
								v-else
								>NORMAL</span
							>
						</td>
						<td class="actions-cell">
							<jb-buttons
								type="justify-start lg:justify-end"
								no-wrap
							>
								<jb-button
									class="mr-3"
									color="success"
									:icon="mdiEye"
									small
									@click="toProduct(product.kode)"
								/>
								<jb-button
									color="danger"
									:icon="mdiTrashCan"
									small
									@click="moveProduct(product.kode)"
								/>
							</jb-buttons>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="table-pagination">
				<level>
					<v-pagination
						v-model="page"
						style="list-style: disc outside; list-style-type: none"
						:pages="allProducts.pages"
						:range-size="1"
						active-color="#DCEDFF"
						@update:modelValue="updateHandler"
					/>
				</level>
			</div>
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ref } from 'vue';
import VPagination from '@hennge/vue3-pagination';
import { currency } from '@/lib/util.js';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import Level from '@/components/Level';
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
	name: 'Produk',
	components: {
		VPagination,
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
		Level,
		JbButtons,
		JbButton,
	},
	data() {
		return {
			page: 1,
			pageMarkup: 1,
			searchProduct: '',
			searchName: '',
		};
	},
	computed: {
		...mapGetters(['allProducts']),
	},
	methods: {
		...mapActions(['fetchProducts', 'removeProduct']),

		getRequestPayload(searchProduct, page) {
			let params = {};

			searchProduct
				? (params['name'] = searchProduct)
				: (params['name'] = '');

			if (page) {
				params['page'] = page;
			}

			return params;
		},

		retrieveProducts() {
			let payload = this.getRequestPayload(this.searchProduct, this.page);

			this.$store.dispatch('fetchProducts', payload);
		},

		refreshList() {
			this.retrieveProducts();
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveProducts();
		},

		persist(event) {
			localStorage.setItem('product', event.target.value);
		},

		toProduct(kode) {
			this.$router.push({
				name: 'Product',
				params: {
					code: kode,
				},
			});
		},

		moveProduct(kode) {
			this.removeProduct(kode);
		},

		currency,
	},

	setup() {
		const titleStack = ref(['Admin', 'Produk']);

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

	created() {
		this.retrieveProducts();
	},

	mounted() {
		this.retrieveProducts();

		if (localStorage.product) {
			this.searchProduct = localStorage.getItem('product');
		}
	},
};
</script>