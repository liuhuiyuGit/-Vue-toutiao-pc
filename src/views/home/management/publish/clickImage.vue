<template>
  <div>
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" type="card">
          <!-- 后台数据 素材库 -->
          <el-tab-pane label="素材库" class="first" name="first">
            <div class="body">
              <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
                <span @click="getMaterial">
                  <el-radio-button label="top">全部</el-radio-button>
                </span>
                <span @click="getMaterial">
                  <el-radio-button label="right">收藏</el-radio-button>
                </span>
              </el-radio-group>

              <div class="body_box">
                <div class="small" v-for="item in list" :key="item.id">
                  <!-- <img src="../../../../assets/imgs/404.png" alt=""> -->
                  <img @click="selectOneImg(item)" :src="item.url" alt>
                </div>
              </div>
              <!-- 分页 -->
              <el-row class="page">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="page.total"
                  :current-page="page.currentPage"
                  :page-size="page.pageSize"
                  @current-change="changePage"
                ></el-pagination>
              </el-row>
            </div>
          </el-tab-pane>
          <!-- 自己上传图片 -->
          <el-tab-pane class="second" label="上传图片" name="second">
            <el-upload
              :http-request="uploadImg"
              class="avatar-uploader"
              action
              :show-file-list="false"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 主体 -->
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 点击素材库 上传图片改变 first second改变
      activeName: 'first',
      // 点击全部和收藏改变  top right 改变
      tabPosition: 'top',
      // 存储后台传过的的图片
      list: [],
      // 分页的数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    //  上传成功后触发 参数.file是文件
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        data,
        method: 'post'
      }).then(res => {
        // 使用同一个事件 不冲突 因为两个上传方法不会一起进行
        this.$emit('selectOneImg', res.data.url)
      })
    },
    // 点击图片的时候把图片的url返回到父组件
    selectOneImg (item) {
      this.$emit('selectOneImg', item.url)
    },
    // 获取当前页数
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getMaterial()
    },
    // 获取后台图片数据
    getMaterial () {
      let paging = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: { collect: false, ...paging }
        // params: { collect: this.tabPosition === 'top', ...paging }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>
<style lang="less" scoped>
.first {
  .body {
    position: relative;
    height: 450px;
    .body_box {
      .small {
        width: 200px;
        height: 150px;
        float: left;
        margin: 5px 8px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .page {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
    }
  }
}
.second{
    .avatar-uploader{
        width: 200px;
        height: 200px;
        border: 1px dashed  #ccc;
        text-align: center;
        .el-icon-plus{
            font-size: 100px;
            line-height: 200px;
        }
    }
}
</style>
