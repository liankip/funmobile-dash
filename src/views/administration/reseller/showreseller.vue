<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>
		{{ getReseller.kode }}
		<span v-if="getReseller.oid == '00'" class="icon has-text-primary"
			><i class="mdi mdi-checkbox-marked-circle"
		/></span>
		<span v-if="getReseller.oid == '02'" class="icon has-text-warning"
			><i class="mdi mdi-timelapse"
		/></span>
		<span v-if="getReseller.oid >= '03'" class="icon has-text-danger"
			><i class="mdi mdi-close-circle"
		/></span>
	</hero-bar>

	<main-section>
		<card-component
			v-if="getReseller['toko.nama_toko']"
			title="Toko"
			:icon="mdiBallot"
			form
		>
			<field label="Nama toko dan Tipe toko">
				<control disabled v-model="getReseller['toko.nama_toko']" />
				<control disabled v-model="getReseller['toko.tipe_toko']" />
			</field>

			<field label="Alamat Toko">
				<control
					type="textarea"
					disabled
					v-model="getReseller['toko.alamat_toko']"
				/>
			</field>
		</card-component>

		<card-component title="Reseller" :icon="mdiBallot" form>
			<field label="nama">
				<control v-model="getReseller.nama" />
			</field>

			<field label="Saldo">
				<control v-model="getReseller.saldo" />
			</field>

			<field label="Markup">
				<control v-model="getReseller.markup" />
			</field>

			<field label="Poin">
				<control v-model="getReseller.poin" />
			</field>

			<field label="Nomor KTP">
				<control type="number" v-model="getReseller.nomor_ktp" placeholder="0"/>
			</field>

			<field label="NPWP">
				<control type="number" v-model="getReseller.npwp" placeholder="0"/>
			</field>

			<field label="ID Upline">
				<p v-text="getReseller.kode_upline"></p>
			</field>

			<field label="No Hanphone">
				<p v-text="getReseller['pengirim.pengirim']"></p>
			</field>

			<field label="Tanggal Daftar">
				<p v-text="getReseller.tgl_daftar"></p>
			</field>

			<divider />

			<section class="py-8">
				<div class="flex flex-wrap -mx-4">
					<div
						v-for="(list, index) in imagesLines"
						:key="index"
						class="md:w-1/2 px-4 mb-8 md:mb-0"
					>
						<img v-if="list" class="shadow-md" :src="list" alt="" />
						<span class="bold" v-else>Data foto tidak ada</span>
					</div>
				</div>
			</section>

			<field label="Verifikasi Reseller">
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
					v-model="getReseller.oid"
				>
					<option value="00">Approve</option>
					<option value="02">Pending</option>
					<option value="03">Reject</option>
					<option value="null">Belum Verifikasi</option>
				</select>
			</field>

			<field label="Suspend Reseller">
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
					v-model="getReseller.suspend"
				>
					<option value="0">Normal</option>
					<option value="1">Suspend</option>
					<option :value="null" disabled selected>
						Suspend Reseller
					</option>
				</select>
			</field>

			<divider />

			<field label="Kecamatan">
				<p v-text="kecamatan(getReseller.alamat)"></p>
			</field>

			<field label="Kabupaten">
				<p v-text="kabupaten(getReseller.alamat)"></p>
			</field>

			<field label="Provinsi">
				<p v-text="provinsi(getReseller.alamat)"></p>
			</field>

			<field label="Alamat">
				<p v-text="alamat(getReseller.alamat)"></p>
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

		<card-component
			v-if="getReseller['data.data_id']"
			title="Daftar Device"
			:icon="mdiBallot"
			form
		>
			<card-component
				v-for="device in allDevices"
				:key="device.device_id"
				:icon="mdiBallot"
			>
				<p class="text-base md:text-lg">
					DEVICE ID: {{ device.data_id }} {{ device.device_id }}
				</p>
				<field label="Login">
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
						v-model="device.device_act"
						@change="onAuth(device.data_id, $event)"
					>
						<option value="0">Logout</option>
						<option value="1">Login</option>
						<option value="null">Belum ada login</option>
					</select>
				</field>

				<field label="Multi Device">
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
						v-model="device.device_multi"
						@change="onDevice(device.data_id, $event)"
					>
						<option value="0">Normal</option>
						<option value="1">Suspend</option>
					</select>
				</field>

				<button
					type="submit"
					v-on:click="onRemove(device.data_id)"
					class="
						bg-blue-500
						hover:bg-blue-700
						text-white
						font-bold
						py-2
						px-4
						rounded
					"
				>
					Hapus
				</button>
			</card-component>
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
import CardComponent from '@/components/CardComponent';
import HeroBar from '@/components/HeroBar';
import Field from '@/components/Field';
import Control from '@/components/Control';
import Divider from '@/components/Divider.vue';
import {
	currency,
	kecamatan,
	kabupaten,
	provinsi,
	alamat,
} from '@/lib/util.js';

export default {
	props: ['code'],
	components: {
		Divider,
		MainSection,
		HeroBar,
		CardComponent,
		TitleBar,
		Field,
		Control,
	},
	methods: {
		...mapActions([
			'fetchReseller',
			'fetchDevice',
			'multipleDevice',
			'clearLogin',
			'removeDevice',
			'updateReseller'
		]),

		onSave() {
			const payload = {
				kode: this.getReseller.kode,
				nama: this.getReseller.nama,
				saldo: this.getReseller.saldo,
				markup: this.getReseller.markup,
				poin: this.getReseller.poin,
				nomor_ktp: this.getReseller.nomor_ktp,
				npwp: this.getReseller.npwp,
				aktif: this.getReseller.aktif,
				oid: this.getReseller.oid,
				suspend: this.getReseller.suspend
			};
			this.updateReseller(payload);
		},

		onDevice(kode, event) {
			const verify =
				event.target.options[event.target.options.selectedIndex].value;
			this.multipleDevice({
				kode: kode,
				device_multi: verify,
			});
		},

		onAuth(kode, event) {
			const verify =
				event.target.options[event.target.options.selectedIndex].value;
			this.clearLogin({
				kode: kode,
				device_act: verify,
			});
		},

		onRemove(kode) {
			this.$swal.fire(
				'Berhasil',
				'device ' + kode + ' berhasil di hapus',
				'success'
			);
			this.removeDevice({
				kode: kode,
			});
		},

		currency,
		kecamatan,
		kabupaten,
		provinsi,
		alamat,
	},

	setup() {
		const titleStack = ref(['Admin', 'Reseller']);

		return {
			titleStack,
			mdiBallot,
			mdiBallotOutline,
			mdiAccount,
			mdiMail,
			mdiCheck,
		};
	},

	computed: {
		...mapGetters(['getReseller', 'allDevices']),

		imagesLines: function () {
			return (this.getReseller.url_report || '').split(',');
		},

		detailRetail: function () {
			return this.getReseller.toko;
		},
	},

	created() {
		this.$store.dispatch('fetchReseller', this.code);
		this.$store.dispatch('fetchDevice', this.code);
	},
};
</script>