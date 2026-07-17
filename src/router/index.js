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
      path: '/admin/system-monitoring',
      component: () => import('../views/admins/SystemMonitor.vue'),
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/user-management',
      component: () => import('../views/admins/UserManagement.vue'),
      meta: { layout: 'admin' },
    },

    {
      path: '/admin/applicant-management',
      component: () => import('../views/admins/ApplicantManagement.vue'),
      meta: { layout: 'admin' },
    },

    {
      path: '/admin/job-management',
      component: () => import('../views/admins/JobManagement.vue'),
      meta: { layout: 'admin' },
    },

    {
      path: '/admin/authentication',
      component: () => import('../views/admins/AuthenicationView.vue'),
      meta: { layout: 'admin' },
    },

    {
      path: '/admin/report',
      component: () => import('../views/admins/AdminReport.vue'),
      meta: { layout: 'admin' },
    },

    //recruiter routes
    {
      path: '/recruiter/jobs',
      component: () => import('../views/recruiters/JobView.vue'),
      meta: { layout: 'recruiter' },
    },
    {
      path: '/recruiter/applications',
      component: () => import('../views/recruiters/ApplicationView.vue'),
      meta: { layout: 'recruiter' },
    },
    {
      path: '/recruiter/interviews',
      component: () => import('../views/recruiters/InterviewView.vue'),
      meta: { layout: 'recruiter' },
    },
    {
      path: '/recruiter/alerts',
      component: () => import('../views/recruiters/AlertView.vue'),
      meta: { layout: 'recruiter' },
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
