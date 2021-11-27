import {
	mdiDesktopMac,
	mdiAccount,
	mdiAccountGroup,
	mdiAccountVoice,
	mdiMargin,
	mdiCreditCard,
	mdiPackageVariant,
	mdiPackageVariantClosed,
	mdiChartLine,
	mdiChartBox,
	mdiCurrencyUsd,
	mdiInboxMultiple,
	mdiInboxMultipleOutline,
	mdiBillboard,
	mdiImageArea,
	mdiInformation,
	mdiSackPercent,
	mdiBank
} from '@mdi/js'

export default [
	'Dashboard',
	[
		{
			to: '/',
			icon: mdiDesktopMac,
			label: 'Dashboard'
		},
	],
	'manage', [
		{
			to: '/access',
			icon: mdiAccountGroup,
			label: 'User Akses'
		},
		{
			to: '/support',
			icon: mdiAccountVoice,
			label: 'Customer Services'
		},
		{
			to: '/banner',
			icon: mdiBillboard,
			label: 'Banner'
		},
		{
			to: '/flash',
			icon: mdiImageArea,
			label: 'Banner Flash'
		},
		{
			to: '/info',
			icon: mdiInformation,
			label: 'Informasi'
		},
		{
			to: '/reward',
			icon: mdiSackPercent,
			label: 'Reward'
		}
	],
	'administration', [
		{
			to: '/resellers',
			icon: mdiAccount,
			label: 'Reseller'
		},
		{
			to: '/products',
			icon: mdiPackageVariant,
			label: 'Produk'
		},
		{
			to: '/provider',
			icon: mdiPackageVariantClosed,
			label: 'Provider'
		}
	],
	'Transactions', [
		{
			to: '/transaction',
			icon: mdiMargin,
			label: 'Transaksi'
		},
		{
			to: '/deposit',
			icon: mdiCreditCard,
			label: 'Tiket Deposit'
		},
		{
			to: '/profit',
			icon: mdiChartBox,
			label: 'Laba Rugi'
		},
		{
			to: '/commission',
			icon: mdiCurrencyUsd,
			label: 'Komisi'
		}
	],
	'logs', [
		{
			to: '/inbox',
			icon: mdiInboxMultiple,
			label: 'Pesan Masuk'
		},
		{
			to: '/outbox',
			icon: mdiInboxMultipleOutline,
			label: 'Pesan Keluar'
		},
		{
			to: '/mutation',
			icon: mdiBank,
			label: 'Mutasi Bank'
		},
		{
			to: '/winpay',
			icon: mdiChartLine,
			label: 'Mutasi Winpay'
		},
	],
]
