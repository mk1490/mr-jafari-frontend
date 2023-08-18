<template>
  <v-list-item-content>

    <v-list-item>
<!--      <v-list-item-avatar :size="50">-->
      <!--        <v-img-->
      <!--            src="">-->
      <!--        </v-img>-->
      <!--      </v-list-item-avatar>-->
      <v-list-item-content>
        <v-list-item-title>
          {{ name + ' ' + (!!family ? family : '') }}
        </v-list-item-title>
        <v-list-item-subtitle class="mt-2">
          {{ username }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <!--        <v-btn-->
        <!--            class="white&#45;&#45;text"-->
        <!--            color="#42A5F5"-->
        <!--            small-->
        <!--            dark-->
        <!--            @click="goToProfile">-->
        <!--          {{ $t('ui.profile') }}-->
        <!--        </v-btn>-->

      </v-list-item-action>
    </v-list-item>
  </v-list-item-content>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "TheLayoutDrawerAppProfile",
  computed: {
    ...mapGetters(['name', 'family', 'username'])
  },
  methods: {
    goToProfile() {
      this.$router.push('/Profile').catch(e => {
      })
    }
  }
}
</script>

<style scoped>

</style>