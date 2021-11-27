<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Banner</hero-bar>
	<main-section>
		<card-component title="Banner" :icon="mdiMonitorCellphone" form>
			<field label="Nama Banner">
				<control v-model="getBanner.name_banner" />
			</field>

			<field label="Gambar Banner">
				<control v-model="getBanner.img_banner" />
			</field>

			<field label="Deskripsi Banner">
				<control type="textarea" v-model="getBanner.desc_banner" />
			</field>

			<field label="Link Banner">
				<control v-model="getBanner.link_banner" />
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
		...mapActions(['fetchUser', 'updateBanner']),
		_address,
		currency,
		format_date,

		onSave() {
			const payload = {
				code_banner: this.getBanner.code_banner,
				name_banner: this.getBanner.name_banner,
				img_banner: this.getBanner.img_banner,
				desc_banner: this.getBanner.desc_banner,
				link_banner: this.getBanner.link_banner,
			};
			this.updateBanner(payload);
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
		...mapGetters(['getBanner']),
	},

	created() {
		this.$store.dispatch('fetchBanner', this.code);
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