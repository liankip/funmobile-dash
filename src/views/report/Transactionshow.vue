<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Transaksi {{ code }}</hero-bar>
	<main-section>
		<card-component has-table>
			<table>
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td
									v-if="getOrder.status == 20"
									class="
										text-green-600
										md:text-green-600
										uppercase
										text-4xl
									"
								>
									Terbayar
								</td>
								<td
									v-if="getOrder.status == 2"
									class="
										text-yellow-600
										md:text-yellow-600
										uppercase
										text-4xl
									"
								>
									Pending
								</td>
								<td
									v-if="getOrder.status >= 40"
									class="
										text-red-600
										md:text-red-600
										uppercase
										text-4xl
									"
								>
									Gagal
								</td>
								<td>
									Transaksi #: {{ code }}<br />
									Tanggal Transaksi:
									{{ format_date(getOrder.tgl_entri) }}<br />
									Tanggal Pembayaran:
									{{ format_date(getOrder.tgl_status) }}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						{{ _address(getOrder['reseller.alamat']) }}
					</td>
				</tr>

				<tr class="item">
					<td>{{ getOrder['produk.nama'] }}</td>
					<td>
						{{ currency(getOrder.harga) }}
					</td>
				</tr>

				<tr class="total">
					<td>Total:</td>
					<td>
						{{ currency(getOrder.harga) }}
					</td>
				</tr>
			</table>
		</card-component>
	</main-section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ref } from 'vue';
import { _address, currency, format_date } from '@/lib/util.js';

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
		...mapActions(['fetchOrder']),
		_address,
		currency,
		format_date,
	},
	components: {
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
	},
	computed: {
		...mapGetters(['getOrder']),
	},
	created() {
		this.$store.dispatch('fetchOrder', this.code);
	},
	setup() {
		const titleStack = ref(['Admin', 'Tables']);

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