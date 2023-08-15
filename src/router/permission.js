import router from './index'
import Vue from 'vue';
import vuex from '../store/index'

let whiteList = ['/SignIn'];

async function isAuth() {
    return vuex.getters.isLogin;
}

const DEFAULT_TITLE = 'سامانه نظرسنجی آنلاین';
router.beforeEach(async (toRoute, from, next) => {

    document.title = DEFAULT_TITLE;


    const isAuthenticated = await isAuth();
    if (isAuthenticated) {
        next();
    } else {
        next();
    }
    next();
});