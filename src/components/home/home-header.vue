<template>
    <el-row type="flex" class="row-bg" justify="space-between">

      <el-col :span="6">
        <div class="grid-content bg-purple left">
          <i class="el-icon-s-unfold"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </div>
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
export default {
  data () {
    return {
      user: {},
      defaultImg: require('../../assets/imgs/avatar.jpg')
    }
  },
  methods: {
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
  .right{
    margin-top: 15px;
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
      bottom: 12px;
      left: 50px
    }

  }
}
</style>
