<template>
  <div
      id="progress-container"
      class="d-flex justify-center">
    <v-overlay
        :value="realVisibility"
        opacity="1"
        light
        class="text-center"
        :z-index="999">
      <v-progress-circular
          indeterminate
          size="70"
          color="green">
      </v-progress-circular>
      <div
          class="progress-text green--text">
        <span>درحال دریافت اطلاعات...</span>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ProgressDialog",
  computed: {
    ...mapGetters(['loading'])
  },
  data() {
    return {
      progressContainer: null,
      realVisibility: false,
    }
  },
  mounted() {
    this.progressContainer = document.getElementById('progress-container');
  },
  created() {
    this.progressContainer = document.getElementById('progress-container');
  },
  watch: {
    loading: {
      handler(isVisible) {
        if (this.progressContainer !== null) {
          if (isVisible) {
            this.realVisibility = true;
            this.progressContainer.classList.remove('hide');
          } else {
            this.progressContainer.classList.add('hide');
            setTimeout(() => {
              this.realVisibility = false;
            }, 1500);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.progress-text {
  display: flex;
  justify-content: center;
  font-family: Iransans !important;
  font-size: 2rem !important;
}

.progress-text span {
  margin-top: 20px;
}


#progress-container {
  opacity: 1;
  transition: opacity 0.5s;
}

#progress-container.hide {
  opacity: 0;
}
</style>