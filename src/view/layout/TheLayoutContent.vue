<template>
  <v-content>
    <transition
        name="fade-transform"
        mode="out-in"
    >
      <keep-alive>
        <v-container fluid class="container--fluid">
          <router-view/>
        </v-container>
      </keep-alive>
    </transition>
  </v-content>
</template>

<script>
export default {
  name: 'TheLayoutContent',
  data: () => ({}),
};
</script>
