<template>
  <div class="article">
    <!-- 顶部导航开始 -->
    <mt-header title="学前端">
      <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 文章区域开始 -->
    <div>
      <!-- 文章标题开始 -->
      <div class="article-header">
        <div class="article-header-title" v-html="this.obj.subject"></div>
        <div class="article-header-datetime">{{moment.unix(this.obj.created_at).format('Y-MM-DD')}}</div> 
      </div>
      <!-- 文章标题结束 -->
      <!-- 作者信息开始 -->
      <div class="author-info">
        <div class="author-info-avatar">
          <img :src="this.obj.avatar">
        </div>
        <div class="author-info-detail">
          <div class="author-info-nickname">{{this.obj.nickname}}</div>
          <div>
            共<mt-badge size="small" type="error">{{this.obj.article_number}}</mt-badge>篇
          </div>
        </div>
      </div>
      <!-- 作者信息结束 -->
      <!-- 文章正文开始 -->
      <div class="article-content" v-html="this.obj.content"></div>
      <!-- 文章正文结束 -->
    </div>
    <!-- 文章区域结束 -->
  </div>
  
</template>
<script>
export default {
  data(){
    return{
      obj:{
        subject:'',
        content:'',
        nickname:'',
        article_number:0,
        avatar:'',
        created_at:''
        }
    }
  },
  watch:{

  },
  mounted(){
    // 动态获取动态的参数，与router.js中path中的 : 后面的名字是一致的
    let id=this.$route.params.id;
    console.log(id);
    //  this.axios.get('/articledesc?id='+id).then(res=>{
    //    this.obj=res.data.result;
    //   //  console.log(this.obj[0].content);
    //  });
     this.axios.get('/view?id='+id).then(res=>{
       this.obj=res.data.result;
      //  console.log(this.obj[0].content);
      this.obj.avatar=require('../assets/avatar/'+this.obj.avatar);
     })
  }
}
</script>
<style scoped>
.article{
    background-color:#f6f6f6;
    height:100vh;
}
.article-header{
    margin-bottom:5px;
    padding:10px;
    background-color:#fff;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
.article-header-title{
    font-size:18px;
    color:#1a1a1a;
    line-height: 1.5;
}
.article-header-datetime{
    margin-top:5px;
    font-size:14px;
    color:#646464;
}
.author-info{
    display: flex;
    align-items: center;
    background-color:#fff;
    padding:10px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
.author-info-avatar{
    margin-right:10px;
}
.author-info-avatar img{
    width:40px;
    height: 40px;
    border-radius: 100%;
}
.author-info-detail{
    font-size:14px;
}
.author-info-nickname{
    margin-bottom:5px;
}
.article-content{
    margin-top:5px;
    padding:10px;
    background-color:#fff;
    line-height: 1.7;
}
</style>
<style>
.article-content p{
    padding: 5px 0;
font-size: 16px;
}
.article-content img{
    /* border: 1px solid red; */
    max-width: 100%;
    display: block;
}
</style>