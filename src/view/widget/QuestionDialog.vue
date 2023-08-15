<template>
    <v-dialog
            v-model="showState"
            :retain-focus="false"
            max-width="290"
    >
        <v-card>
            <v-card-title class="headline">
                {{title}}
            </v-card-title>
            <v-card-text>
                {{description}}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="showState = false"
                >
                    لغو
                </v-btn>

                <v-btn
                        @click="submit"
                        color="blue darken-1"
                        text>
                    تأیید
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "QuestionDialog",
        props: {
            showState: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: 'حذف',
            },
            description: {
                type: String,
                default: 'شرح',
            }
        },
        methods: {
            submit() {
                this.$emit("submit-click", true);
            }
        }
    }
</script>

<style scoped>

</style>