<template>
    <v-container>
        <v-card>
            <v-card-title>
                گزارش بر اساس کاربران
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
                                    v-if="checkPermission('reports_by_user')"
                                    color="blue"
                                    bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="seeDetails(item)"
                                            class="sqaure-btn white--text mx-1"
                                            color="primary">
                                        <v-icon>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>
                                </template>
                                {{ $t('ui.details') }}
                            </v-tooltip>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

        <report-by-user-modal-details
                v-if="modal.visible"
                :visible.sync="modal.visible"
                :data="modal.data"/>
    </v-container>
</template>

<script>
import ReportByUserModalDetails from "@/view/components/Report/ReportByUser/ReportByUserModalDetails.vue";

export default {
    name: "ReportByUsers",
    components: {ReportByUserModalDetails},
    async created() {
        const [err, data] = await this.to(this.http.get(`/admin/report/by-users`));
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
                    {text: 'کد ملّی', value: 'nationalCode', align: 'center', sortable: true},
                    {text: this.$t('ui.actions'), value: 'actions', align: 'center', sortable: false},
                ],
                contents: [],
            }
        }
    },
    methods: {
        async seeDetails(item) {
            const [err, data] = await this.to(this.http.get(`/admin/report/by-user/${item.id}`));
            if (!err) {
                this.modal.data = data;
                this.modal.visible = true;
            }
        }
    }
}
</script>

<style scoped>

</style>