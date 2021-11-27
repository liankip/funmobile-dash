<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Customer Service</hero-bar>
	<main-section>
		<card-component
			title="Customer Service"
			:icon="mdiMonitorCellphone"
			form
		>
			<field label="Judul">
				<control v-model="getService.title_support" />
			</field>

			<field label="Gambar">
				<control v-model="getService.url_support" />
			</field>

			<field label="Nomor Kontak">
				<control v-model="getService.contact_support" />
			</field>

			<field label="Nomor HP / Link WA">
				<control v-model="getService.link_support" />
			</field>

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
				@click="onSave()"
			>
				Simpan
			</button>
		</card-component>
	</main-section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ref } from 'vue';
import { _address, currency, format_date } from '@/lib/util.js';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import CardComponent from '@/components/CardComponent';
import HeroBar from '@/components/HeroBar';
import Field from '@/components/Field';
import Control from '@/components/Control';

import {
	mdiMonitorCellphone,
	mdiAccountMultiple,
	mdiTableBorder,
	mdiTableOff,
} from '@mdi/js';

export default {
	data() {
		return {
			selectedValue: '',
			valuesList: ['Administrator', 'Operator', 'Customer Service'],
		};
	},

	props: ['code'],

	methods: {
		...mapActions(['fetchService', 'updateService']),
		_address,
		currency,
		format_date,

		onSave() {
			const payload = {
				code_support: this.getService.code_support,
				title_support: this.getService.title_support,
				url_support: this.getService.url_support,
				contact_support: this.getService.contact_support,
				link_support: this.getService.link_support,
			};
			this.updateService(payload);
		},
	},

	components: {
		MainSection,
		HeroBar,
		CardComponent,
		TitleBar,
		Field,
		Control,
	},

	computed: {
		...mapGetters(['getService']),
	},

	created() {
		this.$store.dispatch('fetchService', this.code);
	},

	setup() {
		const titleStack = ref(['Admin', 'Customer Service']);

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