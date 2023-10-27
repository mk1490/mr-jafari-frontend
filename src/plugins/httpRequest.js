import Vue from 'vue';
import axios from "axios";
import i18n from '@/locale'; // Internationalization
import store from '@/store'; // Vuex

import Router from "@/router";

const serverAddress = process.env.VUE_APP_SERVER_ADDRESS;
Vue.prototype.serverAddress = serverAddress;
let lastRequest;

function preparseAuthorization(req) {
    req.headers.Authorization = 'Bearer ' + sessionStorage.getItem('Authorization');
    req.headers.sessionId = store.getters.sessionId;
}

Vue.prototype.baseUrl = serverAddress + '/api/';
axios.defaults.baseURL = Vue.prototype.baseUrl;
axios.interceptors.request.use(async (req) => {
    if (req.loader !== false) {
        Vue.prototype.showLoader();
    }
    lastRequest = req;
    preparseAuthorization(req);
    return req;
});
axios.interceptors.response.use(async (response) => {
    Vue.prototype.hideLoader();
    if (lastRequest.method.toString() === 'delete') {
        if (lastRequest.toast != false) {
            Vue.prototype.$toast.success(i18n.t('ui.deleteItemSuccess'));
        }
    }
    return response.data;
}, async error => {
    Vue.prototype.hideLoader();
    if (!error.response) {
        Vue.swal.fire({
            title: i18n.t('ui.error'),
            html: 'دسترسی به شبکه وجود ندارد!',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'تلاش مجدد',

        }).then(res => {
            preparseAuthorization(error.config)
            axios.request(error.config)
        });
        return;
    }

    if (lastRequest.method.toString() === 'delete') {
        if (lastRequest.errorToastMessage != false) {
            Vue.prototype.$toast.error(i18n.t('ui.deleteItemFailed'));
        }
    }
    const errorObject = error.response.data;
    const statusCode = error.response.status;
    let message = '';
    switch (statusCode) {
        case 400: {
            errorObject.message.map(f => {
                message += f + '<br/>';
            })
            break;
        }
        case 401: {
            sessionStorage.removeItem('Authorization');
            if (Router.currentRoute.fullPath !== '/Login') {
                await Router.push('/Login');
            }
            message = errorObject.message;
            if (['SESSION_IS_EXPIRED', 'Unauthorized', 'MULTI_SESSION_NOT_ACCEPT'].includes(errorObject.error)) {
                lastRequest.errorModal = false;
                if (errorObject.error == 'MULTI_SESSION_NOT_ACCEPT') {
                    const submit = await Vue.swal.fire({
                        icon: 'error',
                        text: message,
                        confirmButtonText: 'تأیید پایان دادن نشست‌های دیگر',
                        cancelButtonText: 'لغو',
                        showCancelButton: true,
                    });
                    if (submit.isConfirmed) {
                        sessionStorage.setItem('Authorization', errorObject['metaData']['accessToken']);
                        Vue.prototype.http.put(serverAddress + '/api/auth/logout')
                    }
                }

            }
            break;
        }
        case 404: {
            lastRequest.errorModal = false;

            break;
        }
        case 500: {
            message = i18n.t('errors.serverError');
            break;
        }
        default: {
            if (Array.isArray(errorObject.message)) {
                errorObject.message.map((f) => {
                    message += f + `<br>`;
                });
            } else {
                message = errorObject.message;
            }
            if (lastRequest.errorModal !== undefined && lastRequest.errorModal !== false) {
                Vue.swal.fire({
                    title: i18n.t('ui.error'), html: message, icon: 'error'
                });
            }
            break;
        }
    }
    if (lastRequest.errorModal != false) {
        Vue.swal.fire({
            title: i18n.t('ui.error'), html: message, icon: 'error'
        });
    }

    return Promise.reject(error);
});
Vue.prototype.http = axios;
