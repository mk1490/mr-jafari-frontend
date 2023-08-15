<template>
  <v-container>
    <v-card flat color="transparent">
      <v-card-title>
        <h2>
          {{ $t('liveTraffic.title') }}
        </h2>
      </v-card-title>

      <v-card-text>
        <div class="row mt-3">
          <div class="col">
            <v-card
                width="100%">
              <v-card-text>
                <div class="row">
                  <div class="col">
                    <h1>
                      {{ successTrafficsCount }}
                    </h1>
                    <h3>
                      {{ $t('liveTraffic.reports.successTraffics') }}
                    </h3>
                  </div>
                  <div class="col-auto">
                    <v-icon
                        size="50"
                        color="green">
                      mdi-check-circle
                    </v-icon>
                  </div>
                </div>
              </v-card-text>

            </v-card>
          </div>
          <div class="col">
            <v-card
                width="100%">
              <v-card-text>
                <div class="row align-center">
                  <div class="col">
                    <h1>
                      {{ unSuccessTrafficCount }}
                    </h1>
                    <h3>
                      {{ $t('liveTraffic.reports.unSuccessTraffics') }}
                    </h3>
                  </div>
                  <div class="col-auto">
                    <v-icon
                        color="orange"
                        size="50">
                      mdi-alert-circle
                    </v-icon>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div class="col">
            <v-card
                width="100%">
              <v-card-text>
                <div class="row align-center">
                  <div class="col">
                    <h1>
                      {{ invalidCartCount }}
                    </h1>
                    <h3>
                      {{ $t('liveTraffic.reports.invalidCarts') }}
                    </h3>
                  </div>
                  <div class="col-auto">
                    <v-icon
                        size="50"
                        color="red">
                      mdi-close-circle
                    </v-icon>
                  </div>
                </div>
              </v-card-text>

            </v-card>
          </div>

        </div>
        <div class="row mt-5">
          <div class="col-8">
            <v-card>
              <v-card-text>
                <v-data-table
                    :items-per-page="15"
                    :sort-by="['reportTime']"
                    :sort-desc="true"
                    hide-default-footer
                    :item-class="tableItemClass"
                    :headers="table.overView.headers"
                    :items="table.overView.contents"
                >
                  <template v-slot:item.row="{ item , index}">
                    {{ table.overView.contents.indexOf(item) + 1 }}
                  </template>
                  <template v-slot:item.details="{ item , index}">

                    <div class="d-block">
                      <div class="d-inline-flex align-center">
                        <v-avatar
                            v-if="item.image"
                            size="30">
                          <v-img
                              :src="serverAddress + item.image">

                          </v-img>
                        </v-avatar>
                        <div class="mx-2">
                          {{ item.status !== 100 ? item.fullName : '' }}
                        </div>

                        <div class="d-inline-block my-3">
                          <div class="d-block">
                            <v-menu left>
                              <template v-slot:activator="{on, attrs}">
                                <v-btn
                                    color="primary"
                                    text
                                    small
                                    v-bind="attrs"
                                    v-on="on">
                                  (مشاهده جزئیات)
                                </v-btn>
                              </template>

                              <v-card
                                  :width="!item.attachmentImage ? 500: 800">
                                <v-card-text class="pa-2">
                                  <div class="row justify-center">
                                    <div
                                        v-if="item.attachmentImage"
                                        :class="`${item.attachmentImage ? 'col-6' : 'col-12'} align-self-center`">
                                      <div class="d-block">
                                        <v-hover>
                                          <template
                                              v-slot:default="{ hover }">
                                            <div class="d-flex justify-center">
                                              <v-img
                                                  :src="serverAddress + item.attachmentImage">
                                              </v-img>

                                              <v-fade-transition>
                                                <v-overlay
                                                    v-if="hover"
                                                    absolute
                                                    opacity="0.7">
                                                  <div class="d-inline-flex">
                                                    <v-btn
                                                        @click="openImageNewTab(serverAddress + item.attachmentImage)"
                                                        v-if="hover"
                                                        rounded
                                                        color="primary">
                                                      <v-icon>
                                                        mdi-open-in-new
                                                      </v-icon>
                                                      {{
                                                        $t('ui.openInNewPage')
                                                      }}
                                                    </v-btn>
                                                    <v-btn
                                                        class="mx-2"
                                                        @click="copyTagIdToClipboard(item)"
                                                        v-if="hover"
                                                        rounded
                                                        color="primary">
                                                      <v-icon>
                                                        mdi-content-copy
                                                      </v-icon>
                                                      {{
                                                        $t('liveTraffic.table.overview.copyRfidTagToClipboard')
                                                      }}
                                                    </v-btn>
                                                  </div>

                                                </v-overlay>
                                              </v-fade-transition>
                                            </div>
                                          </template>
                                        </v-hover>
                                      </div>
                                    </div>
                                    <div class="col align-self-center">
                                      <div
                                          v-if="item.status != 100 && item.image"
                                          class="d-block">
                                        <div class="d-flex justify-center">
                                          <v-avatar
                                              size="150">
                                            <v-img
                                                :src="serverAddress + item.image">
                                            </v-img>
                                          </v-avatar>
                                        </div>

                                      </div>

                                      <div class="d-block">
                                        <v-simple-table>
                                          <tbody>
                                          <tr v-if="item.status != 100">
                                            <th>نام:</th>
                                            <td class="text-center">{{
                                                item.name
                                              }}
                                            </td>
                                          </tr>
                                          <tr v-if="item.status != 100">
                                            <th>نام خانوادگی:</th>
                                            <td class="text-center">
                                              {{ item.family }}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>شناسه تگ:</th>
                                            <td class="text-center">
                                              <div class="d-inline-flex align-center">
                                                {{ item.rfidCode }}
                                                <v-btn
                                                    icon
                                                    color="primary"
                                                    @click="copyTagIdToClipboard(item)">
                                                  <v-icon small>
                                                    mdi-content-copy
                                                  </v-icon>
                                                </v-btn>
                                              </div>

                                            </td>
                                          </tr>
                                          <tr v-if="item.status != 100 && item.trafficCodeNumber">
                                            <th>کد عبوری:</th>
                                            <td class="text-center">
                                              {{ item.trafficCodeNumber }}
                                            </td>
                                          </tr>
                                          <tr v-if="item.status != 100 && item.trafficCodeTitle">
                                            <th>عنوان کد عبوری:</th>
                                            <td class="text-center">
                                              {{ item.trafficCodeTitle }}
                                            </td>
                                          </tr>
                                          <tr v-if="item.status != 100 && item.expCount">
                                            <th>تعداد تردد باقی‌مانده:</th>
                                            <td class="text-center">{{
                                                item.expCount === -1 ? 'نامحدود' : item.expCount
                                              }}
                                            </td>
                                          </tr>
                                          <tr v-if="item.status != 100 && item.expDate">
                                            <th>تاریخ انقضاء کارت:</th>
                                            <td class="text-center">{{
                                                item.expDate == null ? 'بدون محدودیت زمانی' : getPersianTime(item['expDate'], 'DD MMMM YYYY - HH:mm:ss')
                                              }}
                                            </td>
                                          </tr>
                                          <tr v-if="item.status != 100 && item.trafficCodeDescription">
                                            <td
                                                colspan="2"
                                                class="text-center">{{
                                                item.trafficCodeDescription
                                              }}
                                            </td>
                                          </tr>

                                          <tr v-if="item.status != 100 && item.description">
                                            <td
                                                colspan="2"
                                                class="text-center">
                                              {{ item.description }}
                                            </td>
                                          </tr>
                                          </tbody>
                                        </v-simple-table>
                                      </div>
                                    </div>

                                  </div>

                                </v-card-text>
                              </v-card>
                            </v-menu>
                          </div>
                          <div
                              v-if="checkPermission('live_report.camera_live_view')"
                              class="d-block">
                            <v-btn
                                @click="seeCameraLiveViewDetails(item)"
                                color="primary"
                                text
                                small>
                              (مشاهده دوربین)
                            </v-btn>
                          </div>
                        </div>
                      </div>
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
          <div class="col-4">
            <v-card>
              <v-card-text>
                <v-data-table
                    hide-default-footer
                    :headers="table.doors.headers"
                    :items="table.doors.contents">

                </v-data-table>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <player-modal
        v-if="modal.visible"
        :data="modal.data"
        :visible.sync="modal.visible"></player-modal>
  </v-container>
</template>

<script>
import PlayerModal from "@/view/components/Report/PlayerModal.vue";

export default {
  name: "LiveTrafficReport",
  components: {PlayerModal},
  async created() {
    const [err, data] = await this.to(this.http.get(`/report/dashboard-initialize-report`));
    if (!err) {
      this.successTrafficsCount = data['reportByStatus']['successCount'];
      this.invalidCartCount = data['reportByStatus']['invalidCartCount'];
      this.unSuccessTrafficCount = data['reportByStatus']['unSuccessTrafficCount'];
      this.table.overView.contents = data['lastTraffics'];
      this.table.doors.contents = data['reportByDevices'];
    }
    this.socketIO.on('personnel_attend', (data) => {
      {
        const lastTrafficItem = data['lastTraffic'];
        const lastIndex = this.table.overView.contents.findIndex(x => x.id == lastTrafficItem.id);
        if (lastIndex == -1) {
          this.table.overView.contents.push(lastTrafficItem)
        }
      }
      {
        const deviceTrafficItem = data['reportByDevice'];
        const lastDeviceIndex = this.table.doors.contents.findIndex(x => x.id == deviceTrafficItem.deviceId);
        if (lastDeviceIndex != -1) {
          this.table.doors.contents[lastDeviceIndex].successCount = deviceTrafficItem.successCount;
          this.table.doors.contents[lastDeviceIndex].unsuccessTrafficCount = deviceTrafficItem.unsuccessTrafficCount;
          this.table.doors.contents[lastDeviceIndex].invalidCartCount = deviceTrafficItem.invalidCartCount;
        }
      }
      {
        const statusCounting = data['reportByStatus'];
        this.successTrafficsCount = statusCounting.successCount;
        this.invalidCartCount = statusCounting.invalidCartCount;
        this.unSuccessTrafficCount = statusCounting.unSuccessTrafficCount;
      }


    })
  },
  mounted() {
    window.addEventListener('scroll', (e) => {
      this.lastScrollPosition = window.scrollY;
    })
  },
  data() {
    return {
      lastScrollPosition: 0,
      modal: {
        visible: false,
        data: null,
      },
      successTrafficsCount: 0,
      invalidCartCount: 0,
      unSuccessTrafficCount: 0,
      table: {
        overView: {
          headers: [
            {text: '#', value: 'row', align: 'center', sortable: false},
            {
              text: this.$t('liveTraffic.table.overview.details'),
              value: 'details',
              align: 'center',
              sortable: false,
              filterable: true,
            },
            {
              text: this.$t('liveTraffic.table.overview.deviceTitle'),
              value: 'deviceTitle',
              align: 'center',
              sortable: false
            },
            {
              text: this.$t('liveTraffic.table.overview.status'),
              value: 'status',
              align: 'center',
              sortable: false
            },
            {
              text: this.$t('liveTraffic.table.overview.time'),
              value: 'reportTime',
              align: 'center',
              sortable: false
            },
          ],
          contents: [],
        },
        doors: {
          headers: [
            // {text: '#', value: 'row', align: 'center', sortable: false},
            {
              text: this.$t('liveTraffic.table.doors.deviceTitle'),
              value: 'title',
              align: 'center',
              sortable: false
            },
            {
              text: this.$t('liveTraffic.table.doors.successCount'),
              value: 'successCount',
              align: 'center',
              sortable: false
            },
            {
              text: this.$t('liveTraffic.table.doors.unSuccessCount'),
              value: 'unsuccessTrafficCount',
              align: 'center',
              sortable: false
            },
            {
              text: this.$t('liveTraffic.table.doors.invalidCartCount'),
              value: 'invalidCartCount',
              align: 'center',
              sortable: false
            },
          ],
          contents: [],
        },
      }
    }
  },
  methods: {
    openImageNewTab(url) {
      window.open(url, '_blank')
    },
    copyTagIdToClipboard(item) {
      const code = item.rfidCode;
      if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea)
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

      }
      window.scrollTo({
        top: this.lastScrollPosition
      })

      this.$toast.success(this.$t('ui.copyToClipboardSuccess'))
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
    async seeCameraLiveViewDetails(item) {
      const [err, data] = await this.to(this.http.get(`report/get-device-url-stream/${item.deviceId}`));
      if (!err && !!data) {
        window.location.href = data;
      }

    },
    tableItemClass(item) {
      // return 'table-background'
    }
  },
}
</script>

<style scoped>
.v-card__text h1 {
  font-family: "IranSans";
}

h3 {
  font-family: "IranSans";
  margin-top: 12px;
}

::v-deep .table-background {
  background-color: #ffb206 !important;
}
</style>