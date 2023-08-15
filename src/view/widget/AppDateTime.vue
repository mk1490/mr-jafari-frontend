<template>
  <span>{{ time }}</span>
</template>

<script>
export default {
  name: "AppDateTime",
  data() {
    return {
      time: 0
    }
  },
  created() {
    setInterval(() => {
      this.time = this.getPersianTime(new Date(), 'dddd DD MMMM YYYY - HH:mm:ss');
    }, 100)
  },
}
</script>

<style scoped>
span {
  font-family: "IranSans";
}
</style>