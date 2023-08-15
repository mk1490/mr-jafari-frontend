<template>
    <v-dialog
            persistent
            width="800"
            scrollable
            v-model="visible">

        <v-card>
            <v-card-title>
                مشاهده جزئیات پاسخ‌های کاربر
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-center">
                                    #
                                </th>
                                <th class="text-right">
                                    عنوان سؤال
                                </th>
                                <th class="text-center">
                                    پاسخ
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                    v-for="(item, index) in data"
                                    :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.title }}</td>
                                <td class="text-center">{{ item.value }}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        color="primary"
                        block
                        text
                        @click="$emit('update:visible', false)">
                    {{ $t('ui.submit') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
import {verifyIranianLegalId} from "@persian-tools/persian-tools";

export default {
    name: "ReportByUserModalDetails",
    methods: {verifyIranianLegalId},
    props: {
        visible: Boolean,
        data: Object,
    }
}
</script>

<style scoped>

</style>