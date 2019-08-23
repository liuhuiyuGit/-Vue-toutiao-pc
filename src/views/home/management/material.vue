<template>
  <el-card class="box-card" v-loading="buer">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <bread-crumb>
        <span slot="title">素材管理</span>
      </bread-crumb>
    </div>
    <!-- 身体 -->
    <div class="body">
      <!-- 切换按钮 -->
      <el-radio-group v-model="tabPosition" class="er" style="margin-bottom: 30px;">
        <span @click="quanbu">
          <el-radio-button label="top">全部</el-radio-button>
        </span>
        <span @click="shoucang">
          <el-radio-button label="right">收藏</el-radio-button>
        </span>
        <!-- <el-radio-button label="right" @tab-click="shoucang">收藏</el-radio-button>
        <el-radio-button label="top" @tab-click="quanbu">全部</el-radio-button>-->
      </el-radio-group>
      <!-- 图片 -->
      <el-card class="box-card wai" v-for="item in List" :key="item.id">
        <!-- <img src="../../../assets/imgs/404.png" alt="" class="img"> -->
        <img :src="item.url" alt class="img">
        <div class="text item tu">
          <i
            style="cursor:pointer;"
            :style="{color:item.is_collected? 'red' : ''}"
            @click="collect(item)"
            class="el-icon-star-on"
          ></i>
          <i style="cursor:pointer;" @click="deleItem(item)" class="el-icon-delete-solid"></i>
        </div>
      </el-card>
      <!-- 页码 -->
      <el-pagination
        class="yema"
        :page-size="page.pageSize"
        :total="page.total"
        :current-page="page.currentPage"
        background
        layout="prev, pager, next"
        @current-change="changePage"
      ></el-pagination>
    </div>
    <!-- 点击上传 -->
    <el-upload :show-file-list="false" action='' :http-request="uploadImg" class='upload-material uploading'>
      <el-button type='primary'>上传图片</el-button>
    </el-upload>
    <!-- <el-upload
      class="upload-demo uploading"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" @click="uploadImg" type="primary">点击上传</el-button>
    </el-upload> -->
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      tabPosition: 'top',
      List: [],
      page: {
        // 当前页数
        currentPage: 1,
        // 每页显示多少行
        pageSize: 15,
        // 总条数
        total: 0
      },
      buer: false,
      buerr: false
    }
  },
  methods: {
    // 点击上传
    uploadImg (params) {
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: formData
      }).then(res => {
        console.log(params)
        this.getMaterial()
      })
    },
    // 收藏功能
    collect (item) {
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.getMaterial()
      })
    },
    //  删除功能
    deleItem (item) {
      this.$confirm('您确定要删除吗', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${item.id}`
        }).then(res => {
          this.getMaterial()
        })
      })
    },
    // 请求数据
    getMaterial () {
      this.buer = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.buerr,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.buer = false
        this.List = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 获取当前点击的页数
    changePage (page) {
      this.page.currentPage = page
      this.getMaterial()
    },
    // 点击收藏按钮修改布尔值
    shoucang () {
      this.buerr = true
      this.getMaterial()
    },
    quanbu () {
      // 点击全部按钮修改布尔值
      this.buerr = false
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>
<style scoped>
.wai {
  width: 300px;
  height: 330px;
  float: left;
  margin: 20px 16px;
  overflow: hidden;
}
.img {
  height: 250px;
  width: 100%;
}
.tu {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  font-size: 20px;
}
.el-icon-star-on {
  font-size: 24px;
  margin-top: -1px;
  margin-right: 120px;
}
.er {
  /* position: fixed; */
  position: absolute;
  top: -10px;
  /* float: left;
  margin-top: -70px; */
}
.body {
  padding-top: 20px;
  position: relative;
}
.yema {
  float: left;
  margin-left: 640px;
}
.uploading{
  position: absolute;
  right: 30px;
  top: 125px
}
</style>
