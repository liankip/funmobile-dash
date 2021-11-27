<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>FLash Banner</hero-bar>
	<main-section>
		<card-component title="FLash Banner" :icon="mdiMonitorCellphone" form>
			<field label="Judul">
				<control v-model="getFlash.title_flash" />
			</field>

			<field label="Deskripsi">
				<control v-model="getFlash.desc_flash" />
			</field>

			<field label="Link Gambar">
				<control v-model="getFlash.img_flash" />
			</field>

			<field label="Link">
				<control v-model="getFlash.link_flash" />
			</field>

			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="
							block
							uppercase
							tracking-wide
							text-gray-700 text-xs
							font-bold
							mb-2
						"
						for="grid-first-name"
					>
						Tanggal Awal
					</label>
					<datepicker
						class="
							appearance-none
							block
							w-full
							text-gray-700
							border border-gray-200
							rounded
							py-3
							px-4
							mb-3
							leading-tight
							focus:outline-none
							focus:bg-white
						"
						id="grid-first-name"
						type="text"
						v-model="getFlash.start_flash"
					/>
				</div>
				<div class="w-full md:w-1/2 px-3">
					<label
						class="
							block
							uppercase
							tracking-wide
							text-gray-700 text-xs
							font-bold
							mb-2
						"
						for="grid-last-name"
					>
						Tanggal Akhir
					</label>
					<datepicker
						class="
							appearance-none
							block
							w-full
							text-gray-700
							border border-gray-200
							rounded
							py-3
							px-4
							leading-tight
							focus:outline-none
							focus:bg-white
							focus:border-gray-500
						"
						v-model="getFlash.end_flash"
						id="grid-last-name"
						type="text"
					/>
				</div>
			</div>

			<field label="Type">
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
					v-model="getFlash.type_flash"
				>
					<option value="1">Jalan Sekali Setiap Pengguna</option>
					<option value="0">Jalan Setiap Buka App</option>
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
					v-model="getFlash.status_flash"
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

import Datepicker from 'vue3-datepicker';

import {
	mdiMonitorCellphone,
	mdiAccountMultiple,
	mdiTableBorder,
	mdiTableOff,
} from '@mdi/js';

export default {
	data() {
		return {};
	},

	props: ['code'],

	methods: {
		...mapActions(['fetchFlash', 'updateFlash']),
		_address,
		currency,
		format_date,

		onSave() {
			const payload = {
				code_flash: this.getFlash.code_flash,
				title_flash: this.getFlash.title_flash,
				desc_flash: this.getFlash.desc_flash,
				img_flash: this.getFlash.img_flash,
				link_flash: this.getFlash.link_flash,
				start_flash: this.getFlash.start_flash,
				end_flash: this.getFlash.end_flash,
				type_flash: this.getFlash.type_flash,
				status_flash: this.getFlash.status_flash,
			};
			this.updateFlash(payload);
		},
	},

	components: {
		MainSection,
		HeroBar,
		CardComponent,
		TitleBar,
		Field,
		Control,
		Datepicker,
	},

	computed: {
		...mapGetters(['getFlash']),
	},

	created() {
		this.$store.dispatch('fetchFlash', this.code);
	},

	setup() {
		const titleStack = ref(['Admin', 'Flash Banner']);

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