<template>
  <div>
    <mt-header title="用户注册">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/login" slot="right">
        <mt-button>登录</mt-button>
      </router-link>
    </mt-header>
    <mt-field
      type="text"
      label="用户名"
      placeholder="请输入用户名"
      v-model="username"
      :state="NameStatus"
      @blur.native.capture="checkInputName"
    ></mt-field>
    <mt-field
      type="password"
      label="密码"
      placeholder="请输入密码"
      disableClear
      :attr="{maxlength:'10',autocomplete:'off'}"
      v-model="password"
      :state="UpwdStatus"
      @blur.native.capture="checkUpwd"
    ></mt-field>
    <mt-field
      type="password"
      label="确认密码"
      placeholder="请再次输入密码"
      disableClear
      :attr="{maxlength:'10',autocomplete:'off'}"
      v-model="upwd1"
      :state="Upwd1Status"
      @blur.native.capture="checkUpwd1"
    ></mt-field>
    <mt-field
      type="text"
      label="住址"
      placeholder="请输入住址"
      disableClear
      :attr="{maxlength:'10',autocomplete:'off'}"
      v-model="address"
      :state="Upwd1Status"
    ></mt-field>
    <!-- 双引号里就不能用双引号了 -->
    <mt-button type="primary" size="large" @click="handle">免费注册</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 用来保存用户名密码的
      username: "",
      password: "",
      upwd1: "",
      address: "",
      // 保存用户名状态
      NameStatus: "",
      UpwdStatus: "",
      Upwd1Status: "",
      uname: "",
    };
  },
  methods: {
    // 检测用户名
    checkInputName() {
      var regex = /^[0-9A-Za-z_]{6,12}$/;
      let uname = this.username;
      if (!regex.test(uname)) {
        this.NameStatus = "error";
        this.$toast({
          message: "请输入合法用户名",
          position: "top",
          duration: 2000,
        });
      } else {
        this.NameStatus = "success";
        return true;
      }
    },
    // 检测密码
    checkUpwd() {
      let upwd = this.password;
      let upwdRegExp = /^[0-9A-Za-z_]{6,12}$/;
      if (upwdRegExp.test(upwd)) {
        this.UpwdStatus = "success";
        return true;
      } else {
        this.$toast({
          message: "请输入合法密码",
          position: "top",
          duration: 2000,
        });
        this.UpwdStatus = "error";
      }
    },
    // 检测确认密码
    checkUpwd1() {
      let upwd1 = this.upwd1;
      let upwd = this.password;
      if (upwd == upwd1) {
        this.Upwd1Status = "success";
        return true;
      } else {
        this.Upwd1Status = "error";
      }
    },
    handle() {
      // 1.获取用户名密码
      let username = this.username;
      let password = this.password;
      let upwd1 = this.upwd1;
      let add = this.address;
      // 3.合格后提交
      // 都收到return true才能进入这里面
      if (this.checkInputName() && this.checkUpwd() && this.checkUpwd1()) {
        // // this.axios.get("/author?username=" + username).then((res) => {
          // console.log(res.data);
          // this.uname = res.data;
        // });
        // if (this.uname == "用户名存在") {
          // this.$messagebox("注册提示", "对不起，用户已存在");
        // // } else if (this.uname == "用户名不存在") {
          // this.$router.push("/"); //路由跳转
          // let username = this.username;
          // let password = this.password;
          // this.axios
            // .post("/author?username=" + username + "&password=" + password)
            // .then((res) => {
              // this.obj = res.data;
            // })
          // this.$messagebox("注册提示", "注册成功");
          // this.$router.push("/login");
        // }
        // 老师写的post请求
        this.axios.post('/register','username='+this.username+'&password='+this.password).then(res=>{
          if(res.data.code==0){
            // 注册失败
          this.$messagebox("注册提示", "注册失败");
          }else{
            // 注册成功
          this.$router.push('/');
          }
        })
      }
    },
  },
  watch: {
    username() {
      this.checkInputName();
    },
  },
};
</script>