<template>
  <v-dialog
      persistent
      width="500"
      v-model="visible">
    <v-card>
      <v-card-title>
        {{ $t('user.changePassword.title') }}
      </v-card-title>
      <v-card-text>

        <v-container>
          <v-text-field
              class="text-center"
              dense
              maxlength="50"
              outlined
              :type="passwordVisible? 'normal': 'password'"
              :append-icon="passwordVisible? 'mdi-eye-off': 'mdi-eye'"
              @click:append="passwordVisible =!passwordVisible"
              hide-details="auto"
              dir="ltr"
              v-model="model.newPassword"
              :label="$t('user.changePassword.form.newPassword')"
          />
        </v-container>


      </v-card-text>
      <v-card-actions>
        <v-btn
            v-on:click="$emit('update:visible', false)"
            color="red" text>
          {{ $t('ui.cancel') }}
        </v-btn>
        <v-spacer/>
        <v-btn
            v-on:click="submit()"
            color="primary">
          {{ $t('ui.submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  name: "ChangePassword",
  emits: ['changePassword'],
  props: {
    visible: Boolean,
    data: Object,
  },
  data() {
    return {
      passwordVisible: false,
      model: {
        newPassword: null,
      }
    }
  },
  methods: {
    async submit() {
      const [err, data] = await this.to(this.http.put(`/user/change-password`, {
        userId: this.data.id,
        newPassword: this.model.newPassword,
      }));
      if (!err) {
        this.$emit('changePassword');
        this.$emit('onUpdateItem', data);
        this.updateItemSuccessToast();
      } else {
        this.updateItemFailedToast();
      }
    }
  }
}
</script>

<style scoped>

</style>