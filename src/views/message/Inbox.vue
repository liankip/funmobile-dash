<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Inbox</hero-bar>
	<main-section>
		<card-component
			title="Pesan Masuk"
			:icon="mdiAccountMultiple"
			has-table
		>
			<table class="table-auto table-fixed">
				<thead>
					<tr>
						<th>Kode</th>
						<th>Tanggal</th>
						<th>Pengirim</th>
						<th>Pesan</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(inbox, index) in allInbox.result"
						:key="index"
						@click="message(inbox.pesan)"
					>
						<td>{{ inbox.kode }}</td>
						<td>{{ formatdate(inbox.tgl_entri) }}</td>
						<td>{{ inbox.pengirim }}</td>
						<td>
							{{ inbox.pesan.substring(0, 18) + ' ..' }}
						</td>
						<td data-label="staus">
							<span
								class="
									inline-flex
									items-center
									justify-center
									px-2
									py-1
									text-xs
									font-bold
									leading-none
									text-green-100
									bg-green-600
									rounded-full
									uppercase
								"
								v-if="inbox.status >= 20 && inbox.status <= 22"
								>TERKIRIM</span
							>
							<span
								class="
									inline-flex
									items-center
									justify-center
									px-2
									py-1
									text-xs
									font-bold
									leading-none
									text-yellow-100
									bg-yellow-600
									rounded-full
									uppercase
								"
								v-if="inbox.status >= 0 && inbox.status <= 2"
								>PENDING</span
							>
							<span
								class="
									inline-flex
									items-center
									justify-center
									px-2
									py-1
									text-xs
									font-bold
									leading-none
									text-red-100
									bg-red-600
									rounded-full
									uppercase
								"
								v-if="inbox.status >= 40"
								>GAGAL TERKIRIM</span
							>
						</td>
					</tr>
				</tbody>
			</table>
			<v-pagination
				v-model="page"
				style="list-style: disc outside; list-style-type: none"
				:pages="allInbox.pages"
				:range-size="1"
				active-color="#DCEDFF"
				@update:modelValue="updateHandler"
			/>
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VPagination from '@hennge/vue3-pagination';
import { ref } from 'vue';
import { formatdate } from '@/lib/util.js';
import {
	mdiMonitorCellphone,
	mdiAccountMultiple,
	mdiTableBorder,
	mdiTableOff,
} from '@mdi/js';
import MainSection from '@/components/MainSection';
import CardComponent from '@/components/CardComponent';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import 'animate.css';

export default {
	name: 'Tables',
	components: {
		VPagination,
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
	},
	data() {
		return {
			page: 1,
		};
	},
	computed: {
		...mapGetters(['allInbox']),
	},
	methods: {
		...mapActions(['fetchInbox']),

		getRequestPayload(page) {
			let params = {};

			if (page) {
				params['page'] = page;
			}

			return params;
		},

		retrieveInbox() {
			let payload = this.getRequestPayload(this.page);

			this.$store.dispatch('fetchInbox', payload);
		},

		refreshList() {
			this.retrieveInbox();
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveInbox();
		},

		message(index) {
			this.$swal.fire({
				title: `<strong class="text-base md:text-lg">${index}</strong>`,
				width: '2000px',
			});
		},

		formatdate,
	},
	setup() {
		const titleStack = ref(['Admin', 'Inbox']);

		return {
			titleStack,
			mdiMonitorCellphone,
			mdiAccountMultiple,
			mdiTableBorder,
			mdiTableOff,
		};
	},

	mounted() {
		this.retrieveInbox();
	},
};
</script>
