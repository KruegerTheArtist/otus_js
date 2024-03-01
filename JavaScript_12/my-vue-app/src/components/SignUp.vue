<template>
  <div class="main">
    <h2>Регистрация</h2>
    <form @submit.prevent="submitForm">
      <div class="d-flex flex-column">
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="d-flex flex-column">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
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
  name: 'SighUp',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      const store = useStore();
      const userData = {
        id: Math.floor(Math.random() * 99999) + 1,
        username: this.username,
        email: this.email,
        password: this.password
      };
      store.registredUsers?.push(userData);
      store.userProfile = userData;
      this.$router.push('/profile');
    }
  },
  setup() {
    const store = useStore();

    const userProfile = store.userProfile;
    const allUsers = store.registredUsers;

    return { userProfile, allUsers };
  }
});
</script>