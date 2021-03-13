import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
    path: '/meetups/:meetupId',
    // https://router.vuejs.org/ru/guide/advanced/navigation-guards.html
    name: 'meetup-page',
    component: () => import('@/views/MeetupPage'),
    meta: {
      showBackToList: true
    },
    redirect: '/meetups/:meetupId/description', // можно так делать?
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
    component: () => import('@/views/CreateNewMeetup')
  },
  {
    path: '/meetups/:meetupId/edit',
    name: 'edit-meetup',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
