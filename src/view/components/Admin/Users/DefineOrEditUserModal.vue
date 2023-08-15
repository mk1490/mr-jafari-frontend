<template>
    <v-dialog
            persistent
            width="500"
            scrollable
            v-model="visible">
        <v-card>
            <v-card-title>
                {{ !data ? 'تعریف کاربر جدید' : 'ویرایش کاربر' }}
            </v-card-title>
            <v-card-text>

                <v-expansion-panels v-model="selectedTab">
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            مشخصات کلی
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-form
                                        ref="form"
                                        lazy-validation>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-12">
                                                    <v-text-field
                                                            v-model="model.name"
                                                            hide-details="auto"
                                                            dense
                                                            required
                                                            outlined
                                                            :label="$t('user.modal.form.name')">
                                                    </v-text-field>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field
                                                            v-model="model.family"
                                                            hide-details="auto"
                                                            dense
                                                            required
                                                            outlined
                                                            :label="$t('user.modal.form.family')">
                                                    </v-text-field>
                                                </div>
                                                <div class="col-12">
                                                    <v-select
                                                            v-model="model.roleId"
                                                            hide-details="auto"
                                                            dense
                                                            :items="roleItems"
                                                            item-value="id"
                                                            item-text="title"
                                                            required
                                                            outlined
                                                            @change="getRules"
                                                            :label="$t('user.modal.form.role')">
                                                    </v-select>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field
                                                            :disabled="!!data"
                                                            dir="ltr"
                                                            v-model="model.username"
                                                            hide-details="auto"
                                                            dense
                                                            required
                                                            outlined
                                                            :label="$t('user.modal.form.username')">
                                                    </v-text-field>
                                                </div>
                                                <div
                                                        v-if="!data"
                                                        class="col-12">
                                                    <v-text-field
                                                            dir="ltr"
                                                            v-model="model.password"
                                                            hide-details="auto"
                                                            dense
                                                            required
                                                            outlined
                                                            :label="$t('user.modal.form.password')">
                                                    </v-text-field>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-form>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            سطوح دسترسی
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-treeview
                                        v-model="model.selectedRules"
                                        :open-all="false"
                                        selectable
                                        item-text="title"
                                        item-key="providerKey"
                                        item-children="children"
                                        :items="accessPermissionRuleItems">
                                </v-treeview>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            محدودیت احراز هویت
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-form
                                        lazy-validation
                                        ref="form">
                                    <div
                                            v-for="(item, index) in model.ipAddressItems"
                                            class="row">
                                        <div
                                                class="col">
                                            <v-text-field
                                                    v-model="model.ipAddressItems[index]"
                                                    hide-details="auto"
                                                    :rules="rules.ipAddresses"
                                                    dense
                                                    dir="ltr"
                                                    clearable
                                                    outlined
                                                    label="آدرس آی‌پی">
                                            </v-text-field>
                                        </div>
                                        <div class="col-auto">
                                            <v-tooltip
                                                    color="red"
                                                    bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            class="sqaure-btn white--text"
                                                            color="red"
                                                            @click="removeItem(index)">
                                                        <v-icon>
                                                            mdi-delete
                                                        </v-icon>
                                                    </v-btn>
                                                </template>
                                                حذف
                                            </v-tooltip>
                                        </div>
                                    </div>
                                </v-form>
                                <div class="row">
                                    <div class="col-12 d-flex justify-center">
                                        <v-btn
                                                @click="addIpAddressField"
                                                block
                                                color="primary">
                                            تعریف آی‌پی جدید
                                        </v-btn>
                                    </div>
                                </div>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        v-on:click="$emit('update:visible', false)"
                        color="red" text>
                    {{ $t('ui.cancel') }}
                </v-btn>
                <v-spacer/>
                <v-btn
                        v-if="selectedTab != 0"
                        v-on:click="back"
                        outlined
                        text
                        color="primary">
                    {{ $t('ui.back') }}
                </v-btn>
                <v-btn
                        width="130"
                        v-on:click="nextOrSubmitAndSendToServer"
                        color="primary">
                    {{ selectedTab == 2 ? $t('ui.submit') : $t('ui.continue') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DefineOrEditUserModal",
    emits: ['onAddItem', 'onUpdateItem'],
    async created() {
        const [err, data] = await this.to(this.http.get(`/user/initialize/roles-list${!!this.data ? `?userId=${this.data.id}` : ``}`));
        if (!err) {
            this.roleItems = data['permissionGroupItems'];
            this.initializeRuleId = data['permissionGroupItems'][0]['id'];
            this.accessPermissionRuleItems = data['accessPermissionRuleItems'];
            this.model.selectedRules = data['currentUserRules'];
        } else {
            this.$emit('update:visible', false);
        }
        if (!!this.data) {
            this.model.username = this.data.username;
            this.model.name = this.data.name;
            this.model.family = this.data.family;
            this.initializeRuleId = this.data.roleId;
            this.model.ipAddressItems = this.data.ipAddressItems;
            this.model.roleId = this.initializeRuleId;
        } else {
            this.model.roleId = this.initializeRuleId;
            await this.getRules();
        }


    },
    props: {
        visible: Boolean,
        data: Object,
    },
    methods: {
        back() {
            this.selectedTab -= 1;
        },
        async nextOrSubmitAndSendToServer() {
            if (this.selectedTab < 2) {
                this.selectedTab += 1;
                return
            }
            if (!this.$refs.form.validate()) {
                this.$swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'در معتبر بودن فیلدهای ورودی اطمینان حاصل نمایید.'
                })
                return;
            }
            if (this.model.ipAddressItems.length < 1) {
                const submit = await this.$swal.fire({
                    icon: 'warning',
                    title: 'هشدار!',
                    text: 'برای کاربر فوق محدودیت آدرس آی‌پی تعریف نشده است؛ عدم انجام این کار ممکن است باعث ورود غیرمجاز کاربران از رایانه‌های دیگری شود که از لحاظ امنیتی میمی‌تواند سبب آسیب‌پذیری شود. آیا همچنان تمایل به تعریف / ذخیرۀ این کاربر بصورت نامحدود دارید یا می‌خواهید این محدودیت را تعریف نمایید؟',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonText: 'بله',
                    cancelButtonText: 'خیر، تعریف بدون محدودیت این کاربر'
                });
                if (submit.isConfirmed == false) {

                } else {
                    submit.isConfirmed == true;
                    this.selectedTab = 2;
                    return;
                }
            }

            if (!this.data) {
                const [err, data] = await this.to(this.http.post(`/user`, this.model));
                if (!err) {
                    this.$emit('onAddItem', data);
                    this.addItemSuccessToast();
                } else {
                    this.addItemFailedToast();
                }
            } else {
                const [err, data] = await this.to(this.http.put(`/user/${this.data.id}`, this.model));
                if (!err) {
                    this.$emit('onUpdateItem', data);
                    this.updateItemSuccessToast();
                } else {
                    this.updateItemFailedToast();
                }
            }
        },
        addIpAddressField() {
            this.model.ipAddressItems.push(null)
        },
        removeItem(index) {
            this.model.ipAddressItems.splice(index, 1);
        },
        async getRules() {
            const [err, data] = await this.to(this.http.get(`/user/initialize/role-items?roleGroupId=${this.model.roleId}`));
            if (!err) {
                this.model.selectedRules = data;
            }
        }
    },
    data() {
        return {
            selectedTab: 0,
            roleItems: [],
            accessPermissionRuleItems: [],
            initializeRuleId: null,
            model: {
                name: null,
                family: null,
                roleId: null,
                username: null,
                password: null,
                ipAddressItems: [],
                selectedRules: [],
            },
            rules: {
                ipAddresses: [v => /^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/.test(v) || 'آی‌پی وارد شده معتبر نیست!']
            },
        }
    },
}
</script>

<style scoped>

</style>