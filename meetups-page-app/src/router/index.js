import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }

  if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
    return false
  }

  if (savedPosition) {
    return savedPosition
  } else {
    return {
      x: 0,
      y: 0
    }
  }
}

export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/MeetupsPage')
  },
  {
    path: '/meetups',
    name: 'meetups-list',
    redirect: '/'
  },
  {
    path: '/meetups/:meetupId(\\d+)',
    name: 'meetup-page',
    component: () => import('@/views/MeetupPage'),
    meta: {
      showBackToList: true,
      saveScrollPosition: true
    },
    redirect: (to) => ({ name: 'meetup-description', params: to.params }),
    children: [
      {
        path: 'description',
        name: 'meetup-description',
        alias: '',
        component: () => import('@/views/MeetupDescriptionPage'),
        props: true,
        meta: {
          showBackToList: true
        }
      },
      {
        path: 'agenda',
        name: 'meetup-agenda',
        component: () => import('@/views/MeetupAgendaPage'),
        props: true,
        meta: {
          showBackToList: true
        }
      }
    ]
  },
  {
    path: '/meetups/create',
    name: 'create-meetup',
    props: true,
    component: () => import('@/views/CreateNewMeetup')
  },
  {
    path: '/meetups/:meetupId/edit',
    name: 'edit-meetup',
    props: true,
    component: () => import('@/views/EditMeetup')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  },
  {
    path: '/logout',
    redirect: '/page-unknown',
    component: () => import('@/views/LogoutPage')
  },
  {
    path: '*',
    name: '/page-unknown',
    component: () => import('@/views/Page404')
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes
})

export default router
