<template>
  <v-dialog
      persistent
      v-model="visible"
      width="300">
    <v-card>
      <v-card-title>
        {{ $t('ui.deleteItem') }}
      </v-card-title>
      <v-card-text>
        <h4>
          {{ $t('ui.deleteItemQuestion') }}
        </h4>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="error"
            text
            @click="hide"
        >
          {{ $t('ui.cancel') }}
        </v-btn>
        <v-btn
            color="primary"
            @click="_confirm()"
        >
          {{ $t('ui.submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  name: "DeleteDialog",
  data() {
    return {
      visible: false,
      resolvePromise: undefined,
      rejectPromise: undefined,
    }
  },
  methods: {
    async _confirm() {
      this.resolvePromise(true);
      this.visible = false;
    },
    show() {
      this.visible = true;
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });

    },
    hide() {
      this.visible = false;
      this.resolvePromise(false);
    }
  }
}
</script>

<style scoped>

</style>