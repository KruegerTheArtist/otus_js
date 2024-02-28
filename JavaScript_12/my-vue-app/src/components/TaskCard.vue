<template>
  <router-link class="button" :to="{ name: 'task', params: { id: task.id } }">
    <div class="task-card">
      <div class="task-id">ID: {{ task.id }}</div>
      <div class="task-card-info"> 
        <h4>{{task.name}}</h4>
        <span class="row-item"><span class="title">Создатель:</span> <span class="value">{{task.creatorName}}</span></span>
        <span class="row-item"><span class="title">Назначено:</span> <span class="value">{{task.assigneeName}}</span></span>
        <span class="row-item"><span class="title">Статус:</span> <span class="value">{{task.status}}</span></span>
        <span class="row-item"><span class="title">Приоритет:</span> <span class="value">{{task.priority}}</span></span>
        <span class="row-item"><span class="title">Story Points:</span> <span class="value">{{task.storyPoints}}</span></span>
        <span class="description"><span class="title w-100">Описание</span> {{task.description}}</span>
        <hr />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task } from '../interfaces/task.interface';

export default defineComponent({
  name: 'TaskCard',
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
});
</script>

<style>
.task-card {
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid #9b6749b8;
    border-radius: 6px;
    background: #e7ffc8;
}

.task-card:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}



.task-card-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  color: #3d3c3c;
  font-size: 14px;
}

.row-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.title {
  font-weight: bold;
}

.value {

}

.description {
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 75px;
}


.task-id {
  width: 100%;
  text-align: center;
  border-radius: 6px 6px 0 0;
  background: #D76F30;
}
</style>