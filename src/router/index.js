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
import JobReView from '@/components/JobDetail/ViewJob.vue'
//employer
import employerDashboard from '../views/employers/EmployersDashboard.vue'
import employerCompany from '../views/employers/CompanyProfile.vue'
import employerRecruiter from '../views/employers/RecruitersView.vue'
import employerReport from '../views/employers/ReportView.vue'
import employerSetting from '../views/employers/SettingView.vue'
import employerCondidate from '../views/employers/CandidatesView.vue'
//Admin
import adminDashboard from '../views/admins/AdminDashboard.vue'
import adminReport from '../views/admins/AdminReport.vue'
import adminSetting from '../views/admins/AdminSetting.vue'
import adminAuditLog from '../views/admins/AuditLog.vue'
import adminCompany from '../views/admins/CompanyManagent.vue'
import adminSystem from '../views/admins/SystemMonitor.vue'
import userManagement from '../views/admins/UserManagement.vue'

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
      path: '/user/job-recommendation/:id',
      component: JobReView,
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
      path: '/employer/condidate',
      component: employerCondidate,
      meta: { layout: 'employer' },
    },
    {
      path: '/employer/company-profile',
      component: employerCompany,
      meta: { layout: 'employer' },
    },
    {
      path: '/employer/recruiter',
      component: employerRecruiter,
      meta: { layout: 'employer' },
    },
    {
      path: '/employer/report',
      component: employerReport,
      meta: { layout: 'employer' },
    },
    {
      path: '/employer/setting',
      component: employerSetting,
      meta: { layout: 'employer' },
    },
    //admin
    {
      path: '/admin/dashboard',
      component: adminDashboard,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/report',
      component: adminReport,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/setting',
      component: adminSetting,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/audit-log',
      component: adminAuditLog,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/cmg',
      component: adminCompany,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/system-monitoring',
      component: adminSystem,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/user-management',
      component: userManagement,
      meta: { layout: 'admin' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    const scrollContainer = document.querySelector('main')

    if (savedPosition) {
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: savedPosition.top,
          left: savedPosition.left,
        })
        return false
      }

      return savedPosition
    }

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        left: 0,
      })
      return false
    }

    return {
      top: 0,
      left: 0,
    }
  },
})

export default router
