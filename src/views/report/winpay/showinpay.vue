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
					<td>
						{{
							format_date(
								getWinpay['tiket_response.response_time']
							)
						}}
					</td>
				</tr>
				<tr>
					<td>Tanggal Expired</td>
					<td>
						{{
							format_date(
								getWinpay['tiket_response.expired_time']
							)
						}}
					</td>
				</tr>
				<tr>
					<td>Tanggal Bayar</td>
					<td>
						{{ format_date(getWinpay.waktu) }}
					</td>
				</tr>
				<tr>
					<td>Biaya</td>
					<td>Rp. {{ getWinpay.jumlah }}</td>
				</tr>
				<tr>
					<td>Admin</td>
					<td>
						Rp.
						{{ getWinpay['tiket_response.nominal_mdr'] }}
					</td>
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
							v-if="getWinpay.status == 'S'"
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
							v-if="getWinpay.status == '2'"
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
							v-if="getWinpay.status == 'C'"
							>GAGAL</span
						>
					</td>
				</tr>
				<tr>
					<td>Keterangan</td>
					<td>{{ getWinpay['tiket_response.payment_method'] }}</td>
				</tr>
				<tr>
					<td>Jumlah</td>
					<td>
						Rp.
						{{
							formatRupiah(
								getWinpay['tiket_response.total_amount'] +
									getWinpay['tiket_response.nominal_mdr']
							)
						}}
					</td>
				</tr>
			</table>
		</card-component>
	</main-section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ref } from 'vue';
import { format_date, currency, _address, formatRupiah } from '@/lib/util.js';

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
		...mapActions(['fetchWinpay']),

		format_date,
		currency,
		_address,
		formatRupiah,
	},

	components: {
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
	},

	computed: {
		...mapGetters(['getWinpay']),
	},

	created() {
		this.$store.dispatch('fetchWinpay', this.code);
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