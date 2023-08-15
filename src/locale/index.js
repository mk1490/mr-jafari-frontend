/**
 * vva v0.0.5
 * (c) 2019 NelsonEAX
 * @license MIT
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';

import {settings} from '@/config';
import vuetify from '@/locale/vuetify';
import fa from './fa_IR';

Vue.use(VueI18n);

const messages = {
    fa: {
        ...fa,
        $vuetify: vuetify.fa,
    },
};

/**
 * Available locales
 */
export const locales = [
    {
        title: 'English',
        locale: 'en',
        abbr: 'ENG',
    },
    {
        title: 'فارسی',
        locale: 'fa',
        abbr: 'IRR',
    },
];

/**
 * VueI18n instance
 */
const i18n = new VueI18n({
    // set locale options: en_US | zh_CN | ru_RU
    locale: settings.locale,
    // set locale messages
    messages,
});

/**
 * Set locale to new value at Vue and Vuex.
 *
 * @param {Boolean} newLocale themeDark new value
 */
export async function setLocale(locale) {
    if (i18n.locale !== locale) {
        console.log(`[Locale] Set to "${locale}"`);
        i18n.locale = locale || settings.locale;
    } else {
        console.warn(`[Locale] "${locale}" is current`);
    }
}

export default i18n;
