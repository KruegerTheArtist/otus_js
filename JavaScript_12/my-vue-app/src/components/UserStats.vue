<template>
  <div class="user-stats">
    <h2>User Statistics</h2>
    <div>
      <div class="cards" v-for="(stat, index) in userStats" :key="index">
        <div class="user-card">
          <h3>{{ stat.fio }}</h3>
          <h5>{{ stat.position }}</h5>
          <p>Возраст: {{ stat.age }}</p>
          <div class="row-section">
            <p>Решено задач: {{ stat.tasksSolved }}</p>
            <p>Рейтинг: {{ stat.rating }}</p>
          </div>
          <p>Описание: {{ stat.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {userStats} from '../shared/constants/user-stats';
export default {
  name: 'UserStats',
  data() {
    return {
      userStats: userStats
    };
  }
}
</script>

<style>
.user-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  margin: 20px;
  border: 1px solid #9b6749b8;
  border-radius: 6px;
  background: #6BB77B;
}

.user-card {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  color: #3d3c3c;
  font-size: 16px;


  h3, h5 {
    align-self: center;
  }
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  margin: 20px;
  border: 1px solid #9b6749b8;
  border-radius: 6px;
    border-radius: 6px;
  background: #e7ffc8;
}

.row-section {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
}
</style>