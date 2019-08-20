<template>
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
          <el-dropdown trigger="click" class="list">
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
</template>
<script>
export default {}
</script>
<style lang='less' scoped>
.row-bg{
  .left{
    margin-top: 15px;
    i{
      font-size: 20px;
    }
  }
  .right{
    margin-top: 15px;
    position: relative;
    img{
      border-radius: 50%;
      width: 35px;
      height: 35px;
    }
    .list{
      display: block;
      width: 70px;
      position: absolute;
      bottom: 12px;
      left: 50px
    }

  }
}
</style>
