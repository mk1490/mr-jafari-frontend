<template>
    <v-container>
        <v-card>
            <v-card-title>
                <div class="col">
                    {{ $t('user.title') }}
                </div>
                <div
                        v-if="checkPermission('users.insert')"
                        class="col-auto">
                    <v-btn
                            @click="defineNewUser"
                            class="white--text"
                            small
                            color="primary">
                        {{ $t('user.defineNewUser') }}
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <v-data-table
                        :headers="table.headers"
                        :items="table.contents">
                    <template v-slot:item.row="{ item , index}">
                        <div> {{ table.contents.indexOf(item) + 1 }}</div>
                    </template>
                    <template v-slot:item.nameAndFamily="{ item , index}">
                        <div> {{ item.name + ' ' + (!!item.family ? item.family : '') }}</div>
                    </template>
                    <template v-slot:item.createDate="{ item , index}">
                        <div> {{ getPersianTime(item.createDate, 'DD MMMM YYYY - HH:mm') }}</div>
                    </template>
                    <template v-slot:item.actions="{ item , index}">
                        <div class="d-inline-flex">
                            <v-tooltip
                                    v-if="checkPermission('users.update')"
                                    color="primary"
                                    bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="itemEdit(item, index)"
                                            class="sqaure-btn mx-1"
                                            color="primary">
                                        <v-icon>
                                            mdi-pen
                                        </v-icon>
                                    </v-btn>
                                </template>
                                {{ $t('ui.edit') }}
                            </v-tooltip>
                            <v-tooltip
                                    v-if="checkPermission('users.change_password')"
                                    color="primary"
                                    bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="passwordChange(item)"
                                            class="sqaure-btn mx-1"
                                            color="primary">
                                        <v-icon>
                                            mdi-key-variant
                                        </v-icon>
                                    </v-btn>
                                </template>
                                {{ $t('user.table.changePassword') }}
                            </v-tooltip>
                            <v-tooltip
                                    v-if="checkPermission('users.delete')"
                                    color="red"
                                    bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="itemDelete(item)"
                                            class="sqaure-btn white--text mx-1"
                                            color="red">
                                        <v-icon>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </template>
                                {{ $t('ui.delete') }}
                            </v-tooltip>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

        <define-or-edit-user-modal
                v-if="modal.visible"
                :visible.sync="modal.visible"
                :data="modal.data"
                @onAddItem="addItem($event)"
                @onUpdateItem="updateItem($event)"
        >

        </define-or-edit-user-modal>
        <change-password
                :visible.sync="modal.changePassword.visible"
                v-if="modal.changePassword.visible"
                :data="modal.changePassword.data"
                v-on:changePassword="passwordChanged"

        >
        </change-password>
    </v-container>
</template>

<script>
import DefineOrEditUserModal from "@/view/components/Admin/Users/DefineOrEditUserModal.vue";
import ChangePassword from "@/view/components/Admin/Users/ChangePassword.vue";

export default {
    name: "UsersManagement",
    components: {ChangePassword, DefineOrEditUserModal},
    async created() {
        const [err, data] = await this.to(this.http.get(`/admin/user/list`));
        if (!err) {
            this.table.contents = data;
        }

        if (
            !this.checkPermission("users.change_password") &&
            !this.checkPermission("users.update") &&
            !this.checkPermission("users.delete")) {
            this.table.headers.splice(this.table.headers.length - 1, 1)
        }
    },
    methods: {
        defineNewUser() {
            this.modal.data = null;
            this.modal.visible = true;
        },
        passwordChange(userItem) {
            this.modal.changePassword.data = userItem;
            this.modal.changePassword.visible = true;
        },
        passwordChanged() {
            this.modal.changePassword.visible = false;
            this.$toast.success(this.$t('user.messages.changePasswordSuccess'))
        },
        addItem(data) {
            this.table.contents.push(data);
            this.modal.visible = false;
        },
        updateItem(data) {
            this.table.contents.splice(this.modal.index, 1, data);
            this.modal.visible = false;
        },
        async itemEdit(item, index) {
            const [err, data] = await this.to(this.http.get(`/admin/user/${item.id}`));
            if (!err) {
                this.modal.index = index;
                this.modal.data = data;
                this.modal.visible = true;
            }

        },
        async itemDelete(item) {
            const modal = await this.deleteModal.show();
            if (!modal)
                return;
            const [err] = await this.to(this.http.delete(`/admin/user/${item.id}`,));
            if (!err) {
                this.table.contents.splice(this.table.contents.indexOf(item), 1);
            }
        }
    },
    data() {
        return {
            modal: {
                visible: false,
                data: null,
                changePassword: {
                    visible: false,
                    data: null,
                }
            },
            table: {
                headers: [
                    {
                        text: '#',
                        value: 'row',
                        align: 'center',
                        sortable: false,
                    },
                    {
                        text: this.$t('user.table.username'),
                        value: 'username',
                        align: 'center',
                        sortable: true,
                    },
                    {
                        text: this.$t('user.table.nameAndFamily'),
                        value: 'nameAndFamily',
                        align: 'center',
                        sortable: true,
                    },
                    {
                        text: this.$t('user.table.roleTitle'),
                        value: 'roleTitle',
                        align: 'center',
                        sortable: true,
                    },
                    {
                        text: this.$t('user.table.createDate'),
                        value: 'createDate',
                        align: 'center',
                        sortable: true,
                    },
                    {
                        text: this.$t('ui.actions'),
                        value: 'actions',
                        align: 'center',
                        sortable: false,
                    }
                ],
                contents: [],
            }
        }
    },
}
</script>

<style scoped>

</style>