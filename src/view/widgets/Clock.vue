<template>
  <div dir="ltr" class="d-block">
    <div class="d-flex justify-center">
      <div class="d-inline-flex">
        <h1>{{ hour }}</h1>
        <h1
            :style="`visibility: ${indicatorVisible ? 'visible': 'hidden'}`"
            class="mx-1"> {{ ':' }} </h1>
        <h1>{{ minutes }}</h1>
      </div>
    </div>

    <div class="d-block">
      <h4>{{ timeString }}</h4>
    </div>

  </div>
</template>

<script>
export default {
  name: "Clock",
  mounted() {
    setInterval(() => {
      const date = new Date();
      this.hour = date.getHours('');
      this.minutes = date.getMinutes();
      this.indicatorVisible = !this.indicatorVisible;
    }, 1000);
  },
  data() {
    return {
      hour: '--',
      minutes: '--',
      timeString: 'چهارشنبه، 10 اسفندماه 1400',
      indicatorVisible: true,
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: "B Titr";
  font-size: 2.7rem;
}

h4 {
  font-family: "B Zar";
}
</style>