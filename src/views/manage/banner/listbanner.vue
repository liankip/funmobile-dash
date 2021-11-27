
<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Banner</hero-bar>

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
						<router-link to="/banner/create"
							>+ Tambah Banner</router-link
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
						<th>Slider</th>
						<th>Url Slider</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr v-for="(banner, index) in allBanner" :key="index">
						<td data-label="title">{{ banner.name_banner }}</td>
						<td data-label="url">
							<img class="h-auto w-24" :src="banner.img_banner" />
						</td>
						<td data-label="link">{{ banner.link_banner }}</td>
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
									@click="toBanner(banner.code_banner)"
								/>
								<jb-button
									type="button"
									color="danger"
									:icon="mdiTrashCan"
									small
									@click="deleteBanner(banner.code_banner)"
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
		...mapGetters(['allBanner']),
	},
	methods: {
		...mapActions(['fetchBanners', 'deleteBanner']),

		retrieveBanners() {
			this.$store.dispatch('fetchBanners');
			setTimeout(function () {
				$('#example').DataTable();
			}, 500);
		},

		toBanner(code) {
			this.$router.push({
				name: 'sBanner',
				params: {
					code: code,
				},
			});
		},
	},

	setup() {
		const titleStack = ref(['Admin', 'Banner']);

		return {
			titleStack,
			mdiEye,
			mdiTrashCan,
		};
	},

	mounted() {
		this.retrieveBanners();
	},
};
</script>
