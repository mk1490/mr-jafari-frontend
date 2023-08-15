import Vue from 'vue';
import i18n from '@/locale';

Vue.prototype.addItemSuccessToast = () => {
    Vue.prototype.$toast.success(i18n.t('ui.addItemSuccess'))
};
Vue.prototype.addItemFailedToast = () => {
    Vue.prototype.$toast.error(i18n.t('ui.addItemFailed'))
};
Vue.prototype.updateItemSuccessToast = () => {
    Vue.prototype.$toast.success(i18n.t('ui.updateItemSuccess'))
};
Vue.prototype.updateItemFailedToast = () => {
    Vue.prototype.$toast.error(i18n.t('ui.updateItemFailed'))
};