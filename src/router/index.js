import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/classes/:department/:name',
    name: 'classes:index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Classes.vue'),
    meta: {
      title: (route) => route.params.name,
    },
  },
  {
    path: '/classes/courses/:course/:name',
    name: 'courses:index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Courses.vue'),
    meta: {
      title: (route) => route.params.name,
    },
  },
  {
    path: '/courses/:course/:name',
    name: 'courses:resources',
    component: () => import(/* webpackChunkName: "about" */ '../views/Resource.vue'),
    meta: {
      title: (route) => route.params.name,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      requiresAuth: true,
      title: "Admistrator"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
