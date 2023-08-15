<template>
    <v-dialog
            persistent
            scrollable
            width="500"
            v-model="visible">
        <v-card>
            <v-card-title>
                {{
                data === null ? $t('accessPermissions.modal.defineNewAccessPermission') : $t('accessPermissions.modal.editAccessPermission')
                }}
            </v-card-title>
            <v-card-text>
                <v-container>
                    <div class="row">
                        <div class="col-12">
                            <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    :label="$t('accessPermissions.modal.form.title')"
                                    v-model="model.title"
                            >
                            </v-text-field>
                        </div>
                        <div class="col-12">
                            <v-treeview
                                    :open-all="true"
                                    selectable
                                    v-model="model.items"
                                    item-text="title"
                                    item-key="providerKey"
                                    item-children="children"
                                    :items="accessPermissionItems">

                            </v-treeview>
                        </div>
                    </div>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        color="red"
                        text
                        @click="$emit('update:visible', false)">
                    {{ $t('ui.cancel') }}
                </v-btn>
                <v-spacer/>
                <v-btn
                        @click="submitAndSendToServer"
                        color="primary">
                    {{ $t('ui.submit') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DefineOrEditAccessPermissionGroupModal",
    props: {
        visible: Boolean,
        data: Object,
    },
    emits: ['onAddItem', 'onUpdateItem'],
    async created() {
        const [err, data] = await this.to(this.http.get(`/access-permission/permission/list`));
        if (!err) {
            this.accessPermissionItems = data;
            this.model.title = this.data.title;
            this.model.items = this.data.items.map(f => f['providerKey'].toLowerCase());
        }
    },
    data() {
        return {
            accessPermissionItems: [],
            model: {
                title: null,
                items: [],
            }
        }
    },
    methods: {
        async submitAndSendToServer() {
            if (this.data) {
                const [err, data] = await this.to(this.http.put(`/access-permission/${this.data.id}`, this.model));
                if (!err) {
                    this.$emit('onUpdateItem', data);
                    this.updateItemSuccessToast();
                } else {
                    this.updateItemFailedToast();
                }
            } else {
                const [err, data] = await this.to(this.http.post(`/access-permission`, this.model));
                if (!err) {
                    this.$emit('onAddItem', data);
                    this.addItemSuccessToast();
                } else {
                    this.addItemFailedToast();
                }
            }
        }
    }
}
</script>

<style scoped>

</style>