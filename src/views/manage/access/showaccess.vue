<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>User Akses</hero-bar>
	<main-section>
		<card-component title="User Akses" :icon="mdiMonitorCellphone" form>
			<field label="Nama">
				<control v-model="getUser.R_Name" />
			</field>

			<field label="username">
				<control v-model="getUser.R_Username" />
			</field>

			<field label="Password">
				<control v-model="getUser.R_Password" />
			</field>

			<field label="Akses">
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
					v-model="getUser.R_Role"
				>
					<option
						v-for="listValue in valuesList"
						v-bind:key="listValue"
						:value="listValue"
					>
						{{ listValue }}
					</option>
				</select>
			</field>

			<field label="Status">
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
					v-model="getUser.R_Status"
				>
					<option value="1">Aktif</option>
					<option value="0">Tidak Aktif</option>
				</select>
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
		...mapActions(['fetchUser', 'updateUser']),
		_address,
		currency,
		format_date,

		onSave() {
			const payload = {
				R_ID: this.getUser.R_ID,
				R_Name: this.getUser.R_Name,
				R_Username: this.getUser.R_Username,
				R_Password: this.getUser.R_Password,
				R_Role: this.getUser.R_Role,
				R_Status: this.getUser.R_Status,
			};
			this.updateUser(payload);
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
		...mapGetters(['getUser']),
	},

	created() {
		this.$store.dispatch('fetchUser', this.code);
	},

	setup() {
		const titleStack = ref(['Admin', 'Akses']);

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