<template>
  <div>
    <div class="title">
      <img src="../../assets/imgs/logo_admin.png" alt>
    </div>
    <el-menu
      background-color="#353b4e"
      text-color="#adafb5"
      :router="true"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/publish">发表文章</el-menu-item>
        <el-menu-item index="/commentlist">内容列表</el-menu-item>
        <el-menu-item index="/material">素材管理</el-menu-item>
        <el-menu-item index="contents">评论列表</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/mageText">图文数据</el-menu-item>
        <el-menu-item index="/profile">粉丝概况</el-menu-item>
        <el-menu-item index="/portrait">粉丝画像</el-menu-item>
        <el-menu-item index="/FansList">粉丝列表</el-menu-item>
      </el-submenu>

      <el-menu-item index="/account">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {}
</script>
<style lang='less' scoped>
.title {
  padding: 16px 0;
  text-align: center;
  background-color: #2e2f32;
  img {
    width: 120px;
  }
}
</style>
