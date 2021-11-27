<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>User Akses</hero-bar>
	<main-section>
		<card-component title="User Akses" :icon="mdiMonitorCellphone" form>
			<field label="Nama">
				<control v-model="role.R_Name" placeholder="Masukkan nama" />
			</field>

			<field label="username">
				<control
					v-model="role.R_Username"
					placeholder="Masukkan username"
				/>
			</field>

			<field label="Password">
				<control
					v-model="role.R_Password"
					placeholder="Masukkan password"
				/>
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
					v-model="role.R_Role"
				>
					<option value="" disabled selected>Pilih Akses</option>
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
					v-model="role.R_Status"
				>
					<option value="" disabled selected>Pilih status</option>
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
				type="button"
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
	mdiTableOff
} from '@mdi/js';

export default {
	data() {
		return {
			selectedValue: '',
			valuesList: ['Administrator', 'Operator', 'Customer Service'],
			role: {
				R_Name: '',
				R_Username: '',
				R_Password: '',
				R_Role: '',
				R_Status: '',
			},
		};
	},

	methods: {
		...mapActions(['createUser']),
		_address,
		currency,
		format_date,

		onSubmit() {
			this.createUser(this.role);
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