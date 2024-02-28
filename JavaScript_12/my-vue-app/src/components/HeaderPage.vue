<template>
  <header>
    <div class="nav-bar">
    <router-link class="button" to="/">Главная</router-link>
    <span> | </span>
    <router-link class="button" to="/user-stats">Статистика пользователей</router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderPage',
});
</script>

<style>

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #9b6749b8;
  background: #D76F30;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap:10px;
}

.button {
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    line-height: 1;
    padding: 15px;
    color: #fff;
    cursor: pointer;
    font-family: math;
  a {
    color: #fff;
  }
}

.list-group-item {
  margin-bottom: 10px;
}
</style>