<template>
  <div>
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <bread-crumb>
          <span slot="title">发表文章</span>
        </bread-crumb>
      </div>
      <!-- 身体 -->
      <div class="text item body">
        <el-form ref="myForm" label-width="60px" :model="form" :rules="rules">
          <!-- input框 -->
          <el-form-item prop="title" label="标题">
            <el-input v-model="form.title" style="width:500px;"></el-input>
          </el-form-item>
          <!-- 文本域 -->
          <el-form-item prop="content" label="内容">
            <el-input v-model="form.content" :rows="6" type="textarea"></el-input>
          </el-form-item>
          <!-- 单选框 -->
          <el-form-item prop="cover" label="封面">
            <el-radio-group v-model="form.cover">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="'-1'">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 下拉框 -->
          <el-form-item prop="channel_id" label="频道">
            <el-select v-model="form.channel_id" placeholder="请选择">
              <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="publish">发布</el-button>
            <el-button>存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        channel_id: null,
        cover: 0
      },
      rules: {
        title: [{ required: true, message: '标题不能为空' }],
        content: [{ required: true, message: '文章不能为空' }],
        channel_id: [{ required: true, message: '文章不能为空' }]

      },
      //  下拉框内容数组
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 发布内容
    publish () {
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {}
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>
<style lang='less' scoped>
.body{
    margin-left: 60px;
}
</style>
