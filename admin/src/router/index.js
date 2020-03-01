import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import Login from '../views/Login.vue';

import Category from './router/Category/';
import Goods from './router/Goods/';
import Heroes from './router/Heroes/';
import Articles from './router/Articles/';
import Ads from './router/Ads/';
import AdminUsers from './router/AdminUsers/';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Main,
    children: [
      ...Category,
      ...Goods,
      ...Heroes,
      ...Articles,
      ...Ads,
      ...AdminUsers
    ]
  },{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, form, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login');
  }
  next();
})


export default router
