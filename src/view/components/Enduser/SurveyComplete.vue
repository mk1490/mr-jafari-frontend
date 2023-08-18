<template>
    <v-container fluid>
        <div class="d-flex justify-center">
            <v-card width="700">
                <v-card-title>
                    <div class="col">
                        شرکت در نظرسنجی
                    </div>
                    <div class="col-auto">
                        <v-btn
                                to="/"
                                text
                                color="primary">
                            بازگشت به خانه
                        </v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-list>


                        <v-list-item
                                v-if="itemsVisible"
                                v-for="(item, index) in questions">

                            <v-list-item-content>

                                <div class="row">
                                    <div
                                            v-if="index != 0 "
                                            class="col-12">
                                        <v-divider/>
                                    </div>
                                    <div class="col-12 align-self-center">
                                        <div class="d-inline-flex answer-title">
                                            <span>{{ (index + 1) + '.' }}</span>
                                            <div class="mx-1"></div>
                                            <div>
                                                <p>{{ item.title }}</p>
                                                <strong
                                                        v-if="item.answerState == 1"
                                                        class="green--text">(پاسخ داده شده)</strong>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-flex justify-center">
                                            <v-radio-group
                                                    :readonly="item.answerState == 1"
                                                    :disabled="item.answerState == 1"
                                                    v-model="userSelectedLikerItem[index].value"
                                                    row>
                                                <v-radio
                                                        v-for="likertItem in item.likertItems"
                                                        :key="`${item.id}_${likertItem.value}`"
                                                        :value="likertItem.value"
                                                        :label="likertItem.title"
                                                />
                                            </v-radio-group>
                                        </div>
                                    </div>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                            @click="sendToServer"
                            color="primary">
                        ذخیره و ارسال
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import mainMixin from "@/view/components/Enduser/mainMixin";

export default {
    name: "SurveyComplete",
    mixins: [mainMixin],
    async mounted() {
        await this.checkHasNationalCode(false);
        await this.$store.dispatch('prepareQuestionItems')
        this.questions.map(f => {
            this.userSelectedLikerItem.push({
                id: f.id,
                value: 3,
                answerState: f.answerState
            })
        });
        this.itemsVisible = true;
    },
    data() {
        return {
            likertItems: [],
            userSelectedLikerItem: [],
            itemsVisible: false,
        }
    },
    computed: {
        ...mapGetters(['questions'])
    },
    methods: {
        getKeyValueObject(value, title) {
            return {title, value}
        },
        async sendToServer() {
            console.log(this.userSelectedLikerItem)

            const [err, data] = await this.to(this.http.post(`/enduser/survey`, {
                nationalCode: this.$store.getters.userNationalCode,
                participantItems: this.userSelectedLikerItem.filter(x => x.answerState == 0).map(f => {
                    return {
                        questionId: f.id,
                        value: f.value
                    }
                })
            }));
            if (!err) {
                this.$swal.fire({
                    icon: 'success',
                    text: 'کاربر گرامی! ضمن تشکر از شما؛ نظرسنجی شما با موفقیت ثبت گردید!'
                }).then(() => {
                    this.$router.push({
                        name: 'Main'
                    })
                })
            }
        }
    },
    watch: {
        'questions': {
            handler() {
                if (this.questions.length < 1)
                    return;

            }
        }
    }
}
</script>

<style scoped>
.answer-title {
    font-family: Iransans;
    font-size: 24px;
}

.answer-title strong {
    font-size: 20px;
}
</style>