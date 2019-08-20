import homeLeft from './home/home-left.vue'
import homeHeader from './home/home-header.vue'
export default {
  install (Vue) {
    Vue.component('home-left', homeLeft)
    Vue.component('home-header', homeHeader)
  }
}
