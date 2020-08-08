<template>
  <div>
    <mt-header title="前端，问" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/" slot="right">
        <mt-button type="danger" size="small">
        <img src="../../assets/more.png"  slot="icon">
      </mt-button>
      </router-link>
    </mt-header>
    
    <div style="border:1px solid red;margin-top:40px">
      <p>
      <mt-button size="normal">默认</mt-button>
      <mt-button type="primary" size="small">主要</mt-button>
      <mt-button type="danger" size="large" plain>危险</mt-button>
      
    </p>
      <p v-for="(v,k) of 30" :key="k">{{v}}</p>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>

</style>