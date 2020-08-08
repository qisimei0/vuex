<template>
  <div>
    <!-- 顶部选项卡开始 -->
    <mt-navbar v-model="active">
      <mt-tab-item id="1">JSCORE
        <img src="../../assets/html.png" slot="icon">
      </mt-tab-item>
      <mt-tab-item id="2">DOM</mt-tab-item>
      <mt-tab-item id="3">JQUERY
        <img src="../../assets/jQuery.png" slot="icon">
      </mt-tab-item>
      <mt-tab-item id="4">VUE</mt-tab-item>
    </mt-navbar>
    <!-- 顶部选项卡结束 -->
    <!-- 面板开始 -->
    <mt-tab-container v-model="active" style="margin-top:20px">
      <mt-tab-container-item id="1">
        <p>html</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <p>css</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <p>js</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <p>jq</p>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- 面板结束 -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      active:'1'
    }
  }
}
</script>