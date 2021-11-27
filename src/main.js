import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueApexCharts from 'vue3-apexcharts';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '@/assets/css/main.css'

import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';

import Datepicker from 'vue3-datepicker';

//Datatable Modules
import $ from 'jquery'
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"

/* Default title tag */
const defaultDocumentTitle = 'Funmo Dashboard'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.beforeEach(to => {
	store.dispatch('asideMobileToggle', false)
	store.dispatch('asideLgToggle', false)

	store.dispatch('formScreenToggle', !!to.meta.formScreen)
})

router.afterEach(to => {
	if (to.meta && to.meta.title) {
		document.title = `${to.meta.title} — ${defaultDocumentTitle}`
	} else {
		document.title = defaultDocumentTitle
	}
})

import '@hennge/vue3-pagination/dist/vue3-pagination.css';

const Vue = createApp(App);
Vue.use(VueApexCharts);
Vue.use(router);
Vue.use(store);
Vue.use($);
Vue.use(Datepicker);
Vue.use(VueSweetalert2);
Vue.use(SetupCalendar, {}).component('Calendar', Calendar).component('DatePicker', DatePicker);
Vue.mount('#app');
