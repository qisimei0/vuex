<template>
  <!-- infinite-scroll-distance="20" 是指在滚动条距离底部小于等于20个像素的时候，将触发一个函数来加载更多的数据 -->
  <!-- v-infinite-scroll="loadMore" 是指触发的函数名称，用这个函数来加载更多的数据 -->
  <div id="1" infinite-scroll-distance="20" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
    1234
    <p v-for="(v,k) of n" :key="k" v-text="v"></p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      n: 50,
      busy:false
    };
  },
  methods: {
    loadMore() {
      this.busy=true
      // 假设服务器的运行效率非常低，10s才能返回运行结果
      window.setTimeout(()=>{
      this.n += 50;
      this.busy=false;
      },10000);
    },
  },
};
</script>
<style scoped>
div {
  border: solid #f0f;
}
</style>