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
//employer
import employerDashboard from '../views/employers/EmployersDashboard.vue'

import employerViewApplying from '../views/employers/ViewApplying.vue'
import employerUserManagement from '../views/employers/UerManagement.vue'
//Admin

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

    {
      path: '/employer/dashboard',
      component: employerDashboard,
      meta: { layout: 'employer' },
    },

    {
      path: '/employer/view-applying',
      component: employerViewApplying,
      meta: { layout: 'employer' },
    },
    {
      path: '/employer/create-job',
      component: () => import('../views/employers/CreateJob.vue'),
      meta: { layout: 'employer' },
    },
    {
      path: '/employer/user-management',
      component: employerUserManagement,
      meta: { layout: 'employer' },
    },

    // admin routes
    {
      path: '/admin/dashboard',
      component: () => import('../views/admins/AdminReport.vue'),
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/company-profile',
      component: () => import('../views/admins/UserManagement.vue'),
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/condidate',
      component: () => import('../views/admins/ApplicationManagement.vue'),
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/recruiter',
      component: () => import('../views/admins/JobManagent.vue'),
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/report',
      component: () => import('../views/admins/AdminReport.vue'),
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/system-monitoring',
      component: () => import('../views/admins/SystemMonitor.vue'),
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/setting',
      component: () => import('../views/admins/AuthenicationView.vue'),
      meta: { layout: 'admin' },
    },
  ],
})

export default router
