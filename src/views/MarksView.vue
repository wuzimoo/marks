<template>
  <div>
    <h1>Привіт, {{ username }}!</h1>
    <label for="lessonSelect">Оберіть предмет:</label>
    <select v-model="selectedLesson" @change="fetchMarks" id="lessonSelect">
      <option v-for="lesson in lessons" :key="lesson" :value="lesson">{{ lesson }}</option>
    </select>

    <div v-if="selectedLesson">
      <h2>Оцінки</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mark in marks" :key="mark.date">
            <td>{{ mark.date }}</td>
            <td>{{ mark.mark }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="else-vers" v-else>
      <p>Оберіть предмет для відображення оцінок!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Mark {
  date: string;
  mark: string;
}

export default defineComponent({
  data() {
    return {
      username: '',
      lessons: [] as string[],
      marks: [] as Mark[],
      selectedLesson: '',
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    async checkAuth() {
      const username = this.getCookie('username');
      const password = this.getCookie('password');

      if (!username || !password) {
        // Редирект на страницу авторизации
        window.location.href = 'http://185.107.237.179:8001/users/';
        return;
      }

      const userCheckResponse = await this.checkUser(username, password);
      if (!userCheckResponse) {
        alert('Ошибка авторизации.');
        return;
      }
      this.username = username; 
    

      const lessonsResponse = await this.fetchLessons();
      if (lessonsResponse) {
        this.lessons = lessonsResponse;
      } else {
        alert('Ошибка при получении списка уроков.');
      }
    },
    async checkUser(username: string, password: string): Promise<boolean> {
      const userCheckUrl = `http://185.107.237.179:8001/users/?name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
      const response = await fetch(userCheckUrl);
      return response.ok;
    },
    async fetchLessons(): Promise<string[]> {
      const lessonsUrl = 'http://185.107.237.179:8001/marks/lessons/';
      const response = await fetch(lessonsUrl);
      if (response.ok) {
        const responseData = await response.json();
        return responseData.data;
        
      } else {
        return [];
      }
    },
    async fetchMarks() {
      const username = this.getCookie('username');
      const encodedUsername = encodeURIComponent(username || '');
      const marksUrl = `http://185.107.237.179:8001/marks/?name=${encodedUsername}&lesson=${encodeURIComponent(this.selectedLesson)}`;

      const response = await fetch(marksUrl);
      if (response.ok) {
        const responseData = await response.json();
        this.marks = await responseData.data;
     
      } else {
        alert('Ошибка при получении оценок.');
      }
    },
    getCookie(name: string): string | null {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    },
  },
});
</script>

<style scoped>
body {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 20px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1, h2 {
  color: #1976D2;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #000000;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #555555;
  border-radius: 4px;
  background-color: #444444;
  color: #ffffff;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  margin: 10px;
  padding: 10px;
  border: 1px solid #555555;
  text-align: left;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

th {
  background-color: #333333;
  color: #ffffff;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

tbody tr:nth-child(even) {
  background-color: #0000002a;
}

tbody tr:hover {
  background-color: #777777;
}

.else-vers{
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}
</style>
