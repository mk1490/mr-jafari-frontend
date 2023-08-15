<template>
    <v-container>
        <v-sheet>
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-center">
                        <h2>سامانه نظرسنجی بیمارستانی</h2>
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
import {mapActions} from "vuex";

export default {
    name: "Main",
    components: {IconButton},
    methods: {
        ...mapActions(['prepareQuestionItems'])
    }
}
</script>

<style scoped>

</style>