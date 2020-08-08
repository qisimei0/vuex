<template>
  <div>
    <h1>访问Vuex的数据--页面2</h1>
    <p>姓名：{{this.$store.state.username}}</p>
    <p>年龄：{{$store.state.age}}</p>
    <!-- $不动这不是自己起的 是挂载在 Vue 实例上的（即Vue.prototype）-->
    <p>性别：{{$store.state.sex?'男':'女'}}</p>
  </div>
</template>