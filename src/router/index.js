import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)
import Home from '../views/Home'
import Index from '../views/Index'
import Trash from '../views/Trash'
import Content from '../views/Content'
import Login from '../views/Login'
import ErrorPage from '../views/Error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'Index', component: Index },
        { path: '/trash', name: 'Trash', component: Trash },
        { path: '/content/:uuid', name: 'Content', component: Content },
      ]
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '*', redirect: '/error' },
    { path: '/error', name: 'Error', component: ErrorPage }
  ]
})
