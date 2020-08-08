<template>
  <div>
    <mt-tab-container v-model="selectedTab" >
      <mt-tab-container-item id="home" 
      style="margin-bottom:55px"
      >
        <p v-for="i of 30" :key="i">首页</p>
        <p>首页</p>
        <p>首页</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="cart">
        <p>购物车</p>
        <p>购物车</p>
        <p>购物车</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="center">
        <p>个人中心</p>
        <p>个人中心</p>
        <p>个人中心</p>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selectedTab" fixed>
      <mt-tab-item id="home">首页
        <img src="../../assets/shouyea.png" slot="icon" v-if="selectedTab=='home'">
        <img src="../../assets/shouye.png" slot="icon" v-else="">
      </mt-tab-item>
      <mt-tab-item id="cart">购物车
        <img src="../../assets/carta.png" slot="icon" v-if="selectedTab=='cart'">
        <img src="../../assets/cart.png" slot="icon" v-else>

      </mt-tab-item>
      <mt-tab-item id="center">个人中心
        <img src="../../assets/centera.png" slot="icon" v-if="selectedTab=='center'">
        <img src="../../assets/center.png" slot="icon" v-else>

      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return{
      selectedTab:'home'
    }
  },
  watch:{
    selectedTab(){
      selectedTab:'home'
    }
  }
}
</script>