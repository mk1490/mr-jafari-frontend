import Vue from 'vue';
import {addCommas, digitsEnToFa, digitsFaToEn, removeCommas} from "@persian-tools/persian-tools";
import * as persianDate from 'persian-date';
import i18n from "@/locale";
import store from '@/store';


Vue.prototype.getComma = (number) => {
    return addCommas(number);
}
Vue.prototype.removeComma = (number) => {
    return removeCommas(number);
}
Vue.prototype.enToFa = (number) => {
    return digitsEnToFa(number);
}
Vue.prototype.faToEn = (number) => {
    return digitsFaToEn(number);
}
Vue.prototype.isNumber = (event) => {
    return isNumber(event);
}
Vue.prototype.showUpdateSuccessToast = () => {
    Vue.prototype.$toast.success(Vue.prototype.$t('ui.updateItemSuccess'))
}
Vue.prototype.setMaxLength = (event) => {
    if (isNaN(Number.parseInt(event.key))) {
        return;
    }
    if (event.target.value.replaceAll(',', '').length >= event.target.getAttribute('length')) event.preventDefault();
}
Vue.prototype.convertAmountToPlainAmountValue = (irrAmountValue) => {
    return Number.parseFloat(irrAmountValue.toString().replaceAll(',', ''));
}

Vue.prototype.convertAmount = (event, vm, modelName) => {
    let stringValue = event;
    if (typeof stringValue === 'string') {
        stringValue = stringValue.replaceAll(',', '');
    } else {
        stringValue = stringValue.toString();
    }
    if (!isNumber(stringValue)) {
        if (modelName) {
            vm.model[modelName] = ''
        } else {
            return '';
        }
    }
    let total = addCommas(removeCommas(stringValue))
    if (modelName) {
        vm.model[modelName] = total;
    } else {
        return total;
    }
}


Vue.prototype.base64toBlob = (base64Data, contentType) => {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {type: contentType});
}

Vue.prototype.getPersianTime = (time, format) => {
    if (!format) {
        format = 'dddd DD MMMM YYYY - HH:mm';
    }
    let date = new Date(time);
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());
    return new persianDate(date).format(format);
}
Vue.prototype.removeComma = (amount) => {
    return amount.toString().replaceAll(',', '');
}
Vue.prototype.getSlugCharacters = (originalCharacter) => {
    if (originalCharacter === '')
        return '';
    return originalCharacter.toString().replaceAll(' ', '-');
}
Vue.prototype.test = () => {
    console.log("TEST")
}

Vue.prototype.randomColor = () => {
    return '#' + Math.random().toString(16).substr(-6);
}
Vue.prototype.regexPatterns = {
    username: /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/,
}

Vue.prototype.convertAmount = (event, vm, modelName) => {
    let stringValue = event;
    if (typeof stringValue === 'string') {
        stringValue = stringValue.replaceAll(',', '');
    } else {
        stringValue = stringValue.toString();
    }
    if (!isNumber(stringValue)) {
        if (modelName) {
            vm.model[modelName] = ''
        } else {
            return '';
        }
    }
    let total = addCommas(removeCommas(stringValue))
    if (modelName) {
        vm.model[modelName] = total;
    } else {
        return total;
    }
}

Vue.prototype.checkPermission = (permissionKey) => {
    const roles = store.getters.roles;
    return roles.includes(permissionKey);
}

const commonMethods = {
    install(Vue, options) {
        Vue.prototype.getTextOrUntitled = (text) => {
            return (text === null || text === '') ? "«" + i18n.t('ui.untitled') + "»" : text;
        }
    }
}
Vue.directive('my-irec')
Vue.use(commonMethods)

let isNumber = (event) => {
    event = digitsFaToEn(event)
    const _isNumber = /^\d+$/.test(event);
    return _isNumber;
}