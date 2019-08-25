<template>
<div class="box">
    <div @click="clickImg(index)" class="son" v-for="(item,index) in images" :key="index">
        <span>点击图标选择图片</span>
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <el-dialog :visible="showDialog" @close="showDialog=false">
        <!-- 这还要注册一个组件 内容太多 可以独立 -->
        <click-image @selectOneImg="selectImg"></click-image>
    </el-dialog>
</div>
</template>
<script>
export default {
  props: ['images'],
  data () {
    return {
      showDialog: false,
      index: 0,
      defaultImg: require('../../../../assets/imgs/pic_bg.png')
    }
  },
  methods: {
    // 再把值传给上级
    selectImg (url) {
      // 索引也要传回去不然不知道给谁设置的图片
      this.$emit('updateImages', url, this.index)
      // 触发事件把弹框关掉
      this.showDialog = false
    },
    // 点击添加图片触发
    clickImg (index) {
      this.showDialog = true
      this.index = index
    }
  }
}
</script>
<style lang='less' scoped>
.box{
    display: flex;
    .son{
        border: 1px solid #ccc;
        width: 240px;
        height: 220px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        span{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 10px;
            color: #ccc;
        }
    }
}
</style>
