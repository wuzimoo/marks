import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import MarksView from '@/views/MarksView.vue'; // Подставьте правильный путь к вашему компоненту MarksView

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/users/mark/',
    name: 'Marks',
    component: MarksView,
    meta: {
      requiresAuth: true // Добавьте этот мета-атрибут, если требуется аутентификация для доступа к этому маршруту
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
