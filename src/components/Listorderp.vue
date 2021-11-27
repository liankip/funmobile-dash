<template>
	<table>
		<thead>
			<tr>
				<th>Kode Transaksi</th>
				<th>Tujuan</th>
				<th>Harga</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(count, index) in countTrxp.result" :key="index">
				<td data-label="kode">{{ count.kode }}</td>
				<td data-label="Destiny">{{ count.tujuan }}</td>
				<td data-label="Price">{{ currency(count.harga) }}</td>
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
						v-if="count.status == 20"
						>TERBAYAR</span
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
						v-if="count.status == 2"
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
						v-if="count.status >= 40"
						>GAGAL</span
					>
				</td>
			</tr>
		</tbody>
	</table>
	<v-pagination
		v-model="page"
		style="list-style: disc outside; list-style-type: none"
		:pages="countTrxp.pages"
		:range-size="1"
		active-color="#DCEDFF"
		@update:modelValue="updateHandler"
	/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VPagination from '@hennge/vue3-pagination';
import { currency } from '@/lib/util.js';

export default {
	data() {
		return {
			page: 1,
		};
	},

	props: ['status'],

	components: {
		VPagination,
	},

	computed: {
		...mapGetters(['countTrxp']),
	},

	methods: {
		...mapActions(['fetchTrxp']),
		currency,

		retrieveOrderp() {
			this.fetchTrxp({ page: this.page, status: this.status });
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveOrderp();
		},
	},

	mounted() {
		this.retrieveOrderp();
	},
};
</script>
