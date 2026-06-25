import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/users/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/users/HomeView.vue'
import ProfileView from '../views/users/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView,
      meta: { layout: 'none' },
    },
    {
      path: '/user/dashboard',
      component: HomeView,
      meta: { layout: 'user' },
    },
    {
      path: '/user/profile',
      component: ProfileView,
      meta: { layout: 'user' },
    },

    // {
    //   path: '/admin',
    //   component: AdminDashboard,
    //   meta: { layout: 'admin' }, // 👈 Uses AdminLayout
    // },
  ],
})

export default router
