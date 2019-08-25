<template>
  <div>
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <bread-crumb>
          <span slot="title">内容列表</span>
        </bread-crumb>
      </div>
      <!-- 身体 -->
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 文章状态 -->
          <el-form-item label="文章状态">
            <el-radio-group v-model="form.status" @change="refreshList">
              <el-radio v-model="form.radio" label="5">全部</el-radio>
              <el-radio v-model="form.radio" label="0">草稿</el-radio>
              <el-radio v-model="form.radio" label="1">待审核</el-radio>
              <el-radio v-model="form.radio" label="2">审核通过</el-radio>
              <el-radio v-model="form.radio" label="3">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 频道列表 -->
          <el-form-item label="频道列表">
            <el-select v-model="form.channel_id" @change="refreshList" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 时间选择器 -->
          <el-date-picker
            v-model="form.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @blur="refreshList"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form>
      </div>
    </el-card>

    <!-- 内容显示区域 -->
    <div class="content">
      <div class="header">共找到{{page.total}}条符合条件的内容</div>
      <div class="body">
        <!-- 每条内容 需要for循环 -->
        <div class="box" v-for="(item,index) in list" :key="index">
          <div class="left">
            <img :src="item.cover.images[0]" alt>
            <span>{{item.title}}</span>
            <br>
            <el-tag class="kuang" :type="item.status | statusType">{{item.status | statusText}}</el-tag>
            <br>
            <br>
            <span class="bottom">{{item.pubdate}}</span>
          </div>
          <div class="right">
            <span @click="goEdit(item)" style="cursor:pointer;">
              <i class="el-icon-edit"></i>修改
            </span>
            <span @click="delItem(item)" style="cursor:pointer;">
              <i class="el-icon-delete"></i> 删除
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
    class="paging"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      background
      layout="prev, pager, next"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 获取的内容
      list: [],
      // 总页数
      page: {
        total: 1,
        currentPage: 1,
        pageSize: 10
      },
      form: {
        // 绑定单选框的选中情况 尽量跟后台数据对应上方便操作 5比较投诉无法写空返回
        status: '5',
        // 频道列表获取的数据
        channel_id: null,
        // 时间 是个数组 索引0是开始时间 索引1是结束时间
        date: null
      },
      options: [],
      value: ''
    }
  },
  methods: {
    // 编辑接口
    goEdit (item) {
      this.$router.push(`/publish/${item.id.toString()}`)
    },
    // 删除接口
    delItem (item) {
      this.$confirm('您确定要删除该数据吗', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${item.id.toString()}`
        }).then(() => {
          this.getComments()
        })
      })
    },
    // 封装一个函数用来存储params的值
    // n1 () {
    //   let property = {
    //     status: this.form.status === '5' ? null : this.form.status,
    //     channel_id: this.form.channel_id,
    //     begin_pubdate: this.form.data && this.form.data.length > 0
    //       ? this.form.data.length[0]
    //       : null,
    //     end_pubdate: this.form.data && this.form.date.length > 1
    //       ? this.form.date[1]
    //       : null,
    //     page: this.page.currentPage,
    //     per_page: this.page.pageSize
    //   }
    //   return property
    // },
    // 分页事件
    pageChange (newPage) {
      this.page.currentPage = newPage
      // this.$axios({
      //   url: '/articles',
      //   params: {
      //     status: this.form.status === '5' ? null : this.form.status,
      //     channel_id: this.form.channel_id,
      //     begin_pubdate: this.form.data && this.form.data.length > 0
      //       ? this.form.data.length[0]
      //       : null,
      //     end_pubdate: this.form.data && this.form.date.length > 1
      //       ? this.form.date[1]
      //       : null,
      //     page: this.page.currentPage,
      //     per_page: this.page.pageSize
      //   }
      // }).then(res => {
      //   console.log(res)
      //   this.list = res.data.results
      // })
      // this.getComments(thie.n1)
      this.getComments()
    },
    // 三个选择条件变化都会触发这个函数
    refreshList () {
      this.page.currentPage = 1
      // this.$axios({
      //   url: '/articles',
      //   params: { ...property }
      // }).then(res => {
      //   this.list = res.data.results
      // })
      // this.getComments(thie.n1)
      this.getComments()
    },
    // 获取数据
    // getComments (property) {
    getComments () {
      this.$axios({
        url: '/articles',
        // params：{...property}
        params: {
          status: this.form.status === '5' ? null : this.form.status,
          channel_id: this.form.channel_id,
          begin_pubdate: this.form.data && this.form.data.length > 0
            ? this.form.data.length[0]
            : null,
          end_pubdate: this.form.data && this.form.date.length > 1
            ? this.form.date[1]
            : null,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        // 总条数赋值
        this.page.total = res.data.total_count
      })
    },
    // 获取频道信息
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.options = res.data.channels
      })
    }
  },
  created () {
    this.getComments()
    this.getChannels()
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  }
}
</script>
<style lang='less' scoped>
.content {
  .header {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #323745;
    border-bottom: 1px dashed #ccc;
    padding-left: 14px;
  }
  .body {
    padding-left: 14px;
    .box {
      height: 120px;
      width: 100%;
      margin: 10px 0;
      .left {
        img {
          width: 150px;
          height: 100px;
          float: left;
          margin-right: 10px;
        }
        .kuang {
          width: 60px;
          text-align: center;
          margin-top: 10px;
        }
        span {
          float: left;
          font-size: 14px;
        }
        .bottom {
          margin-top: 10px;
        }
      }
      .right {
        float: right;
        span {
          margin-right: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
.paging{
  margin-left: 650px;
}
</style>
