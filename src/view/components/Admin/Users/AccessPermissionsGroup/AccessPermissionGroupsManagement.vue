<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                <div class="col">
                    {{ $t('accessPermissions.title') }}
                </div>
                <div
                        v-if="checkPermission('access_permissions.insert')"
                        class="col-auto">
                    <v-btn
                            small
                            @click="defineOrEditModal"
                            color="primary">
                        {{ $t('accessPermissions.defineNewAccessPermission') }}
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <v-data-table
                        :items="table.contents"
                        :headers="table.headers">
                    <template v-slot:item.row="{ item , index}">
                        <div> {{ table.contents.indexOf(item) + 1 }}</div>
                    </template>


                    <template v-slot:item.actions="{ item , index}">
                        <div class="d-inline-flex">
                            <v-tooltip
                                    v-if="checkPermission('access_permissions.update')"
                                    color="primary"
                                    bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="itemEdit(item, index)"
                                            class="sqaure-btn"
                                            color="primary">
                                        <v-icon>
                                            mdi-pen
                                        </v-icon>
                                    </v-btn>
                                </template>
                                {{ $t('ui.edit') }}
                            </v-tooltip>
                            <v-tooltip
                                    v-if="checkPermission('access_permissions.delete')"
                                    color="red"
                                    bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="itemDelete(item)"
                                            class="sqaure-btn white--text mx-2"
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
        <define-or-edit-access-permission-group-modal
                v-if="modal.visible"
                :visible.sync="modal.visible"
                :data="modal.data"
                @onAddItem="addItem"
                @onUpdateItem="updateItem"
        ></define-or-edit-access-permission-group-modal>
    </v-container>
</template>

<script>
import DefineOrEditAccessPermissionGroupModal
    from "@/view/components/Admin/Users/AccessPermissionsGroup/DefineOrEditAccessPermissionGroupModal.vue";

export default {
    name: "AccessPermissionGroupsManagement",
    components: {DefineOrEditAccessPermissionGroupModal},
    async created() {
        const [err, data] = await this.to(this.http.get(`/admin/access-permission/list`));
        if (!err) {
            this.table.contents = data;
        }

        if (
            !this.checkPermission("access_permissions.update") &&
            !this.checkPermission("access_permissions.delete")) {
            this.table.headers.splice(this.table.headers.length - 1, 1)
        }

    },
    data() {
        return {
            modal: {
                visible: false,
                data: null,
                index: 0,
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
                        text: this.$t('accessPermissions.table.title'),
                        value: 'title',
                        align: 'center',
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
    methods: {
        defineOrEditModal() {
            this.modal.visible = true;
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
            const [err, data] = await this.to(this.http.get(`/admin/access-permission/${item.id}`));
            if (!err) {
                this.modal.data = data;
                this.modal.visible = true;
                this.modal.index = index;
            }

        },
        async itemDelete(item) {
            const modal = await this.deleteModal.show();
            if (!modal)
                return;
            const [err] = await this.to(this.http.delete(`/admin/access-permission/${item.id}`));
            if (!err) {
                this.table.contents.splice(this.table.contents.indexOf(item), 1);
            }
        }
    }
}
</script>

<style scoped>

</style>