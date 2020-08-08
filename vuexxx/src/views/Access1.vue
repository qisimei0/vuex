<template>
  <div>
    <h1>访问Vuex的数据--页面1</h1>
    <!-- 这里可以不加this -->
    <p>姓名：{{this.$store.state.username}}</p>
    <p>年龄：{{$store.state.age}}</p>
    <!-- $不动这不是自己起的 是挂载在 Vue 实例上的（即Vue.prototype）-->
    <p>性别：{{$store.state.sex?'男':'女'}}</p>
    <h2>商品列表中包含的数量有{{this.$store.getters.productNum}}件，具体如下</h2>
    <p v-for="(item,index) of $store.state.products" :key="index">
      商品ID：{{item.id}},
      商品名称：{{item.productName}},
      商品售价：{{item.salePrice}}
    </p>
  </div>
</template>
<script>
export default {
  mounted(){
    // 这里必须加this
    console.log(this.$store.state.age);
  }
}
</script>
