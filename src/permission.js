import router from './router'
router.beforeEach(function (to, form, next) {
  if (to.path.startsWith('/home')) {
    var result = window.localStorage.getItem('user-info')
    if (result) {
      let userinfo = JSON.parse(result)
      // 如果userinfo为null  null.属性  会报错  为了避免这种情况需要多一层嵌套
      if (userinfo && userinfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
