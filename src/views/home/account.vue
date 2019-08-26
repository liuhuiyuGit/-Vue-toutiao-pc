<template>
  <el-card class="box-card">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <bread-crumb>
        <span slot="title">账户信息</span>
      </bread-crumb>
    </div>
    <!-- 主体 -->
    <el-form ref="userForm" :model="formData" :rules="rules" label-width="100px">
      <!-- 用户名 -->
      <el-form-item prop="name" label="用户名称">
        <el-input v-model="formData.name" style="width:300px"></el-input>
      </el-form-item>
      <!-- 简介 -->
      <el-form-item label="用户简介">
        <el-input v-model="formData.intro" style="width:300px"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email" label="用户邮箱">
        <el-input v-model="formData.email" style="width:300px"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="用户手机号">
        <el-input v-model="formData.mobile" style="width:300px" disabled></el-input>
      </el-form-item>
      <!-- 保存按钮 -->
      <el-form-item>
        <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload class="head-img" action :show-file-list="false" :http-request="uploadImg">
      <img :src="formData.photo" alt>
    </el-upload>
  </el-card>
</template>
<script>
import eventBus from '../../utils/eventBus.js'
export default {
  data () {
    return {
      // 绑定表单元素
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      //   验证表单信息
      rules: {
        name: [
          { required: true, message: '用户名称不能为空' },
          { min: 1, max: 7, message: '用户名称必须控制在2到10个字符' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          {
            pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    uploadImg (params) {
      // this.formData.photo = params.file
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(res => {
        this.formData.photo = res.data.photo
        // 头像更新后抛出事件 header页面监听 触发事件后再此调用后台数据
        // 因为是在eventBus中注册的事件 所以两个页面都可以有联系
        eventBus.$emit('updateUserInfoSuccess')
      })
    },
    //  点击保存触发的事件
    saveUserInfo () {
      this.$refs.userForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            method: 'patch',
            url: '/user/profile',
            data: this.formData
          }).then(res => {
            this.$message({ message: '保存成功', type: 'success' })
            eventBus.$emit('updateUserInfoSuccess')
          })
        }
      })
      // if (this.formData.photo !== '') {
      //   let data = new FormData()
      //   data.append('photo', this.formData.photo)
      //   this.$axios({
      //     method: 'patch',
      //     url: '/user/photo',
      //     data
      //   }).then(res => {
      //     this.formData.photo = res.data.photo
      //     // 头像更新后抛出事件 header页面监听 触发事件后再此调用后台数据
      //     // 因为是在eventBus中注册的事件 所以两个页面都可以有联系
      //     eventBus.$emit('updateUserInfoSuccess')
      //   })
      // }
    },
    // 计入页面获取原先定义的数据 让他显示在页面上
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>
<style lang='less' scoped>
.box-card {
  position: relative;
  .head-img {
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      position: absolute;
      top: 100px;
      left: 560px;
    }
  }
}
</style>
