<template>
  <div class="container">
    <div class="card task-details">
      <div class="card-body">
        <h2 class="card-title"> {{ task?.name }}</h2>
        <p class="card-text">{{ task?.description }}</p>
        <h3>Основная информация</h3>
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action" >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Создатель</h5>
              <small>{{ task?.creatorName }}</small>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Назначено</h5>
              <small>{{ task?.assigneeName }}</small>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Статус</h5>
              <small>{{ task?.status }}</small>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Приоритет</h5>
              <small>{{ task?.priority }}</small>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Story Points</h5>
              <small>{{ task?.storyPoints }}</small>
            </div>
          </a>
        </div>
        <InteractiveCodeEditor />
        <CommentsSection></CommentsSection>
      </div>
    </div>
  </div>
</template>

<script>
import InteractiveCodeEditor from './InteractiveCodeEditor.vue';
import CommentsSection from './CommentsSection.vue';
import {useStore} from '../shared/store/store';

export default {
  props: {
    id: Number
  },
  data() {
    return {
      description: 'Task description goes here',
      examples: [
        { id: 1, description: 'Example 1', code: 'console.log("Example 1")' },
        { id: 2, description: 'Example 2', code: 'console.log("Example 2")' },
      ],
      task: null
    };
  },
  mounted() {
    this.loadTask(this.$route.params.id);
  },
  setup() {
    const store = useStore();

    const userProfile = store.userProfile;
    const tasks = store.tasks;
    return { userProfile, tasks };
  },
  methods: {
    loadTask(taskId) {
     this.task = this.tasks.find(task => task.id == taskId)
     console.log('task', this.task);
    }
  },
  components: {
    InteractiveCodeEditor,
    CommentsSection
  },
};
</script>

<style>
.task-details {
  padding: 20px;
}

.list-group-item {
  margin-bottom: 10px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>