import homeLeft from './home/home-left.vue'
import homeHeader from './home/home-header.vue'
import breadCrumb from './bread-crumb.vue'
export default {
  install (Vue) {
    Vue.component('home-left', homeLeft)
    Vue.component('home-header', homeHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
