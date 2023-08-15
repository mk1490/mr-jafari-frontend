<template>
    <v-dialog
            persistent
            width="500"
            v-model="visible">
        <v-card>
            <v-card-title>
                {{ $t('questions.modal.defineNewQuestion') }}
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
        this.model.title = this.data.title;
    },
    data() {
        return {
            model: {
                title: null,
            }
        }
    },
    methods: {
        async submitAndSendToServer() {
            const [err, data] = await this.to(this.http.post(`/admin/question/`, {
                title: this.model.title
            }));
            if (!err) {
                this.$emit('onAddItem', data);
            }
        }
    }
}
</script>

<style scoped>

</style>