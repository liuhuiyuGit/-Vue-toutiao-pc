import homeLeft from './home/home-left.vue'
import homeHeader from './home/home-header.vue'
import breadCrumb from './bread-crumb.vue'
import addImage from '../views/home/management/publish/addImage.vue'
import clickImage from '../views/home/management/publish/clickImage.vue'
export default {
  install (Vue) {
    Vue.component('home-left', homeLeft)
    Vue.component('home-header', homeHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('add-iamge', addImage)
    Vue.component('click-image', clickImage)
  }
}
