<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HomePage from '@/components/HomePage.vue';

export default {
  name: "App",
  components: {
    HomePage
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
