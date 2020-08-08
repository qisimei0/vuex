<template>
  <div class="home">
    <!-- 顶部导航开始 -->
    <mt-header title="学问">
      <div slot="right" class="shortcut" v-if="!this.$store.state.isLogin">
        <router-link to="/register">注册</router-link>
        <router-link to="/login">登录</router-link>
      </div>
      <div slot="right" class="shortcut" v-else>
        <router-link to="/">
        <mt-button type="primary">
          <img src="../assets/logout.png" slot="icon">
        </mt-button>
        </router-link>
      </div>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 导航选项卡开始 -->
    <mt-navbar v-model="active">
      <mt-tab-item
        v-for="(cate,i) of category"
        :key="i"
        :id="parseInt(cate.id)"
        v-text="cate.category_name"
      ></mt-tab-item>
    </mt-navbar>
    <!-- 导航选项卡结束 -->
    <!-- 面板区域开始 -->
    <div
      class="panel"
      infinite-scroll-distance="20"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check=true
    >
    <!-- 滚动会自动触发一次，所以加上这个就会让他不自动触发了 -->
      <mt-tab-container v-model="active" class="panel">
        <mt-tab-container-item :id="parseInt(cate.id)" v-for="(cate,i) of category" :key="i">
          <!-- 单一文章信息开始 -->
          <div class="InfoItem" v-for="(ar,i) of article" :key="i">
            <!-- 标题信息开始 -->
            <div class="InfoItemHead">
              <!-- `/article?id=${ar.id}` `/article/${ar.id}` -->
              <router-link :to="`/article/${ar.id}`"> {{ar.subject}}</router-link>
             </div>
            <!-- 标题信息结束 -->
            <!-- 简介与缩略图开始 -->
            <div class="InfoItemContent">
              <!-- 简介开始 -->
              <div class="InfoItemDesc" v-text="ar.description"></div>
              <!-- 简介结束 -->
              <!--  缩略图开始-->
              <!-- 和图片路径有关系，
             因为动态图像需要通过require命令进行加载才可以
              放到public目录下，但是public放的是静态图片文件-->
              <!-- <img :src="imgurl(ar.image)" class="InfoItemImg">  
              v-lazy:减少客户端压力，看多少加载多少，实时加载出来，只有图片有v-lazy-->
              <router-link v-if="ar.image != null" :to="`/article/${ar.id}`">
              <img v-lazy="ar.image" class="InfoItemImg"  />
              </router-link>
              <!-- 缩略图结束 -->
            </div>
            <!-- 简介与缩略图结束 -->
          </div>
          <!-- 单一文章信息结束 -->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 面板区域结束 -->
    <!-- 底部选项卡开始 -->
    <mt-tabbar v-model="selectedTab" fixed>
      <mt-tab-item id="home">
        首页
        <img src="../assets/shouyea.png" slot="icon" v-if="selectedTab=='home'" />
        <img src="../assets/shouye.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="cart">
        购物车
        <img src="../assets/carta.png" slot="icon" v-if="selectedTab=='cart'" />
        <img src="../assets/cart.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="center">
        个人中心
        <img src="../assets/centera.png" slot="icon" v-if="selectedTab=='center'" />
        <img src="../assets/center.png" slot="icon" v-else />
      </mt-tab-item>
    </mt-tabbar>
    <!-- 底部选项卡结束 -->
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data() {
    return {
      // 默认1，默认被选定的选项卡的顶部面板的ID
      active: 1,
      // 默认被选定的底部选项卡
      selectedTab: "home",
      // 生声一个变量，存储文章分类信息
      category: [],
      // 存储文章数据
      article: [],
      // 存储当前页码
      page: 1,
      // 存储服务器返回的总页数
      pageCount:0,
      // 用来标识服务器正在处理请求，能否继续处理其他请求
      busy:false,
    };
  },
  methods: {
    //  向下滚动时，触发的加载的更多的函数
    loadMore() {
      // 页码累加
      this.page += 1;
      if(this.page<=this.pageCount){
      this.loadDate();
      }
    },
    // 加载数据的方法
    loadDate(){
      // 代表当前服务器正在处理请求，即使再次进入滚动范围也不再触发滚动指令
      this.busy=true;
      // 显示加载提示框
      this.$indicator.open('加载中...');
      this.axios
        .get("/article?cid=" + this.active + "&page=" + this.page)
        .then((res) => {
          // 将返回的总页数，存入变量
          this.pageCount=res.data.pageCount;
          // 获取服务器返回的文章数据
          let data = res.data.result;
          data.forEach((item) => {
            // 因为有的文章不需要图
            if (item.image != null) {
              // 动态加载（动态加载，重新赋值的过程）
              item.image = require("../assets/articles/" + item.image);
            }
            // 将item（文章对象，包括id，subject等属性重新赋值）
            this.article.push(item);
          });
          // 代表服务器已经可以继续处理接下来的滚动指令了
          this.busy=false;
          // 关闭加载提示框
          this.$indicator.close();
        });
    }
  },
  watch: {
    // 监听底部选项卡的变化
    selectedTab() {
      switch (this.selectedTab) {
        case "home":
          this.$router.push("/");
          break;
        case "cart":
          this.$router.push("/list");
          break;
        case "center":
          this.$router.push("/tabbar");
          break;
      }
    },
    // 监听 顶部选项卡的变化
    active() {
      active: this.active;
      this.page = 1; //放在axios里面和外面是一样的？会在标签跳转的时候从第一页开始
      // 切换选项卡时，清空之前存储的文章数据
      this.article = [];
      // 加载数据
      this.loadDate();
    },
  },
  // 挂载后发送请求，以获取WEB服务器的数据
  mounted() {
    //发送请求，初始化数据
    // 使用axios发送请求:获取数据所以是get请求
    // 决定顶部的选项卡
    this.axios
      .get("/category")
      // 接收服务端的信息
      .then((res) => {
        // console.log(res.data);
        this.category = res.data.result;
      });
    this.loadDate();
    // 获取默认顶部选项卡包含的文章列表
    // 之所以要传递参数，是因为现在客户端只获取特定分类下包含的文章数据，所以通过参数来告知服务器
    // 客户端向服务器传参
    // this.axios
    //   .get("/article?cid=" + this.active + "&page=" + this.page)
    //   //  因为不能取得所有文章列表，
    //   // 要按照分类获得
    //   // params:{
    //   //   cid:this.active
    //   // }
    //   .then((res) => {
    //     // 将服务器返回的总页数存储到pageCount变量中
    //     this.pageCount=res.data.pageCount;
    //     // 存变量
    //     // this.article=res.data;
    //     let data = res.data.result; //从服务器拿回来的数组
    //     // 循环动态加载图像
    //     data.forEach((item) => {
    //       //item组成数组的每一个成员对象
    //       // 属性重新赋值，字符拼接
    //       // 动态加载图像，图像已经成为了动态加载的图像了，所以现在只能依次将最新的item添加到article变量中
    //       // 只对有图像的动态加载
    //       if (item.image != null) {
    //         item.image = require("../assets/articles/" + item.image);
    //       }
    //       this.article.push(item); //数组末尾添加
    //     });
    //   });
    //  告诉服务器要哪一类的 第一页的数据
  },
};
</script>
// scoped 是
<style scoped>
/* 顶部导航栏右侧的链接 */
/* 单一文章信息容器 */
.InfoItem {
  padding: 15px 0 14px;
  margin: 0 15px;
  border-bottom: 0.5px solid #d3d3d3;
}
/* 标题信息 */
.InfoItemHead {
  -webkit-line-clamp: 1; /*显示1行 */
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 22px;
  text-overflow: ellipsis; /*用省略号表示 */
  overflow: hidden; /*超出部分隐藏 */
  display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /*设置伸缩盒子的子元素排列方式 */
}
.InfoItemHead a{
  text-decoration: none;
  color: #000;
}
/* 简介缩略图 */
.InfoItemContent {
  display: flex;
  display: -ms-flexbox;
  padding-top: 11px;
  -ms-flex-align: center;
  align-items: center; /*交叉轴中间对齐 */
  width: 100%;
}
/* 简介 */
.InfoItemDesc {
  flex: 1; /*项目放大的比例：等分剩余空间*/
  position: relative;
  -webkit-line-clamp: 3; /*显示3行 */
  height: 63px;
  padding-right: 15px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis; /*用省略号表示 */
  display: -webkit-box;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
  margin: 4px 15px;
  -webkit-box-orient: vertical; /*设置伸缩盒子的子元素排列方式 */
}
/* 缩略图 */
.InfoItemImg {
  width: 112px;
  height: 74px;
  border-radius: 5px;
  background: #ccc;
}
.title {
  font-weight: 700;
}
.content {
  font-size: 12px;
  width: 80%;
  text-indent: 2em;
  text-overflow: ellipsis; /*溢出用省略号显示 */
  overflow: hidden; /*超出部分隐藏 */
  display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 3; /*显示三行 */
}
.img {
  float: right;
  margin-top: -40px;
  width: 20%;
}
.shortcut a {
  display: inline-block;
  margin: 3px;
  color: #fff;
  text-decoration: none;
}
/* 面板容器 */
.panel {
  margin-bottom: 55px;
  margin-top: 10px;
}
</style>
