<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Mutasi Winpay</hero-bar>
	<main-section>
		<card-component has-table>
			<table id="example">
				<thead>
					<tr>
						<th>Kode Mutasi</th>
						<th>Tanggal Mutasi</th>
						<th>Jumlah</th>
						<th>Status</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr v-for="(winpay, index) in allWinpay" :key="index">
						<td data-label="kode">{{ winpay.kode }}</td>
						<td data-label="tanggal">
							{{ format_date(winpay.waktu) }}
						</td>
						<td data-label="jumlah">
							Rp. {{ formatRupiah(winpay.jumlah) }}
						</td>

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
								v-if="winpay.status == 'S'"
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
								v-if="winpay.status == '2'"
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
								v-if="winpay.status == 'C'"
								>GAGAL</span
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
									@click="toWinpay(winpay.kode)"
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
		...mapGetters(['allWinpay']),
	},
	methods: {
		...mapActions(['fetchWinpays']),

		retrieveWinpays() {
			this.$store.dispatch('fetchWinpays');
			setTimeout(function () {
				$('#example').DataTable();
			}, 500);
		},

		toWinpay(kode) {
			this.$router.push({
				name: 'sWinpay',
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
		const titleStack = ref(['Admin', 'Mutasi Winpay']);

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
		this.retrieveWinpays();
	},
};
</script>