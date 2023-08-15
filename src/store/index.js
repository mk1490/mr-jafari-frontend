import Vue from 'vue';
import Vuex from 'vuex';
import syncStorage from './plugins/syncStorage';
import permission from './modules/permission';
import settings from './modules/settings';
import baseData from './modules/baseData';

import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        permission,
        settings,
        user,
        baseData
    },

    plugins: [
        syncStorage({}),
    ],
    state: {},
    mutations: {},
    actions: {},
    getters: {},
});
