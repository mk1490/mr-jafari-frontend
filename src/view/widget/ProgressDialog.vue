<template>
  <div class="text-center">

    <v-overlay
        opacity="0.2"
        light :z-index="999" :value="showing">
      <v-progress-circular
          indeterminate
          size="40"
          color="primary">
      </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "ProgressDialog",
  props: {
    showing: Boolean
  },
}
</script>

<style scoped>

</style>