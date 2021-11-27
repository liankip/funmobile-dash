<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Provider {{ provider.kode }}</hero-bar>
	<main-section>
		<card-component title="Provider" :icon="mdiMonitorCellphone" form>
			<field label="kode Provider">
				<control
					v-model="provider.kode"
					placeholder="Masukkan kode provider"
				/>
			</field>

			<field label="Nama Provider">
				<control
					v-model="provider.nama"
					placeholder="Masukkan nama provider"
				/>
			</field>

			<field label="Prefix Tujuan">
				<control
					type="textarea"
					v-model="provider.prefix_tujuan"
					placeholder="0812, 0813, dipisah dengan tanda koma `,`"
				/>
			</field>

			<field label="Gangguan">
				<select
					class="
						px-3
						py-2
						max-w-full
						focus:ring focus:outline-none
						border border-gray-700
						rounded
						w-full
					"
					v-model="provider.gangguan"
				>
					<option value="" disabled hidden>
						Pilih status gangguan
					</option>
					<option value="0">Normal</option>
					<option value="1">Gangguan</option>
				</select>
			</field>

			<field label="Kosong">
				<select
					class="
						px-3
						py-2
						max-w-full
						focus:ring focus:outline-none
						border border-gray-700
						rounded
						w-full
					"
					v-model="provider.kosong"
				>
					<option value="" disabled hidden>
						Pilih status stok kosong
					</option>
					<option value="0">Tersedia</option>
					<option value="1">Kosong</option>
				</select>
			</field>

			<field label="Regex Tujuan">
				<control
					v-model="provider.regex_tujuan"
					placeholder="Masukkan regex tujuan"
				/>
			</field>

			<field label="Catatan">
				<control
					type="textarea"
					v-model="provider.catatan"
					placeholder="Masukkan deskripis provider"
				/>
			</field>

			<field label="Gambar Provider">
				<control
					type="textarea"
					v-model="provider.apk_ikon"
					placeholder="Masukkan gambar provider"
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
import { _address } from '@/lib/util.js';

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
			provider: {
				kode: '',
				nama: '',
				prefix_tujuan: '',
				gangguan: '',
				kosong: '',
				regex_tujuan: '',
				catatan: '',
				apk_ikon: '',
			},
		};
	},

	methods: {
		...mapActions(['addProvider']),

		onSubmit() {
			this.addProvider(this.provider);
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