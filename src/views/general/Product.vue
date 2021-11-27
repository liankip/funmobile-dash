<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Produk {{ getProduct.kode }}</hero-bar>
	<main-section>
		<card-component title="Markup" :icon="mdiBallot" form>
			<field label="Nama Produk" help="">
				<control v-model="getProduct.nama" />
			</field>
			<field label="Harga Beli dan Harga Jual">
				<control v-model="getProduct.harga_beli" />
				<control v-model="getProduct.harga_jual" />
			</field>
		</card-component>
	</main-section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ref } from 'vue';
import {
	mdiBallot,
	mdiBallotOutline,
	mdiAccount,
	mdiMail,
	mdiCheck,
} from '@mdi/js';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';
import Field from '@/components/Field';
import Control from '@/components/Control';

export default {
	props: ['code'],
	methods: {
		...mapActions(['fetchProduct']),
	},

	components: {
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
		Field,
		Control,
	},

	computed: {
		...mapGetters(['getProduct']),

		detailProvider: function () {
			return this.getProduct.operator;
		},
	},
	created() {
		this.$store.dispatch('fetchProduct', this.code);
	},

	setup() {
		const titleStack = ref(['Admin', 'Produk']);

		return {
			titleStack,
			mdiBallot,
			mdiBallotOutline,
			mdiAccount,
			mdiMail,
			mdiCheck,
		};
	},
};
</script>
