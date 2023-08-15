<template>
  <div>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            :value="computedDateFormattedMomentjs"
            v-on="on"
            v-bind="attrs"
            clearable
            :label="$t('timeRangeItems.selectTime')"
            readonly
            outlined
            hide-details
            dense
            @click:clear="date = null"
        ></v-text-field>
      </template>
      <v-date-picker
          v-model="date"
          range
          @change="datePicker = false;menu = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import * as moment from "moment-jalali";

export default {
  name: "DatePickerInputTextField",
  data() {
    return {
      date: null,
      datePicker: false,
      menu: false,
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('jYY/jM/jD');
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? `${this.formatDate(this.date[0])} الی ${this.formatDate(this.date[1])}` : ''
    },
  },
  watch: {
    'date': {
      handler() {
        this.$emit('input', this.date);
      }
    }
  }

}
</script>

<style scoped>

</style>