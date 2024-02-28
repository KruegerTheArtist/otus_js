<template>
  <div class="comments-section">
    <h2>Комментарии</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.text }} - {{ comment.user }}
      </li>
    </ul>
    <div class="action-block-section">
      <textarea v-model="newComment"></textarea>
      <button @click="addComment">Отправить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsSection',
  data() {
    return {
      comments: [ 
        { id: 1, text: 'Вот это да!', user: 'Большая бабочка' },
        { id: 2, text: 'Вопросики по решению', user: 'Крутой тимлид' }
      ],
      newComment: ''
    };
  },
  methods: {
    addComment() {
      if (this.newComment) {
        this.comments.push({ id: this.comments.length + 1, text: this.newComment, user: 'Я' });
        this.newComment = '';
      }
    }
  }
}
</script>

<style>

.comments-section {
  display: flex;
  flex-direction: column;
  gap: 10px;

  
}

.action-block-section {
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 10px;
}
</style>