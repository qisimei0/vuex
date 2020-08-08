<template>
  <div>
    <mt-header title="用户登录">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/register" slot="right">注册
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
    <!-- 双引号里就不能用双引号了 -->
    <mt-button type="primary" size="large" @click="handle">登录</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 用来保存用户名密码的
      username: "",
      password: "",
      // 保存用户名状态
      NameStatus: "",
      UpwdStatus: "",
      uname: "",
      upwd: "",
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
          position: "center",
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
      let uname = this.username;
      let upwd = this.password;
      // console.log(uname,upwd,upwd1,add);
      // 3.合格后提交
      // 都收到return true才能进入这里面
      if (this.checkInputName() && this.checkUpwd()) {
        this.axios
          .post(
            '/login','username=' + this.username + '&password=' + this.password
          )
          .then((res) => {
            if(res.data.code){
             this.$router.push('/');
            //  调用Vuex中的Mutations修改state中的状态
            this.$store.commit('login_mutation')
            }else{
          this.$messagebox("登录提示", "用户名或密码错误");
            }
          });
      }
    },
  },
  watch: {
    uname() {
      this.checkInputName();
    },
  },
};
</script>