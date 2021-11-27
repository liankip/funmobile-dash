<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Customer</hero-bar>
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
				v-model="searchCode"
				class="w-full rounded p-2"
				type="text"
				placeholder="Masukkan kode yang ingin dicari"
				@input="
					page = 1;
					retrieveCustomers();
					persist($event);
				"
			/>
		</div>

		<card-component title="Customer" :icon="mdiMonitorCellphone" has-table>
			<table>
				<thead>
					<tr>
						<th>Kode</th>
						<th>Nama</th>
						<th>Saldo</th>
						<th>Status</th>
						<th>Alamat</th>
						<th>Tanggal Daftar</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="customer in allCustomers.result"
						:key="customer.kode"
					>
						<td data-label="Kode">{{ customer.kode }}</td>
						<td data-label="Name">{{ username(customer.nama) }}</td>
						<td data-label="Saldo">
							{{ currency(customer.saldo) }}
						</td>
						<td data-label="status">
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
								v-if="customer.oid == '00'"
								>Approve</span
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
								v-if="customer.oid == '02'"
								>Pending</span
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
								v-if="customer.oid >= '03'"
								>Reject</span
							>
						</td>
						<td data-label="Alamat">
							{{ address(customer.alamat) }}
						</td>
						<td data-label="Alamat">
							{{ formatdate(customer.tgl_daftar) }}
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
									@click="toCustomer(customer.kode)"
								/>
								<jb-button
									color="danger"
									:icon="mdiTrashCan"
									small
									@click="removeCustomer(customer.kode)"
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
						:pages="allCustomers.pages"
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
import VPagination from '@hennge/vue3-pagination';
import { username, address, currency, active, formatdate } from '@/lib/util.js';
import { ref } from 'vue';

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
			searchCode: '',
		};
	},
	computed: {
		...mapGetters(['allCustomers']),
	},
	methods: {
		...mapActions(['fetchCustumers', 'removeCustomer']),

		getRequestPayload(searchCode, page) {
			let params = {};

			searchCode ? (params['code'] = searchCode) : (params['code'] = '');

			if (page) {
				params['page'] = page;
			}

			return params;
		},

		retrieveCustomers() {
			let payload = this.getRequestPayload(this.searchCode, this.page);

			this.$store.dispatch('fetchCustomers', payload);
		},

		refreshList() {
			this.retrieveCustomers();
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveCustomers();
		},

		persist(event) {
			localStorage.setItem('name', event.target.value);
		},

		toCustomer(kode) {
			this.$router.push({
				name: 'Customer',
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
		const titleStack = ref(['Admin', 'Customer']);

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
		this.retrieveCustomers();

		if (localStorage.name) {
			this.name = localStorage.getItem('name');
		}
	},
};
</script>
