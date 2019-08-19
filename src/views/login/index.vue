<template>
<div class="login">
    <el-card class="box-card">
        <div class="title">
            <img src="../../assets/imgs/logo_index.png" alt="">
        </div>

        <el-form :model="FormData" :rules="rules" ref="formData">
            <el-form-item prop="mobile">
                <el-input v-model="FormData.mobile" placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input style="width:65%;" v-model="FormData.code" placeholder="请输入验证码"></el-input>
                <el-button style="margin-left:13px">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop="check">
                <el-checkbox v-model="FormData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" @click="func">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>
<script>
export default {
  data () {
    function fun (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('您还没有阅读协议'))
      }
    }
    return {
      FormData: {
        mobile: '',
        code: '',
        check: true
      },
      rules: {
        mobile: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' }
        ],
        check: [
          { validator: fun }
        ]
      }
    }
  },
  methods: {
    func () {
      this.$refs.formData.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.FormData
          }).then(res => {
            window.localStorage.setItem('user-info', JSON.stringify(res.data.data))
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
    .login{
        width: 100%;
        height: 100vh;
        background: url(../../assets/imgs/login_bg.jpg) no-repeat;
        background-size: cover;
        position: relative;
        .box-card{
            width: 450px;
            height: 350px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .title{
                text-align: center;
                margin-bottom: 30px;
                img {
                    width: 220px;
                    height: 50px;
                }
            }

        }
    }
</style>
