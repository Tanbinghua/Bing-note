import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  if (store.getters.id) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    if (to.path !== '/') {
      store.dispatch('getUserInfo').then(() => {
        next()
      })
    }
    next()
  }
})

const whiteList = ['/error', '/login']
