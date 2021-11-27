<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Banner</hero-bar>
	<main-section>
		<card-component title="Banner" :icon="mdiMonitorCellphone" form>
			<field label="Judul">
				<control
					v-model="banner.name_banner"
					placeholder="Masukkan judul banner"
				/>
			</field>

			<field label="Gambar">
				<control
					v-model="banner.img_banner"
					placeholder="Masukkan gambar link banner"
				/>
			</field>

			<field label="Deskripsi">
				<control
					v-model="banner.desc_banner"
					placeholder="Masukkan desktripsi banner"
				/>
			</field>

			<field label="Link">
				<control
					v-model="banner.link_banner"
					placeholder="Masukkan link banner"
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
			banner: {
				name_banner: '',
				img_banner: '',
				desc_banner: '',
				link_banner: '',
			},
		};
	},

	methods: {
		...mapActions(['createBanner']),

		onSubmit() {
			this.createBanner(this.banner);
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