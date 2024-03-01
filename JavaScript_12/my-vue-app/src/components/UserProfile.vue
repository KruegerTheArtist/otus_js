<template>
  <div v-if="userProfile" class="main card">
    <h1>Профиль пользователя {{userProfile.username}}</h1>
    <span>Сколько то задач решено</span>
    <span>Описание: "Самый классный"</span>
  </div>
  <div v-else class="main">
    <router-link class="button" to="/sign-in">Авторизоваться</router-link>
    <router-link class="button" to="/sign-up">Зарегистрироваться</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from '../shared/store/store';

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const store = useStore();

    const userProfile = store.userProfile;

    return { userProfile };
  }
});
</script>

<style>

.card {
 display: flex;
 flex-direction: column;
 gap: 20px;
 background: inherit;
}
</style>