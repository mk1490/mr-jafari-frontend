<template>
    <v-dialog
            persistent
            width="500"
            scrollable
            v-model="visible">
        <v-card>
            <v-card-title>
                {{ !data ? 'تعریف قالب جدید' : 'ویرایش قالب' }}
            </v-card-title>
            <v-card-text>
                <v-container>
                    <div class="row">
                        <div class="col-12">
                            <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    :label="$t('likertTemplates.modal.form.title')"
                                    v-model="model.title">
                            </v-text-field>
                        </div>
                        <div class="col-12">
                            <v-divider/>
                        </div>
                        <div
                                v-for="(item, index) in model.items"
                                class="col-12">
                            <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    :label="'#'+ (index+1) "
                                    v-model="model.items[index].label">
                            </v-text-field>
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
    name: "DefineOrEditLikertTemplateModal",
    emits: ['onAddItem'],
    props: {
        visible: Boolean,
        data: Object,
    },
    created() {

        if (!!this.data) {
            this.model.title = this.data.title;
            this.model.items = this.data.items;
        } else {
            for (let i = 0; i < 5; i++) {
                this.model.items.push({
                    label: '',
                })
            }
        }
    },
    data() {
        return {
            model: {
                title: null,
                items: [],
            }
        }
    },
    methods: {
        async submitAndSendToServer() {
            if (!this.data) {
                const [err, data] = await this.to(this.http.post(`/admin/likert-template`, this.model));
                if (!err) {
                    this.$emit('onAddItem', data);
                }
            }
        }
    }
}
</script>

<style scoped>

</style>