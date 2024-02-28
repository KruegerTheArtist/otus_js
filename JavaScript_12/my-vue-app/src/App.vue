<template>
  <div id="app">
    <HeaderPage />
    <router-view />
    <FooterPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderPage from './components/HeaderPage.vue';
import FooterPage from './components/FooterPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeaderPage,
    FooterPage,
  },
});
</script>

<style>
:root {
  background: #e1e1e159;
  
}
#app {
  background: #e1e1e159;
  text-decoration: none;
  line-height: 1;
  color: #fff;
  font-family: math;
}
</style>