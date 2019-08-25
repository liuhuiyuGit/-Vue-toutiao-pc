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
            <el-radio-group @change="changeType" v-model="form.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="'-1'">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 因为内容比价多写一个页面比价复杂 所以写一个组件
              需要把images传入给子组件让他知道循环出的次数
           -->
           <el-form-item>
             <add-iamge @updateImages="updateImages" :images="form.cover.images"></add-iamge>
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
            <el-button type="primary" @click="publish(false)">发布</el-button>
            <el-button @click="publish(true)">存入草稿</el-button>
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
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [{ required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题字符个数在5-30之间' }],
        content: [{ required: true, message: '文章不能为空' }],
        channel_id: [{ required: true, message: '文章不能为空' }]

      },
      //  下拉框内容数组
      channels: []
    }
  },
  methods: {
    // map不会 抄的
    updateImages (url, index) {
      this.form.cover.images = this.form.cover.images.map((item, i) => {
        return i === index ? url : item
      })
    },
    // 单选框变化触发这个事件 事件给images数组赋值
    changeType () {
      let type = this.form.cover.type
      if (type === 1) {
        this.form.cover.images = ['']
      } else if (type === 3) {
        this.form.cover.images = ['', '', '']
      } else {
        this.form.cover.images = []
      }
    },
    // 通过id获取当期页面的内容
    getArticleById () {
      // 获取动态路由的id
      let { articleId } = this.$route.params
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.form = res.data
      })
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 发布内容
    publish (draft) {
      let { articleId } = this.$route.params
      // 通过是否有动态路由来判断axios类型和url
      let method = articleId ? 'put' : 'post'
      let url = articleId ? `/articles/${articleId}` : '/articles'
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method,
            url,
            params: { draft },
            data: this.form
          }).then(res => {
            this.$router.push('/commentlist')
          })
        }
      })
    }
  },
  created () {
    this.getChannels()
    // 获取id 如果id存在就执行获取的ajax  如果不存在就不调用这个方法
    let { articleId } = this.$route.params
    articleId && this.getArticleById()
  }
}
</script>
<style lang='less' scoped>
.body{
    margin-left: 60px;
}
</style>
