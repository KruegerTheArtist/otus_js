<template>
  <div v-if="userProfile" class="main">
    <h1>Список задач</h1>
    <TaskList :tasks="tasks" />
  </div>
  <div v-else class="main"><img src="https://images.mysafetysign.com/img/md/S/authorized-drivers-only-forklift-sign-s2-0604.png" alt="Description of the image"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from './TaskList.vue';
import {useStore} from '../shared/store/store';

export default defineComponent({
  name: 'MainPage',
  components: {
    TaskList,
  },
  setup() {
    const store = useStore();

    const userProfile = store.userProfile;
    const tasks = store.tasks;

    return { userProfile, tasks };
  }
});
</script>

<style>
.main {
  background: #6BB77B;
  margin: 20px;
  color: inherit;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #9b6749b8;
}
</style>