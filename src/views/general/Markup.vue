<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Markup</hero-bar>
	<main-section>
		<card-component title="Markup" :icon="mdiBallot" form>
			<field label="Operator dan Customer">
				<control
					placeholder="Nama Operator"
					disabled
					v-model="getOperator['operator.nama']"
				/>
				<control
					placeholder="Nama Customer"
					disabled
					v-model="getOperator['reseller.nama']"
				/>
			</field>
			<field label="Markup" help="">
				<control
					type="tel"
					placeholder="Your phone number"
					v-model="getOperator.markup"
					@input="checkExist($event)"
				/>
			</field>

			<divider />

			<jb-buttons>
				<jb-button
					@click="updateMarkup(getOperator._id)"
					type="submit"
					color="info"
					label="Edit"
				/>
				<jb-button type="reset" color="info" outline label="Batal" />
			</jb-buttons>
		</card-component>
	</main-section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ref, reactive } from 'vue';
import { currency } from '@/lib/util.js';
import axios from 'axios';
import baseURL from '@/api/api';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';
import Field from '@/components/Field';
import Control from '@/components/Control';
import Divider from '@/components/Divider.vue';
import JbButton from '@/components/JbButton';
import JbButtons from '@/components/JbButtons';

import {
	mdiBallot,
	mdiBallotOutline,
	mdiAccount,
	mdiMail,
	mdiCheck,
} from '@mdi/js';

export default {
	props: ['code'],
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
		Divider,
		JbButtons,
		JbButton,
	},
	methods: {
		...mapActions(['fetchOperator', 'updateOperator']),

		gcustomer() {
			axios
				.get(`${baseURL}reseller/rc`)
				.then((response) => {
					this.customers = response.data;
				})
				.catch((e) => {
					this.errors.push(e);
				});
		},

		goperator() {
			axios
				.get(`${baseURL}operator/`)
				.then((response) => {
					this.operators = response.data;
				})
				.catch((e) => {
					this.errors.push(e);
				});
		},

		checkExist(event) {
			this.markup = event.target.value;
		},

		updateMarkup(_id) {
			const updated = {
				_id: _id,
				markup: this.markup,
			};
			this.updateOperator(updated);

			this.$swal('Markup Berhasil di ubah', '', 'success').then(() => {
				this.$router.push({ path: '/products' });
			});
		},

		currency,
	},

	computed: {
		...mapGetters(['getOperator']),
	},

	setup() {
		const titleStack = ref(['Admin', 'Markup']);

		return {
			titleStack,
			mdiBallot,
			mdiBallotOutline,
			mdiAccount,
			mdiMail,
			mdiCheck,
		};
	},

	created() {
		this.$store.dispatch('fetchOperator', this.code);
	},

	mounted() {
		this.gcustomer();
		this.goperator();
	},
};
</script>
