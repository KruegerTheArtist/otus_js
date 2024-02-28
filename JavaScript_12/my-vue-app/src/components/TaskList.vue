<template>
  <div class="task-list">
    <input class="filter" type="text" v-model="filterQuery" placeholder="Поиск" />
    <div class="tasks-container">
    <div v-for="task in filteredTasks" :key="task.id">
      <TaskCard :task="task"/>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import TaskCard from './TaskCard.vue';
import { Task } from '../interfaces/task.interface';

export default defineComponent({
  name: 'TaskList',
  components: {
    TaskCard,
  },
  props: {
    tasks: {
      type: Array as () => Task[],
      required: true,
    },
  },
  setup(props) {
    const filterQuery = ref('');
    
    const filteredTasks = computed(() => {
      const query = filterQuery.value.toLowerCase();
      return props.tasks.filter(task => task.name.toLowerCase().includes(query));
    });

    return {
      filterQuery,
      filteredTasks,
    };
  },
});
</script>

<style>
.task-list {
    width: 100%;
    display: flex;
    flex-direction: column;

    .filter {
      width: fit-content;
      margin-bottom: 10px;
      align-self: self-end;
      border-radius: 6px;
      border: 1px solid #04290cd9;
      padding: 5px;
    }

    .tasks-container {
      display: flex;
      flex-flow: wrap;
      gap: 15px;
      justify-content: space-between;
      padding: 15px;
    }
}
</style>