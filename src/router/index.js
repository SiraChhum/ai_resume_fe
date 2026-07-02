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
//admin
import AdminDashboard from '../views/admins/AdminDashboard.vue'
import AdminCompany from '../views/admins/CompanyProfile.vue'
import AdminRecruiter from '../views/admins/RecruitersView.vue'
import AdminReport from '../views/admins/ReportView.vue'
import AdminSetting from '../views/admins/SettingView.vue'
import AdminCondidate from '../views/admins/CandidatesView.vue'

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
      path: '/admin/dashboard',
      component: AdminDashboard,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/condidate',
      component: AdminCondidate,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/company-profile',
      component: AdminCompany,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/recruiter',
      component: AdminRecruiter,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/report',
      component: AdminReport,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/setting',
      component: AdminSetting,
      meta: { layout: 'admin' },
    },
  ],
})

export default router
