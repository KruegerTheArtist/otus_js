<template>
  <div class="main">
    <h1>Список задач</h1>
    <TaskList :tasks="tasks" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from './TaskList.vue';
import {tasksList} from '../shared/constants/tasks';

export default defineComponent({
  name: 'MainPage',
  components: {
    TaskList,
  },
  data() {
    return {
      tasks: tasksList,
    };
  },
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