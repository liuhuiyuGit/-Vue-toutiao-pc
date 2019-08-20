<template>
<div>
    <el-container>
        <el-aside class="homeLeft" width="200px">
            <home-left></home-left>
        </el-aside>
        <el-container>
            <el-header>
                头部
            </el-header>
            <el-main>
                主要内容
            </el-main>
        </el-container>
    </el-container>
</div>
</template>
<script>
import homeLeft from '../../components/home/home-left.vue'
export default {
  components: {
    'home-left': homeLeft
  }
}
</script>
<style lang="less" scoped>
    .homeLeft{
        height: 100vh;
        background-color: #323745;
    }
</style>
