<template>
    <v-container>
        <div class="row">

            <div class="col-12">
                <v-card flat color="transparent">
                    <v-card-title>
                        <h2>
                            {{ $t('usersActivityReport.title') }}
                        </h2>
                    </v-card-title>
                </v-card>
            </div>
            <div class="col-12">
                <v-expansion-panels flat>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            جستجو و فیلتر
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-card flat>
                                <v-card-text>
                                    <div class="row">
                                        <div class="col-4">
                                            <v-autocomplete
                                                    v-model="filter.user"
                                                    :items="items.user"
                                                    :loading="loading.user"
                                                    item-value="id"
                                                    item-text="fullName"
                                                    clearable
                                                    no-filter
                                                    label="نام خانوادگی / نام کاربر سیستم"
                                                    outlined
                                                    hide-details
                                                    multiple
                                                    chips
                                                    deletable-chips
                                                    small-chips
                                                    dense
                                                    :search-input.sync="search.user">

                                            </v-autocomplete>
                                        </div>
                                        <div class="col-4">
                                            <v-autocomplete
                                                    v-model="filter.methods"
                                                    :items="items.methods"
                                                    label="نام متد"
                                                    outlined
                                                    hide-details
                                                    multiple
                                                    chips
                                                    small-chips
                                                    clearable
                                                    deletable-chips
                                                    dense>

                                            </v-autocomplete>
                                        </div>
                                        <div class="col-4">
                                            <v-autocomplete
                                                    v-model="filter.controllerName"
                                                    :items="items.controllerName"
                                                    label="نام کنترلر"
                                                    clearable
                                                    outlined
                                                    hide-details
                                                    multiple
                                                    chips
                                                    small-chips
                                                    deletable-chips
                                                    dense>
                                            </v-autocomplete>
                                        </div>
                                        <div class="col-4">
                                            <v-select

                                                    hide-details
                                                    hide-spin-buttons
                                                    outlined
                                                    dense
                                                    :label="$t('timeRangeItems.title')"
                                                    :items="timeRangeItems"
                                                    v-model="filter.dateType"
                                            ></v-select>
                                        </div>
                                        <div
                                                class="col-4"
                                                v-if="filter.dateType === 'customTimeRange'">
                                            <date-picker-input-text-field
                                                    outlined
                                                    hide-details
                                                    v-model="filter.dateRange"
                                                    :label="$t('trafficReports.form.dateRange')">
                                            </date-picker-input-text-field>
                                        </div>
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer/>
                                    <v-btn
                                            class="white--text"
                                            @click="clearFilter"
                                            color="red">
                                        {{ $t('ui.clearFilter') }}
                                    </v-btn>
                                    <v-btn
                                            @click="fetchData"
                                            color="primary">
                                        {{ $t('ui.search') }}
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>

            <div class="col-12">
                <v-card flat>
                    <v-card-text>
                        <v-data-table
                                :server-items-length="table.totalItems"
                                :items-per-page.sync="table.itemsPerPage"
                                :items="table.contents"
                                :headers="table.headers"
                                @pagination="setQueryPage">
                            <template v-slot:item.row="{ item , index}">
                                <div> {{
                                    table.contents.indexOf(item) + (table.paginationObject.page > 1 ? table.paginationObject.pageStart + 1 : 1)
                                    }}
                                </div>
                            </template>
                            <template v-slot:item.method="{ item , index}">
                                <v-chip
                                        small
                                        color="primary">
                                    {{ item.method }}
                                </v-chip>
                            </template>
                            <template v-slot:item.username="{ item , index}">
                                <div> {{ item.name + ' ' + item.family }}</div>
                            </template>
                            <template v-slot:item.createDate="{ item , index}">
                                {{ getPersianTime(item['createDate'], 'DD MMMM YYYY - HH:mm:ss') }}
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </v-container>
</template>

<script>
import DatePickerInputTextField from "@/view/widget/DatePickerInputTextField.vue";
import {mapGetters} from "vuex";

export default {
    name: "LogsReport",
    components: {DatePickerInputTextField},
    computed: {
        ...mapGetters(['timeRangeItems'])
    },
    async created() {
        const [err, data] = await this.to(this.http.get(`/log/initialize`));
        if (!err) {
            this.items.controllerName = data.controllerNames;
            this.items.methods = data.methods;
        }
        await this.fetch;
    },
    data() {
        return {
            filter: {
                user: [],
                methods: [],
                controllerName: [],
                dateType: 'recent12Hour',
                dateRange: null,
            },
            loading: {
                user: false,
            },
            items: {
                user: [],
                methods: [],
                controllerName: [],
            },
            search: {
                user: null,
            },
            table: {
                itemsPerPage: 15,
                pageStart: 0,
                totalItems: 0,
                paginationObject: {},
                headers: [
                    {text: '#', value: 'row', align: 'center', sortable: false},
                    {text: 'نام کاربر', value: 'username', align: 'center', sortable: true},
                    {text: 'متد', value: 'method', align: 'center', sortable: true},
                    {text: 'کنترلر', value: 'controller', align: 'center', sortable: true},
                    {text: 'اکشن', value: 'action', align: 'center', sortable: true},
                    {text: 'آدرس IP کلاینت', value: 'ipAddress', align: 'center', sortable: true},
                    {text: 'زمان', value: 'createDate', align: 'center', sortable: true},
                ],
                contents: [],
            }
        }
    },
    methods: {
        async setQueryPage(paginationObject) {
            this.table.pageStart = paginationObject.pageStart;
            this.table.paginationObject = paginationObject;
            await this.fetchData();
        },
        clearFilter() {
            this.filter.user = [];
            this.filter.methods = [];
            this.filter.controllerName = [];
            this.filter.dateType = 'recent12Hour'
            this.filter.dateRange = null;
        },
        async fetchData() {
            const [err, data] = await this.to(this.http.post(`/log/list?perPage=${this.table.itemsPerPage}&offset=${this.table.pageStart}`, {
                users: this.filter.user,
                methods: this.filter.methods,
                controllers: this.filter.controllerName,
                dateType: this.filter.dateType,
                dateRange: this.filter.dateRange,
            }));
            if (!err) {
                this.table.totalItems = data.total;
                this.table.contents = data.items;
            }
        }
    },
    watch: {
        'search.user': {
            async handler(val) {
                if (!val || val.toString().length < 2)
                    return;
                this.loading = true;
                const [err, data] = await this.to(this.http.get(`/log/find-user?q=${val}`, {loader: false}));
                this.loading = false;
                if (!err) {
                    this.items.user = data;
                }
            }
        }
    }
}
</script>

<style scoped>

</style>