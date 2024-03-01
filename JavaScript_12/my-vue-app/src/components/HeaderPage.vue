<template>
  <header>
    <div class="nav-bar">
    <div class="navigation">
    <router-link class="button" to="/">Главная</router-link>
    <span> | </span>
    <router-link class="button" to="/user-stats">Статистика пользователей</router-link></div>
    <div class="user-action">
      <router-link class="button" to="/profile"><img class="profile" src="https://cdn4.iconfinder.com/data/icons/motorcycle/500/motorcycle_14-1024.png"></router-link>
      <router-link class="button" to="/profile"><img class="profile" @click="handleLogout" src="https://prd1.cloud.lojack.nl/connect/img/icon_logout.svg"></router-link>
    </div>
    </div>

  </header>
</template>

<script lang="ts">
import { defineComponent, ref  } from 'vue';
import {useStore} from '../shared/store/store';

export default defineComponent({
  name: 'HeaderPage',
  methods: {
    async handleLogout() {
      const store = useStore();
      
      store.logout();
      this.$router.push('/');
    }
  },
  setup() {
    const store = useStore();
    const userProfile = ref(store.userProfile);

    return { userProfile };
  }
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
  width: 100%;
  align-items: center;
  place-content: center;
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

.profile {
  width: 40px;
  border: 1px solid;
  border-radius: 50px;
  padding: 5px;
}
.profile:hover {
  background: #cb682d;
}

.navigation {
  display: flex;
  flex-direction: row;
  width:100%;
  align-items: center;
}

.user-action {
  display: flex;
  flex-direction: row;
  
}
</style>