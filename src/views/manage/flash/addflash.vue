<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Flash Banner</hero-bar>
	<main-section>
		<card-component title="Flash Banner" :icon="mdiMonitorCellphone" form>
			<field label="Judul">
				<control
					v-model="flash.title_flash"
					placeholder="Masukkan judul flash banner"
				/>
			</field>

			<field label="Deskripsi">
				<control
					v-model="flash.desc_flash"
					placeholder="Masukkan deskripsi flash banner"
				/>
			</field>

			<field label="Link Gambar">
				<control
					v-model="flash.img_flash"
					placeholder="Masukkan link gambar flash banner"
				/>
			</field>

			<field label="Link">
				<control
					v-model="flash.link_flash"
					placeholder="Masukkan link flash banner"
				/>
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
						v-model="flash.start_flash"
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
						v-model="flash.end_flash"
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
					v-model="flash.type_flash"
				>
					<option value="null" disabled>
						Pilih Type Flash Banner
					</option>
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
					v-model="flash.status_flash"
				>
					<option value="null" disabled>
						Pilih Status Flash Banner
					</option>
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

import Datepicker from 'vue3-datepicker';

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
			flash: {
				title_flash: '',
				desc_flash: '',
				img_flash: '',
				link_flash: '',
				start_flash: new Date(),
				end_flash: new Date(),
				type_flash: null,
				status_flash: null,
			},
		};
	},

	methods: {
		...mapActions(['createFlash']),
		_address,
		currency,
		format_date,

		onSubmit() {
			this.createFlash(this.flash);
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