import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './utils/reset.css'
import './utils/normal.css'
import './utils/iconfont.css'
import i18n from './lang'
import store from './store'
import './permission'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  render: h => h(App),
  router,
  store,
  i18n,
}).$mount('#app')
