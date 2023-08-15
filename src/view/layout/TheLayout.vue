<template>
    <div class="v-application--wrap">
        <the-layout-drawer/>
        <the-layout-toolbar/>
        <the-layout-content/>
        <the-layout-fab/>
        <the-layout-to-top-fab/>
        <audio
                style="visibility: hidden"
                controls
                autoplay
                muted
                id="audio"/>
    </div>
</template>

<script>
import TheLayoutDrawer from './TheLayoutDrawer.vue';
import TheLayoutToolbar from './TheLayoutToolbar.vue';
import TheLayoutContent from './TheLayoutContent.vue';
import TheLayoutFab from './TheLayoutFab.vue';
import TheLayoutToTopFab from './TheLayoutToTopFab.vue';
import TheLayoutFooter from './TheLayoutFooter.vue';
import Vue from "vue";
import {io} from "socket.io-client";

export default {
    async created() {
        Notification.requestPermission().then()
        const socketIO = new io(Vue.prototype.serverAddress, {
            path: "/api/events",
            query: {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
        this.$store.subscribeAction(({type}) => {
            if (type === 'stopSound') {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.$store.commit('SET_SOUND_PLAY_STATE', false)
            }
        })

        socketIO.connect();
        socketIO.on('connection', () => {
        })
        Vue.prototype.socketIO = socketIO;
        socketIO.on('notification', (data) => {
            if (!!data.soundNotification) {
                this.$store.commit('SET_SOUND_PLAY_STATE', true)
                const source = this.serverAddress + data.soundAlarm;
                this.audio = document.getElementById('audio');
                this.audio.src = source;
                this.audio.muted = false;
                this.audio.play().then(() => {
                }).catch((e) => {
                    console.error(e)
                })
                this.audio.onended = () => {
                    this.$store.commit('SET_SOUND_PLAY_STATE', false);
                }
            }
            if (!!data.browserNotification) {
                const notificationData = data.browserNotification;
                Notification.requestPermission().then((result) => {
                    new Notification(notificationData.title, {
                        body: notificationData.content,
                        image: this.baseUrl + notificationData.image,
                        dir: "rtl",
                    })
                });
            }
        });
        await this.$store.dispatch('initSessionId')
        const [err, data] = await this.to(this.http.get(this.serverAddress + `/api/auth/currentProfile`));
        if (!err) {
            this.$store.commit('SET_USER_INFO', data);
        }
        if (!(await this.$store.dispatch('isAuth'))) {

        }


    },
    name: 'TheLayout',
    components: {
        TheLayoutDrawer,
        TheLayoutToolbar,
        TheLayoutContent,
        TheLayoutFab,
        TheLayoutToTopFab,
        TheLayoutFooter,
    },
    data: () => ({
        audio: null,
    }),
};
</script>
