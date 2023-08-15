import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import store from './store';
import i18n from './locale'; // Internationalization
import '@/assets/styles/global.scss';
import '@/assets/styles/background.scss';
import '@/plugins/httpRequest';
import '@/plugins/commonMethods';
import '@/plugins/toastMessageProvider';
import {to} from 'await-to-js'
import '@/router/permission'
import VueToast from 'vue-toast-notification';
import '@/assets/styles/vueToastTheme.scss';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "@mdi/font/css/materialdesignicons.min.css";
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

Vue.use(VuePersianDatetimePicker)


Vue.use(VueSweetalert2, {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
    confirmButtonText: i18n.t('ui.submit'),
    cancelButtonText: i18n.t('ui.cancel')
});
Vue.use(VueToast, {
    position: 'bottom-left'
});
Vue.prototype.to = to;
Vue.config.productionTip = false;

Vue.prototype.showLoader = () => {
    (async () => {
        await store.dispatch('showLoading');
    })();
}
Vue.prototype.ls = () => {
    (async () => {
        await store.dispatch('showLoading');
    })();
}
Vue.prototype.hideLoader = () => {
    (async () => {
        await store.dispatch('hideLoading');
    })();
}
Vue.prototype.lh = () => {
    (async () => {
        await store.dispatch('hideLoading');
    })();
}
Vue.prototype.showDelete = async (index) => {
    return await store.dispatch('deleteDialog', index);
}

new Vue({
    vuetify, router, store, i18n, render: h => h(App)
}).$mount('#app')
