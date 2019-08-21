import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main.vue'
import publish from './views/home/management/publish.vue'
import material from './views/home/management/material.vue'
import contents from './views/home/management/contents-list.vue'
import commentlist from './views/home/management/commentlist.vue'
import profile from './views/home/fans/Fan-profile.vue'
import FansList from './views/home/fans/Fans-list.vue'
import mageText from './views/home/fans/mage-text.vue'
import portrait from './views/home/fans/portrait.vue'
import account from './views/home/account.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: '/publish',
          component: publish
        },
        {
          path: '/commentlist',
          component: commentlist
        },
        {
          path: '/material',
          component: material
        },
        {
          path: '/contents',
          component: contents
        },
        {
          path: '/profile',
          component: profile
        },
        {
          path: '/FansList',
          component: FansList
        },
        {
          path: '/mageText',
          component: mageText
        },
        {
          path: '/portrait',
          component: portrait
        },
        {
          path: '/account',
          component: account
        }

      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
