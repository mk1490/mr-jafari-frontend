<template>
    <v-container>
        <v-card>
            <v-card-title>
                گزارش بر اساس سؤالات
            </v-card-title>
            <v-card-text>
                <div class="row">
                    <div class="col-12">
                        <v-data-table
                                :items="table.contents"
                                :headers="table.headers">
                            <template v-slot:item.row="{ item , index}">
                                <div> {{ table.contents.indexOf(item) + 1 }}</div>
                            </template>
                            <template v-slot:item.averageValue="{ item , index}">
                                {{ item.averageValue + (!!item.likertLabelTitle ? ` (${item.likertLabelTitle})` : '') }}
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
                    </div>
                    <!--                    <div class="col-6">-->
                    <!--                        <div dir="ltr">-->
                    <!--                            <div id="sales_chart"></div>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import zc, {zingchart} from 'zingchart/es6.js';
import 'zingchart/modules-es6/zingchart-pareto.min.js';

export default {
    name: "ReportByQuestion",
    data() {
        return {
            table: {
                headers: [
                    {text: '#', value: 'row', align: 'center', sortable: false},
                    {text: 'سؤال', value: 'title', align: 'center', sortable: true},
                    {text: 'میانگین فراوانی', value: 'averageValue', align: 'center', sortable: true},
                    // {text: this.$t('ui.actions'), value: 'actions', align: 'center', sortable: false},
                ],
                contents: [],
            }
        }
    },
    async created() {
        const [err, data] = await this.to(this.http.get(`/admin/report/by-question`));
        if (!err) {
            this.table.contents = data;


            // zc.render({
            //     id: 'sales_chart',
            //     data: {
            //         type: "bar",
            //         title: {text: "فراوانی بیشترین فروش دوره‌ها در 30 روز گذشته"},
            //         series: data.map(f => {
            //             return {
            //                 text: 'f.title',
            //                 values: [37, 51, 0]
            //             }
            //         }),
            //         scaleX: {
            //             labels: data.map(f => f.title)
            //         },
            //     }
            // });
        }
    }

}
</script>

<style scoped>

</style>