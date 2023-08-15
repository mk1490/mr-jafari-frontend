<template>
  <div class="d-flex justify-center">
    <div class="box">
      <div class="d-inline-block justify-center text-center">
        <p class="d-block">
          {{ title === null ? $t('ui.uploadNewFile') : title }}
        </p>
        <small class="d-block">
          {{ selectedFileStatus }}
        </small>
        <v-btn
            class="mt-2"
            @click="selectFile"
            small
            :outlined="hasFile"
            color="primary">
          {{ hasFile == false ? $t('ui.pickFile') : ('ui.changeFile') }}
        </v-btn>
      </div>
    </div>
    <input
        ref="filePicker"
        :accept="accept"
        hidden="hidden"
        @change="fileChange"
        style="visibility: hidden"
        type="file"/>
  </div>
</template>

<script>
export default {
  name: "BoxedFilePicker",
  props: {
    accept: String,
    title: String,
    type: String,
  },
  emits: ['onFilePicked', 'onFileChanged'],
  created() {
    const type = this.type;
    if (type) {
      switch (type) {
        case 'image':
          this.accept = 'image/jpeg';
          break;
      }
    }
  },
  data() {
    return {
      selectedFileStatus: this.$t('ui.notSelectedFile'),
      hasFile: false,
    }
  },
  methods: {
    selectFile() {
      this.$refs.filePicker.click();
    },
    fileChange(event) {
      const selectedFileOrFiles = event.target.files;
      let fileSizeTitle;
      let fileSize = selectedFileOrFiles[0].size;
      if (fileSize > 1024) {
        fileSize = fileSize / 1024;
        fileSizeTitle = 'کیلوبایت';
      } else if (fileSize > 1024 * 1024) {
        fileSize = fileSize / (1024 / 1024);
        fileSizeTitle = 'مگابایت';
      } else if (fileSize > 1024 * 1024 * 1024) {
        fileSize = fileSize / (1024 / 1024 / 1024);
        fileSizeTitle = 'گیگابایت';
      }
      if (this.hasFile) {
        this.$emit('onFileChanged', selectedFileOrFiles[0])
      } else {
        this.$emit('onFilePicked', selectedFileOrFiles[0])
      }
      this.hasFile = true;
      this.selectedFileStatus = selectedFileOrFiles[0].name + ' (' + fileSize.toLocaleString('en-US', {maximumFractionDigits: 2}) + ' ' + fileSizeTitle + ')'

    }
  }

}
</script>

<style scoped>
.box {
  width: 400px;
  height: 200px;
  border: dashed 2px gray;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box p {
  font-family: "IranSans";
  font-size: 1.6rem !important;
}

small {
  margin-top: 0px;
  font-size: 1.0rem;
}
</style>