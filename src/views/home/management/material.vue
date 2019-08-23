<template>
  <el-card class="box-card"  v-loading="buer">
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
        <span @click="quanbu"><el-radio-button label="top">全部</el-radio-button></span>
        <span @click="shoucang"><el-radio-button label="right">收藏</el-radio-button></span>
        <!-- <el-radio-button label="right" @tab-click="shoucang">收藏</el-radio-button>
        <el-radio-button label="top" @tab-click="quanbu">全部</el-radio-button> -->
      </el-radio-group>
      <!-- 图片 -->
      <el-card class="box-card wai" v-for="item in List" :key="item.id">
        <!-- <img src="../../../assets/imgs/404.png" alt="" class="img"> -->
        <img :src="item.url" alt class="img">
        <div class="text item tu">
          <i class="el-icon-star-on"></i>
          <i class="el-icon-delete-solid"></i>
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
        @current-change='changePage'
      ></el-pagination>
    </div>
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
    changePage (page) {
      this.page.currentPage = page
      this.getMaterial()
    },
    shoucang () {
      this.buerr = true
      this.getMaterial()
    },
    quanbu () {
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
  color: red;
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
</style>
