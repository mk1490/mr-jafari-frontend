<template>
    <v-container>
        <v-card color="transparent" flat>
            <v-card-title>
                <h2>
                    {{ $t('trafficReports.title') }}
                </h2>
            </v-card-title>

            <v-card-text>
                <div class="row">
                    <div class="col-12">
                        <v-card>
                            <v-card-text>
                                <div class="row">
                                    <div class="col-4">
                                        <v-select
                                                outlined
                                                hide-details
                                                dense
                                                v-model="model.status"
                                                :items="items.status"
                                                :label="$t('trafficReports.form.status')">
                                        </v-select>
                                    </div>
                                    <div class="col-4">
                                        <v-autocomplete
                                                outlined
                                                hide-details
                                                dense
                                                small-chips
                                                :loading="loading.personnelItem"
                                                v-model="model.personnelItem"
                                                :items="items.personnelItems"
                                                clearable
                                                chips
                                                item-value="id"
                                                item-text="fullName"
                                                no-filter
                                                :search-input.sync="search.personnelItem"
                                                :label="$t('trafficReports.form.nameOrNationalCodeOfPersonnel')">
                                        </v-autocomplete>
                                    </div>
                                    <div class="col-4">
                                        <v-combobox
                                                item-value="id"
                                                item-text="title"
                                                deletable-chips
                                                chips
                                                outlined
                                                clearable
                                                hide-details
                                                small-chips
                                                dense
                                                v-model="model.deviceItem"
                                                :items="items.deviceItems"
                                                :search-input.sync="search.deviceItem"
                                                multiple
                                                :label="$t('trafficReports.form.nameOfDevices')">
                                        </v-combobox>
                                    </div>
                                    <div
                                            class="col-4">
                                        <v-select
                                                hide-details
                                                hide-spin-buttons
                                                outlined
                                                dense
                                                :label="$t('timeRangeItems.title')"
                                                :items="timeRangeItems"
                                                v-model="model.dateType"
                                        ></v-select>
                                    </div>
                                    <div
                                            v-if="model.dateType === 'customTimeRange'"
                                            class="col-4">
                                        <date-picker-input-text-field
                                                outlined
                                                hide-details
                                                v-model="model.dateRange"
                                                :label="$t('trafficReports.form.dateRange')">
                                        </date-picker-input-text-field>
                                    </div>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                        @click="applyFilterAndSearch"
                                        color="primary"
                                >
                                    {{ $t('ui.search') }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                    <div class="col-12">
                        <v-card>
                            <v-card-title>

                            </v-card-title>
                            <v-card-text>
                                <v-data-table
                                        :headers="table.headers"
                                        :items="table.contents">
                                    <template v-slot:item.row="{ item , index}">
                                        {{ table.contents.indexOf(item) + 1 }}
                                    </template>
                                    <template v-slot:item.attachmentImage="{ item , index}">
                                        <v-menu>
                                            <template v-slot:activator="{on, attrs}">
                                                <v-btn
                                                        color="primary"
                                                        :disabled="!item.attachmentImage"
                                                        text
                                                        link
                                                        v-bind="attrs"
                                                        v-on="on">
                                                    (مشاهده)
                                                </v-btn>
                                            </template>
                                            <v-card
                                                    width="500">
                                                <v-card-text class="pa-2">


                                                    <v-hover>
                                                        <template v-slot:default="{ hover }">
                                                            <div class="d-block" v-if="item.attachmentImage">
                                                                <div class="d-flex justify-center">
                                                                    <v-img
                                                                            :src="serverAddress + item.attachmentImage">
                                                                    </v-img>
                                                                    <v-fade-transition>
                                                                        <v-overlay
                                                                                v-if="hover"
                                                                                absolute
                                                                                opacity="0.7">
                                                                            <v-btn
                                                                                    @click="openImageNewTab(serverAddress + item.attachmentImage)"
                                                                                    v-if="hover"
                                                                                    rounded
                                                                                    color="primary">
                                                                                <v-icon>
                                                                                    mdi-open-in-new
                                                                                </v-icon>
                                                                                {{ $t('ui.openInNewPage') }}
                                                                            </v-btn>
                                                                        </v-overlay>

                                                                    </v-fade-transition>
                                                                </div>
                                                            </div>
                                                        </template>
                                                    </v-hover>


                                                </v-card-text>
                                            </v-card>
                                        </v-menu>
                                    </template>
                                    <template v-slot:item.personnelInformation="{ item , index}">
                                        <div
                                                v-if="item.status !== 100"
                                                class="d-inline-flex align-center">
                      <span>
                        {{ item.fullName }}
                      </span>
                                            <v-menu
                                                    open-on-hover
                                                    content-class="elevation-0"
                                            >
                                                <template v-slot:activator="{on, attrs}">
                                                    <v-btn
                                                            :disabled="!item.image"
                                                            text
                                                            color="primary"
                                                            class="mx-2"
                                                            v-bind="attrs"
                                                            v-on="on">
                                                        ({{ $t('trafficReports.table.seeImage') }})
                                                    </v-btn>
                                                </template>
                                                <v-avatar
                                                        :size="300">
                                                    <v-img
                                                            :src="serverAddress + item.image">
                                                    </v-img>
                                                </v-avatar>
                                            </v-menu>

                                        </div>
                                        <div
                                                class="align-center"
                                                v-if="item.status == 100">
                                            -
                                        </div>

                                    </template>
                                    <template v-slot:item.status="{ item , index}">
                                        <v-chip
                                                :color="getChipColor(item)"
                                                class="white--text">
                                            <div v-html="getChipText(item)"></div>
                                        </v-chip>
                                    </template>
                                    <template v-slot:item.reportTime="{ item , index}">
                                        {{ getPersianTime(item['reportTime'], 'DD MMMM YYYY - HH:mm:ss') }}
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import DatePickerInputTextField from "@/view/widget/DatePickerInputTextField.vue";
import {mapGetters} from "vuex";

export default {
    name: "TrafficReport",
    components: {DatePickerInputTextField},
    computed: {
        ...mapGetters(['timeRangeItems'])
    },
    async created() {

        const [err, data] = await this.to(this.http.get(`/report/devices-list`));
        if (!err) {
            this.items.deviceItems = data;
        }

        this.$t('trafficReports.form.statusItems').map((f, i) => {
            this.items.status.push({
                text: f,
                value: i
            })
        });
    },
    data() {
        return {

            loading: {
                personnelItem: false,
                deviceItem: false,
            },
            search: {
                personnelItem: null,
                deviceItem: null,
            },
            items: {
                status: [],
                personnelItems: [],
                deviceItems: [],
            },
            table: {
                headers: [
                    {text: '#', value: 'row', align: 'center', sortable: false},
                    {
                        text: this.$t('trafficReports.table.personnelInformation'),
                        value: 'personnelInformation',
                        align: 'center',
                        sortable: false,
                        filterable: true,
                    },
                    {
                        text: this.$t('trafficReports.table.attachmentImage'),
                        value: 'attachmentImage',
                        align: 'center',
                        sortable: false,
                        filterable: true,
                    },
                    {
                        text: this.$t('trafficReports.table.rfidCode'),
                        value: 'rfidCode',
                        align: 'center',
                        sortable: false,
                        filterable: true,
                    },
                    {
                        text: this.$t('trafficReports.table.deviceTitle'),
                        value: 'deviceTitle',
                        align: 'center',
                        sortable: false
                    },
                    {text: this.$t('trafficReports.table.status'), value: 'status', align: 'center', sortable: false},
                    {
                        text: this.$t('trafficReports.table.time'),
                        value: 'reportTime',
                        align: 'center',
                        sortable: false
                    },
                ],
                contents: [],
            },
            model: {
                status: 0,
                personnelItem: null,
                deviceItem: [],
                dateType: 'recent12Hour',
                dateRange: null,
            }
        }
    },
    methods: {
        async applyFilterAndSearch() {
            const [err, data] = await this.to(this.http.post(`/report/report`, {
                status: this.model.status,
                personnelId: this.model.personnelItem,
                devices: this.model.deviceItem.map(f => f.id),
                dateType: this.model.dateType,
                customDate: this.model.dateRange,
            }));
            if (!err) {
                this.table.contents = data;
                console.log(data)
            }
        },
        getChipColor(item) {
            switch (item.status) {
                case 200:
                    return 'green';
                case 100:
                    return 'red';
                case 101:
                case 102:
                case 103:
                    return 'orange';
            }
        },
        getChipText(item) {
            switch (item.status) {
                case 200:
                    return 'موفق';
                case 100:
                    return 'کارت نامعتبر';
                case 101:
                    return 'پایان تاریخ انقضاء';
                case 102:
                    return 'پایان تعداد استفاده';
                case 103:
                    return 'محدودیت تردد';
                default:
                    return item.status;
            }
        },
        openImageNewTab(url) {
            window.open(url, '_blank')
        }
    },
    watch: {
        'search.personnelItem': {
            async handler(val) {
                this.loading.personnelItem = true;
                const [err, data] = await this.to(this.http.get(`/report/find-personnel?q=${val}`, {
                    loader: false
                }));
                this.loading.personnelItem = false;
                if (!err) {
                    this.items.personnelItems = data;
                }
            }
        },
        'search.deviceItem': {
            async handler(val) {

            }
        }
    }
}
</script>

<style scoped>

</style>