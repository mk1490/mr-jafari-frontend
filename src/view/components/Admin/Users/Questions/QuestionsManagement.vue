<template>
    <v-container>
        <v-card>
            <v-card-title>
                <div class="col">
                    {{ $t('questions.title') }}
                </div>
                <div
                        v-if="checkPermission('questions.insert')"
                        class="col-auto">
                    <v-btn
                            small
                            @click="defineOrEdit(null)"
                            color="primary">
                        {{ $t('questions.defineNewQuestion') }}
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
                                            @click="editItem(item, index)"
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
        <define-or-edit-question-modal
                v-if="modal.visible"
                :visible.sync="modal.visible"
                @onAddItem="addItem"
                :data="modal.data"/>
    </v-container>
</template>

<script>
import DefineOrEditQuestionModal from "@/view/components/Admin/Users/Questions/DefineOrEditQuestionModal.vue";

export default {
    name: "QuestionsManagement",
    components: {DefineOrEditQuestionModal},
    async created() {
        const [err, data] = await this.to(this.http.get(`/admin/question/list`));
        if (!err) {
            this.table.contents = data;
        }
    },
    data() {
        return {
            modal: {
                visible: false,
                data: null,
            },
            table: {
                headers: [
                    {text: '#', value: 'row', align: 'center', sortable: false},
                    {text: this.$t('questions.table.title'), value: 'title', align: 'center', sortable: false},
                    {text: this.$t('ui.actions'), value: 'actions', align: 'center', sortable: false},
                ],
                contents: [],
            }
        }
    },
    methods: {
        defineOrEdit(item) {
            this.modal.data = item;
            this.modal.visible = true;
        },
        editItem(item) {
            this.defineOrEdit(item);
        },
        addItem(data) {
            this.table.contents.push(data);
            this.modal.visible = false;
        }
    }
}
</script>

<style scoped>

</style>