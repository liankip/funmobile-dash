<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Provider {{ code }}</hero-bar>
	<main-section>
		<card-component title="Provider" :icon="mdiMonitorCellphone" form>
			<field label="Nama Provider">
				<control v-model="getProvider.nama" />
			</field>

			<field label="Prefix Tujuan">
				<control type="textarea" v-model="getProvider.prefix_tujuan" />
			</field>

			<field label="Gangguan">
				<select
					class="
						px-3
						py-2
						max-w-full
						focus:ring focus:outline-none
						border border-gray-700
						rounded
						w-full
					"
					v-model="getProvider.gangguan"
				>
					<option value="0">Normal</option>
					<option value="1">Gangguan</option>
				</select>
			</field>

			<field label="Kosong">
				<select
					class="
						px-3
						py-2
						max-w-full
						focus:ring focus:outline-none
						border border-gray-700
						rounded
						w-full
					"
					v-model="getProvider.kosong"
				>
					<option value="0">Tersedia</option>
					<option value="1">Kosong</option>
				</select>
			</field>

			<field label="Regex Tujuan">
				<control v-model="getProvider.regex_tujuan" />
			</field>

			<field label="Catatan">
				<control v-model="getProvider.catatan" />
			</field>

			<field label="Gambar Provider">
				<control type="textarea" v-model="getProvider.apk_ikon" />
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
	props: ['code'],

	methods: {
		...mapActions(['fetchProvider', 'updateProvider']),
		_address,
		currency,
		format_date,

		onSave() {
			const payload = {
				kode: this.getProvider.kode,
				nama: this.getProvider.nama,
				prefix_tujuan: this.getProvider.prefix_tujuan,
				gangguan: this.getProvider.gangguan,
				kosong: this.getProvider.kosong,
				regex_tujuan: this.getProvider.regex_tujuan,
				catatan: this.getProvider.catatan,
				apk_ikon: this.getProvider.apk_ikon,
			};
			this.updateProvider(payload);
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
		...mapGetters(['getProvider']),
	},

	created() {
		this.$store.dispatch('fetchProvider', this.code);
	},

	setup() {
		const titleStack = ref(['Admin', 'Banner']);

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