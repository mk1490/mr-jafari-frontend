<template>
    <v-app-bar
            app
            class="darken-3 navbar-background"
            dark
            fixed
            flat
            :dense="toolbarDense"
    >
        <v-app-bar-nav-icon @click.stop="toggleNavbar">
            <v-icon>{{ toggleNavbarIcon }}</v-icon>
        </v-app-bar-nav-icon>
        <app-date-time></app-date-time>
        <v-spacer/>
        <app-sound-alarm-play
            v-if="soundPlaying"/>
        <full-screen/>
    </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex';
import Breadcrumbs from '../widget/AppBreadcrumbs.vue';
import ErrorLog from '../widget/AppErrorLog.vue';
import FullScreen from '../widget/AppFullScreen.vue';
import Localization from '../widget/AppLocalization.vue';
import Notification from '../widget/AppNotification.vue';
import AppDateTime from "@/view/widget/AppDateTime";
import AppSoundAlarmPlay from "@/view/widget/AppSoundAlarmPlay.vue";

export default {
    name: 'TheLayoutToolbar',
    components: {
        AppSoundAlarmPlay,
        AppDateTime,
        Breadcrumbs,
        ErrorLog,
        FullScreen,
        Localization,
        Notification,
    },
    data: () => ({}),
    computed: {
        ...mapGetters([
            'toolbarDense',
            'navbarShow',
            'soundPlaying'
        ]),
        toggleNavbarIcon() {
            return this.navbarShow ? 'mdi-format-indent-decrease' : 'mdi-format-indent-increase';
        },
    },
    methods: {
        toggleNavbar() {
            this.$store.dispatch('NavbarToggle');
        },
    },
};
</script>
