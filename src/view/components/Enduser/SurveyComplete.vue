<template>
    <v-container fluid>
        <div class="d-flex justify-center">
            <v-card width="700">
                <v-card-title>
                    شرکت در نظرسنجی
                </v-card-title>
                <v-card-text>
                    <v-list>


                        <v-list-item v-for="(item, index) in questions">

                            <v-list-item-content>

                                <div class="row">
                                    <div
                                            v-if="index != 0 "
                                            class="col-12">
                                        <v-divider/>
                                    </div>
                                    <div class="col-12 align-self-center">
                                        <div class="d-inline-flex">
                                            <span>{{ (index + 1) + '.' }}</span>
                                            <div class="mx-1"></div>
                                            <span>
                                        {{ item.title }}
                                    </span>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-flex justify-center">
                                            <v-radio-group
                                                    v-model="userSelectedLikerItem[index].value"
                                                    row>
                                                <v-radio v-for="likertItem in likertItems"
                                                         :key="item.id"
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

export default {
    name: "SurveyComplete",
    mounted() {
        this.likertItems.push(this.getKeyValueObject(1, 'بسیار کم'))
        this.likertItems.push(this.getKeyValueObject(2, 'کم'))
        this.likertItems.push(this.getKeyValueObject(3, 'متوسط'))
        this.likertItems.push(this.getKeyValueObject(4, 'زیاد'))
        this.likertItems.push(this.getKeyValueObject(5, 'بسیار زیاد'))
        this.$store.dispatch('prepareQuestionItems')
    },
    data() {
        return {
            likertItems: [],
            userSelectedLikerItem: [],
        }
    },
    computed: {
        ...mapGetters(['questions'])
    },
    methods: {
        getKeyValueObject(value, title) {
            return {title, value}
        },
        sendToServer() {
            // TODO send data items to server...
        }
    },
    watch: {
        'questions': {
            handler() {
                if (this.questions.length < 1)
                    return;
                this.questions.map(f => {
                    this.userSelectedLikerItem.push({
                        id: f.id,
                        value: 3
                    })
                })
            }
        }
    }
}
</script>

<style scoped>
span {
    font-family: Iransans;
    font-size: 24px;
}
</style>