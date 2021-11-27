<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Reward</hero-bar>
	<main-section>
		<card-component title="Reward" :icon="mdiMonitorCellphone" form>
			<field label="Nama Reward">
				<control v-model="getReward.nama" />
			</field>

			<field label="Deskripsi Reward">
				<control
					type="textarea"
					v-model="getReward['hadiah_desc.h_desc']"
				/>
			</field>

			<field label="Gambar Reward">
				<control v-model="getReward['hadiah_desc.h_img']" />
			</field>

			<field label="Jumlah Poin">
				<control v-model="getReward.jml_poin" type="number" />
			</field>

			<field label="Stock Produk">
				<control
					v-model="getReward['hadiah_desc.h_stock']"
					type="number"
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
		...mapActions(['fetchReward', 'updateReward']),

		onSave() {
			const payload = {
				kode: this.getReward.kode,
				jml_poin: this.getReward.jml_poin,
				nama: this.getReward.nama,
				h_desc: this.getReward['hadiah_desc.h_desc'],
				h_img: this.getReward['hadiah_desc.h_img'],
				h_stock: this.getReward['hadiah_desc.h_stock'],
			};
			this.updateReward(payload);
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
		...mapGetters(['getReward']),
	},

	created() {
		this.$store.dispatch('fetchReward', this.code);
	},

	setup() {
		const titleStack = ref(['Admin', 'Reward']);

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