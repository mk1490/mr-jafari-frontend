<template>
  <v-tooltip
      color="green"
      bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          @click="backRoute? $router.push(backRoute) : $router.push('../')"
          v-bind="attrs"
          v-on="on"
          icon>
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </template>
    <span>{{ $t('ui.back') }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "AppBackButton",
  emits: ['onBackClick'],
  props: {
    backRoute: String
  }
}
</script>

<style scoped>

</style>