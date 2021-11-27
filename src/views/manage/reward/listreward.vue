<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Reward</hero-bar>

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
						<router-link to="/reward/create"
							>+ Tambah Reward</router-link
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
						<th>Images</th>
						<th>Poin</th>
						<th>Stock</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr v-for="(reward, index) in allReward" :key="index">
						<td data-label="title">{{ reward.nama }}</td>
						<td data-label="description">
							{{ reward['hadiah_desc.h_desc'] }}
						</td>
						<td data-label="poin">
							<img
								class="h-auto w-20"
								:src="reward['hadiah_desc.h_img']"
							/>
						</td>
						<td data-label="poin">{{ reward.jml_poin }}</td>
						<td data-label="poin">
							{{ reward['hadiah_desc.h_stock'] }}
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
									@click="toReward(reward.kode)"
								/>
								<jb-button
									type="button"
									color="danger"
									:icon="mdiTrashCan"
									small
									@click="deleteReward(reward.kode)"
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
		...mapGetters(['allReward']),
	},
	methods: {
		...mapActions(['fetchRewards', 'deleteReward']),

		retrieveReward() {
			this.$store.dispatch('fetchRewards');
			setTimeout(function () {
				$('#example').DataTable();
			}, 500);
		},

		toReward(code) {
			this.$router.push({
				name: 'sReward',
				params: {
					code: code,
				},
			});
		},
	},

	setup() {
		const titleStack = ref(['Admin', 'Reward']);

		return {
			titleStack,
			mdiEye,
			mdiTrashCan,
		};
	},

	mounted() {
		this.retrieveReward();
	},
};
</script>
