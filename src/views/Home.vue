<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Dashboard</hero-bar>
	<main-section>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
			<card-widget
				v-for="(count, index) in countAll"
				:key="index"
				class="tile"
				:color="count.color"
				:icon="count.icon"
				:number="count.total"
				prefix=""
				:label="count.nama"
			/>
		</div>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
			<card-widget
				v-for="(count, index) in countTrx"
				:key="index"
				class="tile"
				:color="count.color"
				:icon="count.icon"
				:number="count.total"
				prefix=""
				:label="count.nama"
			/>
		</div>

		<card-component
			title="Graphic Transaksi"
			:icon="mdiFinance"
			:header-icon="mdiReload"
			class="mb-6"
			@header-icon-click="fillChartData"
			has-table
		>
			<Chartorder />
		</card-component>

		<card-component
			title="Customer Map"
			:icon="mdiMonitorCellphone"
			has-table
		>
			<Map />
		</card-component>

		<card-component
			:icon="mdiMonitorCellphone"
			title="Daftar Transksaki"
			has-table
		>
			<Listorder />
		</card-component>

		<card-component
			:icon="mdiMonitorCellphone"
			title="Daftar Sukses"
			has-table
		>
			<Listorders status="20" />
		</card-component>

		<card-component
			:icon="mdiMonitorCellphone"
			title="Daftar Pending"
			has-table
		>
			<Listorderp status="2" />
		</card-component>

		<card-component
			:icon="mdiMonitorCellphone"
			title="Daftar Gagal"
			has-table
		>
			<Listorderf status="40" />
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ref, onMounted } from 'vue';
import {
	mdiAccountMultiple,
	mdiCartOutline,
	mdiChartTimelineVariant,
	mdiFinance,
	mdiPackage,
	mdiMonitorCellphone,
	mdiReload,
	mdiGithub,
	mdiCashCheck,
} from '@mdi/js';
import * as chartConfig from '@/components/Charts/chart.config';

import Map from '@/components//Maps.vue';
import Listorder from '@/components/Listorder.vue';
import Listorders from '@/components/Listorders.vue';
import Listorderp from '@/components/Listorderp.vue';
import Listorderf from '@/components/Listorderf.vue';
import Chartorder from '@/components/Chartorder.vue';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardWidget from '@/components/CardWidget';
import CardComponent from '@/components/CardComponent';

export default {
	name: 'Home',
	components: {
		MainSection,
		Chartorder,
		CardComponent,
		CardWidget,
		HeroBar,
		TitleBar,
		Map,
		Listorder,
		Listorders,
		Listorderp,
		Listorderf,
	},

	methods: {
		...mapActions(['fetchCounts', 'fetchTrx']),
	},

	setup() {
		const titleStack = ref(['Admin', 'Dashboard']);

		const chartData = ref(null);

		const fillChartData = () => {
			chartData.value = chartConfig.sampleChartData();
		};

		onMounted(() => {
			fillChartData();
		});

		return {
			titleStack,
			chartData,
			fillChartData,
			mdiAccountMultiple,
			mdiCartOutline,
			mdiChartTimelineVariant,
			mdiFinance,
			mdiMonitorCellphone,
			mdiReload,
			mdiGithub,
			mdiPackage,
			mdiCashCheck,
		};
	},

	computed: mapGetters(['countAll', 'countTrx']),

	async created() {
		this.fetchCounts();
		this.fetchTrx();
	},
};
</script>
