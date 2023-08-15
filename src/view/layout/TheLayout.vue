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

export default {
    async created() {
        Notification.requestPermission().then()
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
