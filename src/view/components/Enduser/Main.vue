<template>
    <v-container>
        <v-sheet>
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-center">
                        <div class="d-inline-block">
                            <div class="d-block">
                                <h2>سامانه نظرسنجی بیمارستانی</h2>
                            </div>
                            <div class="d-block text-center">
                                <div
                                        v-if="!!userNationalCode"
                                        class="national-code d-inline-flex justify-center">
                                    <strong>کد ملّی:</strong>
                                    <div class="mx-1"/>
                                    <span>{{ userNationalCode }}</span>
                                </div>
                                <div class="d-block">
                                    <v-btn
                                            small
                                            color="primary"
                                            @click="openNationalCodeSelector(false)">
                                        {{ !!userNationalCode ? 'تغییر کد ملّی' : 'ثبت کد ملّی' }}
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex justify-center">
                        <icon-button
                                @click="prepareQuestionItems()"
                                icon="mdi-help">
                            شرکت در نظرسنجی
                        </icon-button>
                    </div>
                </div>
            </div>
        </v-sheet>
    </v-container>
</template>

<script>
import IconButton from "@/view/components/Enduser/Widgets/IconButton.vue";
import {mapActions, mapGetters} from "vuex";
import mainMixin from "@/view/components/Enduser/mainMixin";

export default {
    name: "Main",
    mixins: [mainMixin],
    computed: {
        ...mapGetters(['userNationalCode'])
    },
    components: {IconButton},
    methods: {
        async prepareQuestionItems() {
            const [err, result] = await this.to(this.checkHasNationalCode())
            if (!err) {
                this.$store.dispatch('prepareQuestionItems').then(async () => {
                    await this.$router.push({
                        name: 'SurveyComplete'
                    })
                }).catch(e => {
                });

            }

        }
    }
}
</script>

<style scoped>
.national-code {
    font-family: Iransans;
    align-items: center;
}

.national-code span {
    font-size: 20px;
}
</style>