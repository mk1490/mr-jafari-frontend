import Vue from 'vue';
import {digitsFaToEn} from "@persian-tools/persian-tools";
import * as persianDate from 'persian-date';
import store from '@/store';

Vue.prototype.getPersianTime = (time, format) => {
    if (!format) {
        format = 'dddd DD MMMM YYYY - HH:mm';
    }
    let date = new Date(time);
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());
    return new persianDate(date).format(format);
}


Vue.prototype.checkPermission = (permissionKey) => {
    const roles = store.getters.roles;
    return roles.includes(permissionKey);
}