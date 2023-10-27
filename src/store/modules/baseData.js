import Vue from 'vue';
import i18n from '@/locale'
import store from '@/store'

const baseData = {
    state: {
        questions: [],
        userNationalCode: null,
        timeRangeItems: [{
            text: i18n.t('timeRangeItems.recent12Hour'), value: 'recent12Hour'
        }, {
            text: i18n.t('timeRangeItems.recent3Days'), value: 'recent3Days'
        }, {
            text: i18n.t('timeRangeItems.recent15Days'), value: 'recent15Days'
        }, {
            text: i18n.t('timeRangeItems.recentMonth'), value: 'recentMonth'
        }, {
            text: i18n.t('timeRangeItems.recent6Month'), value: 'recent6Month'
        }, {text: i18n.t('timeRangeItems.customTimeRange'), value: 'customTimeRange'},], discountTypeItems: [{
            text: i18n.t('discount.form.discountTypeItems.percentage'), value: 0
        }, {
            text: i18n.t('discount.form.discountTypeItems.amountage'), value: 1
        },]
    },
    getters: {
        timeRangeItems: (state) => state.timeRangeItems,
        questions: (state) => state.questions,
        userNationalCode: (state) => state.userNationalCode,
    },

    mutations: {
        SET_QUESTION_ITEMS: (state, payload) => {
            state.questions = payload;
        },
        SET_NATIONAL_CODE: (state, payload) => {
            state.userNationalCode = payload;
        }
    },
    actions: {
        async prepareQuestionItems({state, commit}, payload) {
            const nationalCode = store.getters.userNationalCode;
            if (!nationalCode)
                return;
            return new Promise(async (resolve, reject) => {
                const [err, data] = await Vue.prototype.to(Vue.prototype.http.get(`/enduser/survey/initialize?nationalCode=${nationalCode}`));
                if (!err) {
                    commit('SET_QUESTION_ITEMS', data.items);
                    resolve()
                } else {
                    reject(err);
                }

            })

        }
    },
};

export default baseData;
