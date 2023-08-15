<template>
  <v-btn
    icon
    @click="stopSound">
    <v-icon>mdi-bell-off</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters , mapActions} from 'vuex';


export default {
  name: 'AppSoundAlarmPlay',
  computed: {
    ...mapGetters([
      'fullscreenShow',
    ]),
    toggleFullScreenIcon() {
      return this.fullscreenShow ? 'mdi-fullscreen-exit' : 'mdi-fullscreen';
    },
  },
  methods: {
    ...mapActions(['stopSound'])
  },
};
</script>
