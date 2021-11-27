<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Mutasi #{{ code }}</hero-bar>
	<main-section>
		<card-component has-table>
			<table>
				<tr>
					<td>ID</td>
					<td>
						{{ code }}
					</td>
				</tr>
				<tr>
					<td>Tanggal Transaksi</td>
					<td>{{ format_date(getMutation.tanggal) }}</td>
				</tr>
				<tr>
					<td>Tanggal Expired</td>
					<td>{{ format_date(getMutation.tanggal) }}</td>
				</tr>
				<tr>
					<td>Tanggal Bayar</td>
					<td>
						{{ format_date(getMutation['transaksi.tgl_status']) }}
					</td>
				</tr>
				<tr>
					<td>Biaya</td>
					<td>{{ getMutation['transaksi.harga'] }}</td>
				</tr>
				<tr>
					<td>Status</td>
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
							v-if="getMutation['transaksi.status'] == 20"
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
							v-if="getMutation['transaksi.status'] == 2"
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
							v-if="getMutation['transaksi.status'] >= 40"
							>GAGAL</span
						>
					</td>
				</tr>
				<tr>
					<td>Keterangan</td>
					<td>{{ getMutation['keterangan'] }}</td>
				</tr>
				<tr>
					<td>Jumlah</td>
					<td>
						{{ getMutation['transaksi.harga'] }}
					</td>
				</tr>
			</table>
		</card-component>
	</main-section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ref } from 'vue';
import { format_date, currency, _address } from '@/lib/util.js';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import {
	mdiMonitorCellphone,
	mdiAccountMultiple,
	mdiTableBorder,
	mdiTableOff,
} from '@mdi/js';

export default {
	props: ['code'],

	methods: {
		...mapActions(['fetchMutation']),
		format_date,
		currency,
		_address,
	},

	components: {
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
	},

	computed: {
		...mapGetters(['getMutation']),
	},

	created() {
		this.$store.dispatch('fetchMutation', this.code);
	},

	setup() {
		const titleStack = ref(['Admin', 'Mutasi']);

		return {
			titleStack,
			mdiMonitorCellphone,
			mdiAccountMultiple,
			mdiTableBorder,
			mdiTableOff,
		};
	},
};
</script>