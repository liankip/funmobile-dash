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
				<control
					v-model="support.title_support"
					placeholder="Masukkan Judul"
				/>
			</field>

			<field label="Gambar">
				<control
					v-model="support.url_support"
					placeholder="Masukkan Link Gambar"
				/>
			</field>

			<field label="Deskripsi">
				<control
					v-model="support.contact_support"
					placeholder="Masukkan Nomor Kontak"
				/>
			</field>

			<field label="Link">
				<control
					v-model="support.link_support"
					placeholder="Masukkan no hp atau api whatsapp"
				/>
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
				@click="onSubmit()"
			>
				Simpan
			</button>
		</card-component>
	</main-section>
</template>

<script>
import { mapActions } from 'vuex';
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
			support: {
				title_support: '',
				url_support: '',
				contact_support: '',
				link_support: '',
			},
		};
	},

	methods: {
		...mapActions(['createService']),
		_address,
		currency,
		format_date,

		onSubmit() {
			this.createService(this.support);
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