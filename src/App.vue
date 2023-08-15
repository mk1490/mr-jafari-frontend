<template>
    <v-app style="background-color: #F0F0F1">
        <router-view/>
        <delete-dialog
                ref="deleteDialog">
        </delete-dialog>
        <ProgressDialog :showing="loading"></ProgressDialog>
    </v-app>
</template>
<script>
import {mapGetters} from "vuex";
import Vue from 'vue';
import DeleteDialog from "./view/widget/DeleteDialog";
import ProgressDialog from "@/view/widget/ProgressDialog";

export default {
    async created() {
        Vue.prototype.deleteModal = this.$refs.delete;
        this.$store.subscribe(async (mutation) => {
            switch (mutation.type) {
                case 'LOGOUT':
                    await this.logout();
                    break;
            }
        });
    },
    name: 'App',
    components: {ProgressDialog, DeleteDialog},
    async mounted() {
        Vue.prototype.deleteModal = this.$refs.deleteDialog;
    },
    computed: {
        ...mapGetters(['loading', 'isLogin']),
    },
    data: () => ({}),
    watch: {
        'deleteDialog': {
            handler() {
            }
        },
        'isLogin': {
            async handler() {
                await this.checkLogin();
            }
        }
    },
    methods: {
        async logout() {
        },
        async getPermissions() {
            // const [err, data] = await this.to(this.http.get(this.serverAddress + `/app/profile/current-user-permission`));
            // if (!err) {
            //   await this.$store.commit('SET_USER_PERMISSIONS', data)
            // }

        },
        async checkLogin() {
            return // TODO
        }
    },
};
</script>
