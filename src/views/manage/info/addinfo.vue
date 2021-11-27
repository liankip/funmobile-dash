<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Info</hero-bar>
	<main-section>
		<card-component title="Info" :icon="mdiMonitorCellphone" form>
			<field label="Judul Info">
				<control
					v-model="info.name_info"
					placeholder="Masukkan judul Info"
				/>
			</field>

			<field label="Gambar Info">
				<control
					v-model="info.img_info"
					placeholder="Masukkan gambar link Info"
				/>
			</field>

			<field label="Deskripsi Info">
				<control
					v-model="info.desc_info"
					placeholder="Masukkan desktripsi Info"
				/>
			</field>

			<field label="Konten Info">
				<control
					v-model="info.content_info"
					placeholder="Masukkan Konten Info"
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
			info: {
				name_info: '',
				img_info: '',
				desc_info: '',
				content_info: '',
			},
		};
	},

	methods: {
		...mapActions(['createInfo']),
		_address,
		currency,
		format_date,

		onSubmit() {
			this.createInfo(this.info);
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