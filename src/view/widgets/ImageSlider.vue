<template>
  <div>
    <vue-flux
        :images="images"
        :options="options"
        :transitions="transitions"
        ref="slider">
    </vue-flux>
  </div>

</template>

<script>

import {
  VueFlux,
  // FluxParallax,
  // FluxCaption,
  FluxControls,
  // FluxIndex,
  // FluxPagination,
  // FluxPreloader,
} from 'vue-flux';
import {mapGetters} from "vuex";

export default {
  name: "ImageSlider",
  props: {
    images: Array,
  },
  data() {
    return {
      mounted: false,
      options: {
        autoplay: true,
        delay: 5000,
        allowFullscreen: false,
      },
      transitions: ['fade']
    }
  },
  mounted() {
    this.mounted = true;
  },
  watch: {
    'imageSliderDurationInSeconds': {
      handler() {
        this.options.delay = this.imageSliderDurationInSeconds * 1000;
      }
    }
  },
  computed: {
    ...mapGetters(['imageSliderDurationInSeconds'])
  },
  components: {
    VueFlux,
    FluxControls
    // FluxParallax
  }
}
</script>

<style scoped>


</style>