<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Reseller</hero-bar>
	<main-section>
		<card-component title="Manage Reseller" :icon="mdiAccount" has-table>
			<table id="example">
				<thead>
					<tr>
						<th>Kode</th>
						<th>Nama</th>
						<th>Saldo</th>
						<th>Markup</th>
						<th>Poin</th>
						<th>Upline</th>
						<th>Type</th>
						<th>Status</th>
						<th>Verifikasi</th>
						<th>Multi Devices</th>
						<th>Komisi</th>
						<th>Pengirim</th>
						<th>Kecamatan</th>
						<th>Kabupaten</th>
						<th>Provinsi</th>
						<th>Alamat</th>
						<th>Tanggal Daftar</th>
						<th>Suspend</th>
						<!--

 -->
					</tr>
				</thead>
				<!-- <td class="is-actions-cell">
							<jb-buttons
								type="justify-start lg:justify-end"
								no-wrap
							>
								<jb-button
									class="mr-3"
									color="success"
									:icon="mdiEye"
									small
									@click="toReseller(reseller.kode)"
								/>
								<jb-button
									color="danger"
									:icon="mdiTrashCan"
									small
									@click="removeCustomer(reseller.kode)"
								/>
							</jb-buttons>
						</td> -->
			</table>
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {
	username,
	address,
	currency,
	active,
	formatdate,
	alamat,
	kecamatan,
	kabupaten,
	provinsi,
} from '@/lib/util.js';
import { ref } from 'vue';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import $ from 'jquery';
//Datatable Modules
import 'datatables.net-bs';
import jsZip from 'jszip';
import 'datatables.net-buttons-bs';
import 'datatables.net-buttons/js/buttons.colVis.min';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons/js/buttons.flash.min';
import 'datatables.net-buttons/js/buttons.html5.min';

//import Level from '@/components/Level';
/* import JbButtons from '@/components/JbButtons';
import JbButton from '@/components/JbButton'; */

import {
	mdiAccountMultiple,
	mdiCartOutline,
	mdiFinance,
	mdiMonitorCellphone,
	mdiReload,
	mdiGithub,
	mdiEye,
	mdiTrashCan,
	mdiMagnify,
	mdiAccount,
} from '@mdi/js';

export default {
	components: {
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
		//Level,
		/* JbButtons,
		JbButton, */
	},

	data() {
		return {};
	},

	computed: mapGetters(['allReseller']),

	methods: {
		...mapActions(['fetchResellers', 'removeCustomer']),

		toReseller(kode) {
			this.$router.push({
				name: 'Reseller',
				params: {
					code: kode,
				},
			});
		},

		username,
		address,
		currency,
		active,
		formatdate,
		kecamatan,
		kabupaten,
		provinsi,
		alamat,
	},

	created() {
		this.fetchResellers();
	},

	setup() {
		const titleStack = ref(['Admin', 'Reseller']);

		return {
			titleStack,
			mdiAccount,
			mdiAccountMultiple,
			mdiCartOutline,
			mdiFinance,
			mdiMonitorCellphone,
			mdiReload,
			mdiGithub,
			mdiEye,
			mdiTrashCan,
			mdiMagnify,
		};
	},

	mounted() {
		window.JSZip = jsZip;
		const obj = JSON.stringify(this.allReseller);
		const d = JSON.parse(obj);
		var editor;

		var data = [];
		for (var i = 0; i < d.length; i++) {
			data.push([
				d[i]['kode'],
				d[i]['nama'],
				d[i]['saldo'],
				d[i]['markup'],
				d[i]['poin'],
				d[i]['kode_upline'],
				d[i]['kode_level'],
				d[i]['aktif'] == 1 ? 'aktif' : 'Tidak Aktif',
				d[i]['oid'] == '00'
					? 'Approve'
					: d[i]['oid'] == '02'
					? 'Pending'
					: d[i]['oid'] == '03'
					? 'Reject'
					: '',
				d[i]['data.device_multi'] == null ? 'no' : 'yes',
				'',
				d[i]['pengirim.pengirim'],
				this.kecamatan(d[i]['alamat']),
				this.kabupaten(d[i]['alamat']),
				this.provinsi(d[i]['alamat']),
				this.alamat(d[i]['alamat']),
				d[i]['tgl_daftar'],
				d[i]['suspend'] == 0 ? 'normal' : 'Suspend',
			]);
		}

		setTimeout(function () {
			$('#example').DataTable({
				data: data,
				scrollX: true,
				deferRender: true,
				scrollY: 500,
				scrollCollapse: true,
				scroller: true,
				dom: 'Bfrtip',
				//buttons: ['excel'],
				select: true,
			});
		}, 500);
	},
};
</script>
