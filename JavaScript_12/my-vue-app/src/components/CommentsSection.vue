<template>
  <div class="comments-section">
    <h2>Комментарии</h2>
    <div class="chat">
      <span v-for="comment in comments" :key="comment.id">
      <span v-if="comment.user === userProfile.username" class="self-message message">
        {{ comment.text }} <span class="selfsender">{{ comment.user }}(Я)</span>
      </span>
         <span v-if="comment.user !== userProfile.username" class="other-message message">
        {{ comment.text }} <span class="othersender">{{ comment.user }}</span>
      </span>
      </span>
    </div>
    <div class="action-block-section">
      <textarea v-model="newComment"></textarea>
      <button @click="addComment">Отправить</button>
    </div>
  </div>
</template>

<script>
import {useStore} from '../shared/store/store';


export default {
  name: 'CommentsSection',
  data() {
    return {
      newComment: ''
    };
  },
  methods: {
    addComment() {
      if (this.newComment) {
        this.comments.push({ id: this.comments.length + 1, text: this.newComment, user: this.userProfile.username });
        this.newComment = '';
      }
    }
  },
  setup() {
    const store = useStore();

    const userProfile = store.userProfile;
    const allUsers = store.registredUsers;
    const comments = store.comments;
    console.log(comments);

    return { userProfile, allUsers, comments };
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

.chat {
    display: flex;
    flex-direction: column;
    background: #f2f2f2;
    border-radius: 10px;
    width: 500px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #0000002b;
    padding: 5px;
}

.selfsender {
    position: absolute;
    bottom: 18px;
    right: 5px;
    background: #f2f2f2;
    border: 1px solid #0000002b;
    border-radius: 6px;
    padding: 2px;
    font-size: 12px;
}

.other-message {
  background: #4080ff;
  color: #ffffff
}

.self-message {
  background: #e0e0e0;
  color: #000000;
  float: inline-end;
}

.message {
  position: relative;
  display: flex;
  min-height: 20px;
  width: 200px;
  border-radius: 7px;
  padding: 10px 5px 5px 5px;
  margin: 5px;
  border: 1px solid #0000002b;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.othersender {
    position: absolute;
    bottom: 23px;
    left: 5px;
    background: #f2f2f2;
    border: 1px solid #0000002b;
    border-radius: 6px;
    padding: 2px;
    font-size: 12px;
  color: #000000;
}
</style>