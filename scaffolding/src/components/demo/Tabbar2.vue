<template>
  <div>
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
      switch(this.selectedTab){
        case 'home':
          this.$router.push('/');
          break;
        case 'cart':
          this.$router.push('/list');
          break;
        case 'center':
          this.$router.push('/');
          break;

      }
    }
  }
}
</script>