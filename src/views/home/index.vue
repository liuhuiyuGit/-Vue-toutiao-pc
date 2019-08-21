<template>
<div>
    <el-container>
        <el-aside class="homeLeft" width="200px">
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
export default {
}
</script>
<style lang="less" scoped>
    .homeLeft{
        height: 100vh;
        background-color: #323745;
    }
    .homeview{
        padding: 0;
    }
</style>
