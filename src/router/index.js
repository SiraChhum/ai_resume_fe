import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/users/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/users/HomeView.vue'
import ProfileView from '../views/users/UserProfile.vue'
import ResumeManagementView from '../views/users/ResumeManagement.vue'
import ResumeAnalysisView from '../views/users/ResumeAnalysis.vue'
import JobRecommendationView from '../views/users/JobRecommendation.vue'
import ApplicationManagementView from '../views/users/ApplicationManagement.vue'
import ApplicationTrackingView from '../views/users/ApplicationTracking.vue'
import FavoriteJobView from '../views/users/FavoriteJob.vue'

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
    {
      path: '/user/resume',
      component: ResumeManagementView,
      meta: { layout: 'user' },
    },
    {
      path: '/user/analysis',
      component: ResumeAnalysisView,
      meta: { layout: 'user' },
    },
    {
      path: '/user/job-recommendation',
      component: JobRecommendationView,
      meta: { layout: 'user' },
    },
    {
      path: '/user/application-management',
      component: ApplicationManagementView,
      meta: { layout: 'user' },
    },
    {
      path: '/user/application-tracking',
      component: ApplicationTrackingView,
      meta: { layout: 'user' },
    },
    {
      path: '/user/favorite-jobs',
      component: FavoriteJobView,
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
