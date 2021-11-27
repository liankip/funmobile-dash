<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Info</hero-bar>
	<main-section>
		<card-component title="Info" :icon="mdiMonitorCellphone" form>
			<field label="Judul Info">
				<control v-model="getInfo.name_info" />
			</field>

			<field label="Gambar Info">
				<control v-model="getInfo.img_info" />
			</field>

			<field label="Deskripsi Info">
				<control v-model="getInfo.desc_info" />
			</field>

			<field label="Konten Info">
				<control type="textarea" v-model="getInfo.content_info" />
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
		...mapActions(['fetchInfo', 'updateInfo']),
		_address,
		currency,
		format_date,

		onSave() {
			const payload = {
				code_info: this.getInfo.code_info,
				name_info: this.getInfo.name_info,
				desc_info: this.getInfo.desc_info,
				img_info: this.getInfo.img_info,
				content_info: this.getInfo.content_info,
			};
			this.updateInfo(payload);
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
		...mapGetters(['getInfo']),
	},

	created() {
		this.$store.dispatch('fetchInfo', this.code);
	},

	setup() {
		const titleStack = ref(['Admin', 'Info']);

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