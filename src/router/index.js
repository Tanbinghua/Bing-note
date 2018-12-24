import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: _import('Home'),
      // children: [
      //   { path: '/', name: 'Forum', component: _import('Forum') },
      //   { path: '/user', name: 'User', component: _import('User') },
      //   { path: '/content', name: 'Content', component: _import('Content') },
      //   { path: '/newContent', name: 'NewContent', component: _import('NewContent') },
      //   { path: '/editor', name: 'Editor', component: _import('Editor') },
      //   { path: '/form', name: 'Form', component: _import('Form') },
      //   { path: '/about', name: 'About', component: _import('About') }
      // ]
    },
    { path: '/login', name: 'Login', component: _import('Login') },
    // { path: '/try', name: 'Try', component: _import('Try') },
    // { path: '*', redirect: '/error' },
    // { path: '/error', name: 'Error', component: _import('Error') }
  ]
})
