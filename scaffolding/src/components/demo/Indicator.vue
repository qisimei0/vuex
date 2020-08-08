<template>
  <div>
    <mt-button type="primary" @click="open">打开加载提示框</mt-button>
  </div>
</template>
<script>
export default {
  methods:{
    open(){
      // 简洁方式
      // this.$indicator.open("");
      // 标准方式
      this.$indicator.open({//加载提示框
        text:'',
        spinnerType:'double-bounce'
        // 'snake'：蛇形
// 'fading-circle'渐消圆
// 'double-bounce'双弹跳
// 'triple-bounce'三弹跳
      })
      //  关闭的方法
      // this.$$indicator.close();
    }
  }
}
</script>