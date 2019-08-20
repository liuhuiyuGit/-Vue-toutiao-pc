<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">

      <el-col :span="6">
        <div class="grid-content bg-purple left">
          <i class="el-icon-s-unfold"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="grid-content bg-purple right">
          <img src="../../assets/imgs/avatar.jpg" alt>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              我是56
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </el-col>

    </el-row>
  </div>
</template>
<script>
export default {}
</script>
<style lang='less' scoped>
.row-bg {
  .left {
    font-size: 20px;
    margin-top: 13px;
    position: relative;
    span {
      font-size: 14px;
      position: absolute;
      top: 5px;
      left: 25px
    }
  }
  .right {
      position: relative;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      position: absolute;
      top: 15px
    }
    span {
      line-height: 35px;
      font-size: 14px;
      position: absolute;
      width: 200px;
      right: -250px;
      top:  -2px;
    }
  }
}
</style>
