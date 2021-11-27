import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/auth/Login.vue';

import Providers from '@/views/general/Providers.vue';

/* Reseller */
import lReseller from '@/views/administration/reseller/listreseller.vue';
import sReseller from '@/views/administration/reseller/showreseller.vue';

import Products from '@/views/general/Products.vue';
import Product from '@/views/general/Product.vue';
import Markup from '@/views/general/Markup.vue';
import Addmarkup from '@/views/general/Addmarkup.vue';

import Inbox from '@/views/message/Inbox.vue';
import Outbox from '@/views/message/Outbox.vue';

/* Transaksi */
import Transactions from '@/views/report/Transaction.vue';
import Transaction from '@/views/report/Transactionshow.vue';

/* Mutasi Bank */
import lMutation from '@/views/report/bank/listmutation.vue';
import sMutation from '@/views/report/bank/showmutation.vue';

import Deposit from '@/views/report/Deposit.vue';
import Profit from '@/views/report/Profit.vue';
import Commission from '@/views/report/Commission.vue';
import Depositshow from '@/views/report/Depositshow.vue';

/* Home */
import Home from '@/views/Home'

/* User Akses */
import lAccess from '@/views/manage/access/listaccess'
import sAccess from '@/views/manage/access/showaccess'
import cAccess from '@/views/manage/access/addaccess'

/* Banner */
import lBanner from '@/views/manage/banner/listbanner'
import sBanner from '@/views/manage/banner/showbanner'
import cBanner from '@/views/manage/banner/addbanner'

/* Flash */
import lFlash from '@/views/manage/flash/listflash'
import sFlash from '@/views/manage/flash/showflash'
import cFlash from '@/views/manage/flash/addflash'

/* Customer Service */
import lSupport from '@/views/manage/support/listsupport'
import sSupport from '@/views/manage/support/showsupport'
import cSupport from '@/views/manage/support/addsupport'

/* Info */
import lInfo from '@/views/manage/info/listinfo'
import sInfo from '@/views/manage/info/showinfo'
import cInfo from '@/views/manage/info/addinfo'

/* Reward */
import lReward from '@/views/manage/reward/listreward'
import sReward from '@/views/manage/reward/showreward'
import cReward from '@/views/manage/reward/addreward'

/* Winpay */
import lWinpay from '@/views/report/winpay/listwinpay'
import sWinpay from '@/views/report/winpay/showinpay'

/* Provider */
import lProvider from '@/views/administration/provider/listprovider'
import cProvider from '@/views/administration/provider/addprovider'
import sProvider from '@/views/administration/provider/showprovider'

const routes = [
	{
		meta: { title: 'Dashboard' },
		path: '/',
		name: 'home',
		component: Home
	},
	{
		meta: { title: 'Login', formScreen: true },
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		meta: {
			title: 'Providers'
		},
		path: '/providers',
		name: 'Providers',
		component: Providers,
	},
	{
		meta: {
			title: 'Resellers'
		},
		path: '/resellers',
		name: 'Resellers',
		component: lReseller,
	},
	{
		meta: {
			title: 'Reseller'
		},
		path: '/reseller/:code',
		name: 'Reseller',
		component: sReseller,
		props: true,
	},
	{
		meta: {
			title: 'Produk'
		},
		path: '/products',
		name: 'Products',
		component: Products,
	},
	{
		meta: {
			title: 'Produk'
		},
		path: '/product/:code',
		name: 'Product',
		component: Product,
		props: true,
	},
	{
		path: '/markup',
		name: 'Addmarkup',
		component: Addmarkup,
	},
	{
		path: '/markup/:code',
		name: 'Markup',
		component: Markup,
		props: true,
	},
	{
		meta: {
			title: 'Inbox'
		},
		path: '/inbox',
		name: 'Inbox',
		component: Inbox,
	},
		{
		meta: {
			title: 'Outbox'
		},
		path: '/outbox',
		name: 'Outbox',
		component: Outbox,
	},
	{
		meta: {
			title: 'Transaksi'
		},
		path: '/transaction',
		name: 'Transactions',
		component: Transactions,
	},
	{
		path: '/transaction/:code',
		name: 'Transaction',
		component: Transaction,
		props: true,
	},
	{
		meta: {
			title: 'Mutasi'
		},
		path: '/mutation',
		name: 'Mutations',
		component: lMutation,
	},
	{
		path: '/mutation/:code',
		name: 'Mutation',
		component: sMutation,
		props: true,
	},
	{
		meta: {
			title: 'Deposit'
		},
		path: '/deposit',
		name: 'Deposits',
		component: Deposit,
	},
	{
		path: '/deposit/:code',
		name: 'Deposit',
		component: Depositshow,
	},
	{
		meta: {
			title: 'Laba'
		},
		path: '/profit',
		name: 'profit',
		component: Profit,
	},
	{
		meta: {
			title: 'Komisi'
		},
		path: '/commission',
		name: 'Commission',
		component: Commission,
	},

	// User Akses
	{
		meta: {
			title: 'User Akses'
		},
		path: '/access',
		name: 'lAccess',
		component: lAccess
	},
	{
		meta: {
			title: 'User Akses'
		},
		path: '/access/:code',
		name: 'sAccess',
		component: sAccess,
		props: true,
	},
	{
		meta: {
			title: 'User Akses'
		},
		path: '/access/create',
		name: 'cAccess',
		component: cAccess,
	},

	// Banner
	{
		meta: {
			title: 'Banner'
		},
		path: '/banner',
		name: 'lBanner',
		component: lBanner
	},
	{
		meta: {
			title: 'Banner'
		},
		path: '/banner/:code',
		name: 'sBanner',
		component: sBanner,
		props: true,
	},
	{
		meta: {
			title: 'Banner'
		},
		path: '/banner/create',
		name: 'cBanner',
		component: cBanner,
	},

	// Banner-flash
	{
		meta: {
			title: 'Banner Flash'
		},
		path: '/flash',
		name: 'lFlash',
		component: lFlash
	},
	{
		meta: {
			title: 'Banner Flash'
		},
		path: '/flash/:code',
		name: 'sFlash',
		component: sFlash,
		props: true,
	},
	{
		meta: {
			title: 'Banner Flash'
		},
		path: '/flash/create',
		name: 'cFlash',
		component: cFlash,
	},

	//Customer Service
	{
		meta: {
			title: 'Customer Service'
		},
		path: '/support',
		name: 'lSupport',
		component: lSupport
	},
	{
		meta: {
			title: 'Customer Service'
		},
		path: '/support/:code',
		name: 'sSupport',
		component: sSupport,
		props: true,
	},
	{
		meta: {
			title: 'Customer Service'
		},
		path: '/support/create',
		name: 'cSupport',
		component: cSupport,
	},

	// Info
	{
		meta: {
			title: 'Info'
		},
		path: '/info',
		name: 'lInfo',
		component: lInfo
	},
	{
		meta: {
			title: 'Info'
		},
		path: '/info/:code',
		name: 'sInfo',
		component: sInfo,
		props: true,
	},
	{
		meta: {
			title: 'Info'
		},
		path: '/info/create',
		name: 'cInfo',
		component: cInfo,
	},

	//Reward
	{
		meta: {
			title: 'Reward'
		},
		path: '/reward',
		name: 'lReward',
		component: lReward
	},
	{
		meta: {
			title: 'Reward'
		},
		path: '/reward/:code',
		name: 'sReward',
		component: sReward,
		props: true,
	},
	{
		meta: {
			title: 'Reward'
		},
		path: '/reward/create',
		name: 'cReward',
		component: cReward,
	},

	// winpay
	{
		meta: {
			title: 'Mutasi Winpay'
		},
		path: '/winpay',
		name: 'lWinpay',
		component: lWinpay
	},
	{
		meta: {
			title: 'Mutasi Winpay'
		},
		path: '/winpay/:code',
		name: 'sWinpay',
		component: sWinpay,
		props: true,
	},

	//Reward
	{
		meta: {
			title: 'Provider'
		},
		path: '/provider',
		name: 'lProvider',
		component: lProvider
	},
	{
		meta: {
			title: 'Provider'
		},
		path: '/provider/:code',
		name: 'sProvider',
		component: sProvider,
		props: true,
	},
	{
		meta: {
			title: 'Provider'
		},
		path: '/provider/create',
		name: 'cProvider',
		component: cProvider,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'active',
});

export default router;
