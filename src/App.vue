<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>
body {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
