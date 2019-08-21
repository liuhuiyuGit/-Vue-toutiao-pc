import Vue from 'vue'
import App from './App.vue'
import router from './permission.js'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utils/axios.config.js'
// import axios from 'axios'
import abc from './components/index'
Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.use(abc)
Vue.use(element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
