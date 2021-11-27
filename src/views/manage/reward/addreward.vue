<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Reward</hero-bar>
	<main-section>
		<card-component title="Reward" :icon="mdiMonitorCellphone" form>
			<field label="Kode">
				<control v-model="reward.kode" placeholder="Masukkan Kode" />
			</field>

			<field label="Judul Reward">
				<control
					v-model="reward.nama"
					placeholder="Masukkan judul reward"
				/>
			</field>

			<field label="Deskripsi Reward">
				<control
					type="textarea"
					v-model="reward.h_desc"
					placeholder="Masukkan deskripsi reward"
				/>
			</field>

			<field label="Gambar Reward">
				<control
					v-model="reward.h_img"
					placeholder="Masukkan link gambar reward"
				/>
			</field>

			<field label="Jumlah Poin">
				<control
					v-model="reward.jml_poin"
					placeholder="Masukkan Jumlah Poin"
					type="number"
				/>
			</field>

			<field label="Stock Produk">
				<control
					v-model="reward.h_stock"
					placeholder="Masukkan stock produk"
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
			reward: {
				kode: '',
				nama: '',
				h_desc: '',
				h_img: '',
				jml_poin: 0,
				h_stock: 0
			},
		};
	},

	methods: {
		...mapActions(['createReward']),

		onSubmit() {
			this.createReward(this.reward);
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