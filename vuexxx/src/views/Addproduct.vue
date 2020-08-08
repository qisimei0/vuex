<template>
  <div>
    <h1>添加商品</h1>
    <table align="center" cellspacing="0" border="1" cellpadding="10">
      <tr>
        <td>商品ID</td>
        <td><input type="text" v-model="id"></td>
      </tr>
      <tr>
        <td>商品名称</td>
        <td><input type="text" v-model="productName"></td>
      </tr>
      <tr>
        <td>商品价格</td>
        <td><input type="text" v-model="salePrice"></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><input type="button" value="确认添加" @click="add"></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      id:'',
      productName:'',
      salePrice:0,
    }
  },
  methods:{
  add(){
    let obj={
      id:this.id,
      productName:this.productName,
      salePrice:this.salePrice
    }
      this.$store.commit('add_product_mutation',obj);
      // 这三句是为了提交之后给他一个空值
       this.id='';
       this.productName='',
       this.salePrice=0;
       this.$router.push('/access1');
  }
  }
}
</script>