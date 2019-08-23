<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <div slot="header" class="clearfix">
      <bread-crumb>
        <span slot="title">评论列表</span>
      </bread-crumb>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="table" style="width: 100%"  v-loading="loading">
        <el-table-column prop="title" label="标题" width="800"></el-table-column>
        <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="obj">
            <el-button type="text">修改评论</el-button>
            <el-button
              @click="CloseorOpen(obj.row)"
              type="text"
            >{{obj.row.comment_status ? "关闭评论" : "打开评论"}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type='flex' justify='center' style='margin:20px 0'>
          <el-pagination :current-page='page.currentPage' background :page-size="page.pageSize" layout="prev, pager, next" :total="page.total" @current-change='changPage'></el-pagination>
      </el-row>
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      // 存储表格数据
      table: [],
      page: {
        pageSize: 10, // 每页显示多少个
        currentPage: 1, // 当前页数
        total: 1 // 总条目数
      },
      // 加载的默认状态
      loading: false
    }
  },
  methods: {
    // 获取后台数据  /articles
    getComments () {
      // 获取数据的时候执行加载动画
      this.loading = true
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage, // 当前点击的页数
          per_page: this.page.pageSize // 每页显示多少个
        }
      }).then(res => {
        // 获取成功之后关闭动画
        this.loading = false
        // 请求到数据赋值给table
        this.table = res.data.results
        // 赋值总数给data，总数/每页条数=页码最大值
        this.page.total = res.data.total_count
      })
    },
    // 表格没办法输出布尔值，所以需要这个方法，如果是true显示正常否则显示关闭
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 点击修改评论状态
    CloseorOpen (row) {
      // 定义个变量，获取第三个列布尔值的状态
      let n1 = row.comment_status ? '关闭' : '打开'
      // 点击按钮之后的提示
      this.$confirm(`确定要${n1}评论吗`, '提示').then(() => {
        // 修改接口 出入query参数id,传入post接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComments()
        })
      })
    },
    // 点击页码获取当前点击的页码赋值给当前页码属性
    changPage (page) {
      console.log(page)
      this.page.currentPage = page
      this.getComments()
    }
  },
  // Vue实例执行完之后获取页面数据 调用get函数
  created () {
    this.getComments()
  }
}
</script>
<style lang='less' scoped>
</style>
