<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar> Tambah Markup </hero-bar>

	<main-section>
		<card-component title="Markup" :icon="mdiBallot" form>
			<field label="Login Customer">
				<select
					class="
						px-3
						py-2
						max-w-full
						focus:ring
						focus:outline-none
						border border-gray-700
						rounded
						w-full
					"
					v-model="selectedOperator"
				>
					<option
						v-for="(operator, index) in operators"
						:key="index"
						:value="operator.kode"
					>
						{{ operator.nama }}
					</option>
					<option value="" selected>Pilih Operator</option>
				</select>
			</field>

			<field label="Login Customer">
				<select
					class="
						px-3
						py-2
						max-w-full
						focus:ring
						focus:outline-none
						border border-gray-700
						rounded
						w-full
					"
					v-model="selectedCustomer"
				>
					<option
						v-for="(customer, index) in customers"
						:key="index"
						:value="customer.kode"
					>
						{{ customer.kode }} - {{ customer.nama }}
					</option>
					<option value="" selected>Pilih Customer</option>
				</select>
			</field>

			<field label="Harga Beli dan Harga Jual">
				<control v-model="markup" class="input" type="text" />
			</field>

			<jb-buttons>
				<jb-button
					@click="addMarkup()"
					type="submit"
					color="info"
					label="Tambah"
				/>
				<jb-button type="reset" color="info" outline label="Reset" />
			</jb-buttons>
		</card-component>
	</main-section>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
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
import JbButton from '@/components/JbButton';
import JbButtons from '@/components/JbButtons';

export default {
	data() {
		return {
			selectedCustomer: '',
			selectedOperator: '',
			markup: 0,
			customers: [],
			operators: [],
			errors: [],
		};
	},

	components: {
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
		Field,
		Control,
		JbButton,
		JbButtons,
	},

	methods: {
		...mapActions(['addOperator']),

		gcustomer() {
			axios
				.get(`${base}reseller/rc`)
				.then((response) => {
					this.customers = response.data;
				})
				.catch((e) => {
					this.errors.push(e);
				});
		},

		goperator() {
			axios
				.get(`${base}operator/`)
				.then((response) => {
					this.operators = response.data;
				})
				.catch((e) => {
					this.errors.push(e);
				});
		},

		addMarkup() {
			const add = {
				codeReseller: this.selectedCustomer,
				codeOperator: this.selectedOperator,
				markup: this.markup,
			};
			this.addOperator(add);

			this.$swal('Markup Berhasil di tambah', '', 'success').then(() => {
				this.$router.push({ path: '/products' });
			});
		},
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

	mounted() {
		this.gcustomer();
		this.goperator();
	},
};
</script>