<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Info</hero-bar>

	<section class="text-gray-600 body-font">
		<div class="container px-4 mx-auto max-w-7x1">
			<div class="flex flex-wrap w-full p-4">
				<div class="w-full mb-6 lg:mb-0">
					<h1
						class="
							sm:text-2xl
							text-2xl
							font-medium font-bold
							title-font
							text-gray-900
						"
					>
						<router-link to="/info/create"
							>+ Tambah Informasi</router-link
						>
					</h1>
					<div class="h-1 w-20 bg-indigo-500 rounded"></div>
				</div>
			</div>
		</div>
	</section>
	<main-section>
		<card-component has-table>
			<table id="example">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Icon</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info, index) in allInfo" :key="index">
						<td data-label="title">{{ info.name_info }}</td>
						<td data-label="contact">
							{{ info.desc_info }}
						</td>
						<td data-label="url">
							<img class="h-auto w-20" :src="info.img_info" />
						</td>
						<td class="is-actions-cell">
							<jb-buttons
								type="justify-start lg:justify-end"
								no-wrap
							>
								<jb-button
									class="mr-3"
									color="success"
									:icon="mdiEye"
									small
									@click="toInfo(info.code_info)"
								/>
								<jb-button
									type="button"
									color="danger"
									:icon="mdiTrashCan"
									small
									@click="deleteInfo(info.code_info)"
								/>
							</jb-buttons>
						</td>
					</tr>
				</tbody>
			</table>
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ref } from 'vue';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import CardComponent from '@/components/CardComponent';
import HeroBar from '@/components/HeroBar';

import JbButtons from '@/components/JbButtons';
import JbButton from '@/components/JbButton';

import $ from 'jquery';

import { mdiEye, mdiTrashCan } from '@mdi/js';

export default {
	components: {
		MainSection,
		CardComponent,
		TitleBar,
		HeroBar,
		JbButtons,
		JbButton,
	},

	computed: {
		...mapGetters(['allInfo']),
	},
	methods: {
		...mapActions(['fetchInfos', 'deleteInfo']),

		retrieveInfo() {
			this.$store.dispatch('fetchInfos');
			setTimeout(function () {
				$('#example').DataTable();
			}, 500);
		},

		toInfo(code) {
			this.$router.push({
				name: 'sInfo',
				params: {
					code: code,
				},
			});
		},
	},

	setup() {
		const titleStack = ref(['Admin', 'Info']);

		return {
			titleStack,
			mdiEye,
			mdiTrashCan,
		};
	},

	mounted() {
		this.retrieveInfo();
	},
};
</script>
