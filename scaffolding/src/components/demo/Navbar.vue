<template>
  <div>
    <mt-navbar v-model="active">
      <mt-tab-item id="1">
        <img src="../../assets/html.png" slot="icon">
        HTML</mt-tab-item>
      <mt-tab-item id="2">
        <img src="../../assets/css.png" slot="icon">
        CSS3</mt-tab-item>
      <mt-tab-item id="3">
        <img src="../../assets/java-script.png" slot="icon">
        
        JavaScript</mt-tab-item>
      <mt-tab-item id="4">
        <img src="../../assets/jQuery.png" slot="icon">
        JQuery</mt-tab-item>
    </mt-navbar>
    <h1>{{active}}</h1>
  </div>
</template>
<script>
export default {
  data(){
    return{
      active:'1'
    }
  },
  watch:{
    active(){//监听active这个名字就是要监听的变量
    console.log(`现在要去服务器拿${this.active}类的信息`)
    }
  }
}
</script>