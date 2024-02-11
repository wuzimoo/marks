<!-- components/LoginForm.vue -->
<template>
  <form @submit.prevent="submitForm">
    <label for="username">Username:</label>
    <input type="text" id="username" v-model="username" required />

    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password" required />

    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const submitForm = () => {
      const base_url = 'http://185.107.237.179:8001';
      const url = `${base_url}/users/?name=${encodeURIComponent(username.value)}&password=${encodeURIComponent(password.value)}`;

      console.log('URL запроса:', url);

      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            document.cookie = `username=${username.value};`;
            document.cookie = `password=${password.value};`;
            router.push('/users/mark/');
          } else if (xhr.status === 401) {
            alert('Неверный пароль');
          } else if (xhr.status === 404) {
            alert('Пользователь не существует');
          } else {
            alert('Произошла ошибка. Попробуйте еще раз.');
          }
        }
      };

      xhr.send();
    };

    return {
      username,
      password,
      submitForm,
    };
  }
};

</script>
<style scoped>
form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #333333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

label {
  display: block;
  margin-bottom: 8px;
  color: #ffffff;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #555555;
  border-radius: 4px;
  background-color: #444444;
  color: #ffffff;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #1976d2;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1565c0;
}

@media only screen and (max-width: 600px) {
  form {
    max-width: 100%;
  }
}
</style>
