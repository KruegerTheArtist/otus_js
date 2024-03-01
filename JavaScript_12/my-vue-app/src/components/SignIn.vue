<template>
  <div class="main">
    <h2>Авторизация</h2>
    <form @submit.prevent="submitForm">
      <div class="d-flex flex-column">
        <label for="username">Имя пользователя или email:</label>
        <input type="text" id="username" v-model="login" required>
      </div>
      <div class="d-flex flex-column">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <button type="submit">Вжух</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from '../shared/store/store';

export default defineComponent({
  name: 'SignIn',
  data() {
    return {
      login: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      const store = useStore();
      const user = store.registredUsers?.find(user => (user.username === this.login || user.email === this.login) && user.password === this.password);
      if(user) {
        store.userProfile = user;
        this.$router.push('/profile');
      }
    }
  },
  setup() {
    const store = useStore();

    const userProfile = store.userProfile;

    return { userProfile };
  }
});
</script>
<style>
</style>