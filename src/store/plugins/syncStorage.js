import config from '@/config';
import user from '@/store/modules/user';
import settings from '@/store/modules/settings';

class SyncStorage {
    constructor(option) {
        this.storage = (window && window[option.storage]) || (window && window[config.storage]);
        this.prefix = option.prefix || config.prefix;
        this.ttl = option.ttl || config.ttl;
        this.user = 'user';
        this.settings = 'settings';
        this.userMutations = this.getModuleOptions(user, 'mutations');
        this.settingsMutations = this.getModuleOptions(settings, 'mutations');
    }

    subscribe = async (store) => {
        if (!this.checkStorage()) {
            throw new Error('[vuex.SyncStorage] Invalid "Storage" instance given');
        }

        if (this.checkVersion(config.version)) {
            console.log(`[vuex.SyncStorage] Current version of the application "${config.version}"`);
        } else {
            console.warn(`[vuex.SyncStorage] Application version updated to "${config.version}"`);
        }

        // init and apply user state from storage

        // init and apply settings state from storage
        if (this.initSettingsState(store)) {
            console.log('[vuex.SyncStorage] initSettingsState');
        } else {
            console.warn('[vuex.SyncStorage] No user settings in "Storage"');
        }

        store.subscribe((mutation, state) => {
            // console.log('storage subscribe', mutation.type);
            if (this.userMutations.includes(mutation.type)) {
                // console.log('storage subscribe user_mutations', mutation, state);
                this.setToStorage(`${this.prefix}${this.user}`, JSON.stringify(state.user));
                if (mutation.type === 'SET_TOKEN') {
                    this.setToStorage(`${this.prefix}ttl`, this.getSeconds(this.ttl));
                }
            }
            if (this.settingsMutations.includes(mutation.type)) {
                // console.log('storage subscribe settings_mutations', mutation, state);
                this.setToStorage(`${this.prefix}${this.settings}`, JSON.stringify(state.settings));
            }
        });
    };


    getSeconds = (ttl) => Math.floor(Date.now() / 1000) + (ttl || 0);
    getModuleOptions = (module, key) => {
        if (!module || !module[key]) return [];
        return Object.keys(module[key]);
    };
    checkStorage() {
        try {
            this.storage.setItem(`${this.prefix}@@`, 1);
            this.storage.removeItem(`${this.prefix}@@`);
        } catch (err) {
            console.error(`[vuex.SyncStorage] Check storage failed: ${err}`);
            return false;
        }
        return true;
    }
    checkVersion(version) {
        try {
            if (this.getFromStorage(`${this.prefix}version`) === version) {
                return true;
            }

            this.storage.clear();
            this.setToStorage(`${this.prefix}version`, version);
        } catch (err) {
            console.error(`[vuex.SyncStorage] Check version failed: ${err}`);
        }
        return false;
    }
    initSettingsState(store) {
        const settingsState = this.getFromStorage(`${this.prefix}${this.settings}`);
        if (settingsState) {
            store.commit('SET_SETTINGS', JSON.parse(settingsState));
            return true;
        }
        return false;
    }

    setToStorage(key, value) {
        try {
            this.storage.setItem(key, value);
        } catch (err) {
            console.error(`[vuex.SyncStorage] setItem storage failed: ${err}`);
            return false;
        }
        return true;
    }


    getFromStorage(key) {
        try {
            return this.storage.getItem(key);
        } catch (err) {
            console.error(`[vuex.SyncStorage] getItem storage failed: ${err}`);
        }
        return '';
    }
}

export default function (syncStorageOption) {
    const syncStorage = new SyncStorage(syncStorageOption);
    return syncStorage.subscribe;
}
