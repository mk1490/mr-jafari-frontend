<template>
    <v-dialog
            persistent
            width="500"
            v-model="visible">
        <v-card>
            <v-card-title>
                {{ !data ? $t('questions.modal.defineNewQuestion') : $t('questions.modal.editQuestion') }}
            </v-card-title>
            <v-card-text>
                <v-container>
                    <div class="row">
                        <div class="col-12">
                            <v-text-field
                                    v-model="model.title"
                                    :label="$t('questions.modal.form.title')"
                                    dense
                                    hide-details
                                    outlined/>
                        </div>
                        <div class="col-12">
                            <v-select
                                    v-model="model.likertTemplateId"
                                    :label="$t('questions.modal.form.likertTemplate')"
                                    :items="likertItems"
                                    dense
                                    item-text="title"
                                    item-value="id"
                                    hide-details
                                    outlined/>
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
    name: "DefineOrEditQuestionModal",
    props: {
        visible: Boolean,
        data: Object,
    },
    emits: ['onAddItem', 'onUpdateItem'],
    created() {

        this.likertItems = this.data.likertItems;
        if (!this.data.id) {
            this.model.likertTemplateId = this.likertItems[0].id
        } else {
            this.model.title = this.data.title;
            this.model.likertTemplateId = this.data.likertTemplateId;
        }
    },
    data() {
        return {
            likertItems: [],
            model: {
                title: null,
                likertTemplateId: null,
            }
        }
    },
    methods: {
        async submitAndSendToServer() {
            if (!this.data.id) {
                const [err, data] = await this.to(this.http.post(`/admin/question/`, {
                    title: this.model.title,
                    likertTemplateId: this.model.likertTemplateId,
                }));
                if (!err) {
                    this.$emit('onAddItem', data);
                }
            } else {
                const [err, data] = await this.to(this.http.put(`/admin/question/${this.data.id}`, {
                    title: this.model.title,
                    likertTemplateId: this.model.likertTemplateId,
                }));
                if (!err) {
                    this.$emit('onUpdateItem', data);
                }
            }
        }
    }
}
</script>

<style scoped>

</style>