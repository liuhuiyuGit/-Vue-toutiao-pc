<template>
    <el-row type="flex" class="row-bg" justify="space-between">

      <el-col :span="6">
        <div class="grid-content bg-purple left">
          <i @click="iscollapse" :class="icon"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </div>
      </el-col>

      <el-col :span="3" class="model">
        <el-input  size="small" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="3">
        <div class="grid-content bg-purple right">
          <img :src="user.photo ? user.photo : defaultImg" alt>
          <el-dropdown trigger="click" class="list" @command='jump'>
            <span class="el-dropdown-link">
              {{user.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='a'>个人信息</el-dropdown-item>
              <el-dropdown-item command='b'>git地址</el-dropdown-item>
              <el-dropdown-item command='c'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </el-col>
    </el-row>
</template>
<script>
import eventBus from '../../utils/eventBus.js'
export default {
  data () {
    return {
      user: {},
      defaultImg: require('../../assets/imgs/avatar.jpg'),
      icon: 'el-icon-s-fold'
    }
  },
  methods: {
    // 点击设置left页面的打开或则关闭
    iscollapse () {
      // 抛出一个事件
      eventBus.$emit('isDisabled')
      this.icon = this.icon === 'el-icon-s-fold' ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    jump (command) {
      if (command === 'a') {
        // 跳转到个人信息面板
        this.$router.push('/home')
      } else if (command === 'b') {
        // 跳转的github
        window.location.href = 'https://github.com/liuhuiyuGit/-Vue-toutiao-pc/commit/bd3f5046ddbd7a8ed772468e5f7cff1e11c2d303'
      } else {
        // 退出登录 删除客户端数据
        window.localStorage.clear()
        this.$router.push('/login')
      }
    },
    // 获取用户信息
    getUserInfo () {
      // let userInfo = window.localStorage.getItem('user-info') // 获取用户存储信息 存储信息里有token
      // let token = userInfo ? JSON.parse(userInfo).token : null // 获取token
      this.$axios({
        url: '/user/profile'
        // headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        this.user = res.data
      })
    }
  },
  created () {
    this.getUserInfo()
    // 监听自定的事件 两个组件通过eventBus联系 事件触发后执行回调函数再次调用
    eventBus.$on('updateUserInfoSuccess', () => {
      this.getUserInfo()
    })
  }
}
</script>
<style lang='less' scoped>
.row-bg{
  .left{
    margin-top: 15px;
    i{
      font-size: 20px;
    }
  }
  .model{
    position: absolute;
    right: 250px;
    top: 12px;
  }
  .right{
    margin-top: 10px;
    position: relative;
    img{
      border-radius: 50%;
      width: 35px;
      height: 35px;
    }
    .list{
      display: block;
      width: 120px;
      position: absolute;
      bottom: 16px;
      left: 50px
    }

  }
}
</style>
