<template>
<div>
    <el-container>
        <el-aside class="homeLeft" :width='width'>
            <home-left></home-left>
        </el-aside>
        <el-container>
            <el-header>
                <home-header></home-header>
            </el-header>
            <el-main class="homeview">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>
<script>
import eventBus from '../../utils/eventBus.js'
export default {
  data () {
    return {
      width: '200px'
    }
  },
  created () {
    eventBus.$on('isDisabled', () => {
      this.width = this.width === '200px' ? '65px' : '200px'
    })
  }
}
</script>
<style lang="less" scoped>
    .homeLeft{
        min-height: 100vh;
        background-color: #323745;
    }
    .homeview{
        padding: 0;
    }
</style>
