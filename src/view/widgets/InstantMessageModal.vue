<template>
  <div
      class="hide"
      id="instant-message-container">
    <v-overlay
        opacity="1"
        width="700">
      <v-card

          color="transparent"
          light>
        <v-card-title
            class="justify-center white--text">
          {{ messageTitle }}
        </v-card-title>
        <v-card-text>
          <div
              class="white--text text-center"
              v-html="messageContent">
          </div>
        </v-card-text>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "InstantMessageModal",
  props: {
    visible: Boolean,
    messageTitle: String,
    messageContent: String,
  },
  data() {
    return {
      instantMessageContainerElement: null,
      realVisibility: false,
    }
  },
  mounted() {
    this.instantMessageContainerElement = document.getElementById('instant-message-container');
  },
  created() {
    this.instantMessageContainerElement = document.getElementById('instant-message-container');
  },
  watch: {
    visible: {
      handler(isVisible) {
        if (this.instantMessageContainerElement !== null) {
          if (isVisible) {
            setTimeout(() => {
              this.instantMessageContainerElement.classList.remove('hide');
            }, 1000);
          } else {
            this.instantMessageContainerElement.classList.add('hide');
            setTimeout(() => {
              this.$emit('update:visible', false);
            }, 1500);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.v-card__title {
  font-family: "B Titr" !important;
  font-size: 2rem !important;
}

.v-card__text {
  font-family: "B Zar" !important;
  font-size: 2rem !important;
  line-height: normal;

}

#instant-message-container {
  opacity: 1;
  transition: opacity 0.5s;
}

#instant-message-container.hide {
  opacity: 0;
}
</style>