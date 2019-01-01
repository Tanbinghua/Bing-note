import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: _import('Home'),
      children: [
        { path: '/', name: 'Index', component: _import('Index') },
        { path: '/trash', name: 'Trash', component: _import('Trash') },
        { path: '/content/:uuid', name: 'Content', component: _import('Content') },
      ]
    },
    { path: '/login', name: 'Login', component: _import('Login') },
    { path: '*', redirect: '/error' },
    { path: '/error', name: 'Error', component: _import('Error') }
  ]
})
