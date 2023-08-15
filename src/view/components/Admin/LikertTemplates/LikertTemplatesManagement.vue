<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                <div class="col">
                    {{ $t('likertTemplates.title') }}
                </div>
                <div
                        v-if="checkPermission('likert_templates.insert')"
                        class="col-auto">
                    <v-btn
                            small

                            @click="defineOrEditModal"
                            color="primary">
                        {{ $t('likertTemplates.defineNewTemplate') }}
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
                                    v-if="checkPermission('users.update')"
                                    color="primary"
                                    bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="editItem(item, index)"
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
        <define-or-edit-likert-template-modal
                v-if="modal.visible"
                :visible.sync="modal.visible"
                :data="modal.data"
                @onAddItem="addItem"
        >

        </define-or-edit-likert-template-modal>
    </v-container>

</template>

<script>

import DefineOrEditLikertTemplateModal
    from "@/view/components/Admin/LikertTemplates/DefineOrEditLikertTemplateModal.vue";

export default {
    name: "LikertTemplatesManagement",
    components: {DefineOrEditLikertTemplateModal},
    async created() {
        const [err, data] = await this.to(this.http.get(`/admin/likert-template/list`));
        if (!err) {
            this.table.contents = data;
        }
    },
    data() {
        return {
            modal: {
                visible: false,
                data: false,
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
                        text: this.$t('likertTemplates.table.title'),
                        value: 'title',
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
    methods: {
        defineOrEditModal(item) {
            this.modal.data = item;
            this.modal.visible = true;
        },
        addItem(data) {
            this.modal.visible = false;
            this.table.contents.push(data);
        },
        async editItem(item) {
            const [err, data] = await this.to(this.http.get(`/admin/likert-template/${item.id}`));
            if (!err) {
                this.defineOrEditModal(data);
            }
        }
    }
}
</script>

<style scoped>

</style>