<template>
  <div>
    <mt-header title="用户注册">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-field
      type="text"
      label="用户名"
      placeholder="请输入用户名"
      v-model="uname"
      :state="NameStatus"
      @blur.native.capture="checkInputName"
    ></mt-field>
    <mt-field
      type="password"
      label="密码"
      placeholder="请输入密码"
      disableClear
      :attr="{maxlength:'10',autocomplete:'off'}"
      v-model="upwd"
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
      uname: "",
      upwd: "",
      upwd1: "",
      address: "",
      // 保存用户名状态
      NameStatus: "",
      UpwdStatus: "",
      Upwd1Status: "",
    };
  },
  methods: {
    // 检测用户名
    checkInputName() {
      var regex = /^[0-9A-Za-z_]{6,12}$/;
      let uname = this.uname;
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
    checkUpwd(){
      let upwd = this.upwd;
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
    checkUpwd1(){
      let upwd1 = this.upwd1;
      let upwd = this.upwd;
      if (upwd == upwd1) {
        this.Upwd1Status = "success";
        return true;
      } else {
        this.Upwd1Status = "error";
      }

    },
    handle() {
      // 1.获取用户名密码
      let uname = this.uname;
      let upwd = this.upwd;
      let upwd1 = this.upwd1;
      let add = this.address;
      // console.log(uname,upwd,upwd1,add);
      // 2.进行合法的验证
      // 2.1校验用户名，用户名的规则为数字字母下划线的组合，长度为6~12
      //let unameRegExp = /^[0-9A-Za-z_]{6,12}$/; //正则表达式
      // if (unameRegExp.test(uname)) {
      //   this.NameStatus = "success";
      //   return true;
      // } else {
      //   //  this.$toast('用户名不合法');
      //   this.$toast({
      //     message: "请输入合法用户名",
      //     position: "top",
      //     duration: 2000,
      //   });
      //   return true; //终止函数执行
      // }
      // 2.2判断校验密码
      // let upwdRegExp = /^[0-9A-Za-z_]{6,12}$/;
      // if (upwdRegExp.test(upwd)) {
      //   this.UpwdStatus = "success";
      // } else {
      //   this.$toast({
      //     message: "请输入合法密码",
      //     position: "top",
      //     duration: 2000,
      //   });
      //   this.UpwdStatus = "success";
      // }
      // 2.3
      // if (upwd == upwd1) {
      //   this.Upwd1Status = "success";
      // } else {
      //   this.Upwd1Status = "error";
      // }
      // 3.合格后提交
      // 都收到return true才能进入这里面
      if(this.checkInputName()&&this.checkUpwd()&&this.checkUpwd1()){

      if ((uname = "admin8888")) {
        this.$messagebox("注册提示", "对不起，用户已存在");
      } else {
        this.$router.push('/');//路由跳转
      }
      }
    },
  },
  watch:{
    uname(){
      this.checkInputName()
    }
  }
};
</script>