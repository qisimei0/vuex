<template>
  <div>
    <p>
      <button @click="add">增加年龄</button>
      <button @click="reduce">减少年龄</button>
     </p>
     <h1>年龄是：{{this.$store.state.age}}</h1>
  </div>
</template>
<script>
export default {
  methods:{
    add(){
      // 调用增加年龄的mutation方法
      this.$store.commit('add_age_mutation')
    },
    reduce(){
      this.$store.commit('reduce_age_mutation')
    }
  }
}
</script>