<template>
  <div>
    <button @click="getHoursAdd()">+</button>
    <button  @click="getMinutesAdd()">+</button>
    <button @click="getSecondsAdd()">+</button>
    <br />
    <span v-text="date.getHours()"></span>
    <span>:</span>
    <span v-text="date.getMinutes()"></span>
    <span>:</span>
    <span v-text="date.getSeconds()"></span>
    <br />
    <button>-</button>
    <button>-</button>
    <button>-</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date:new Date(),
      hours:'',
      minutes:'',
      seconds:''
    };
  },
  methods: {
    getHoursAdd() {
    // this.data.getHours()++;
    },
    getMinutesAdd() {
      this.minutes = this.date.getMinutes()+1;
    },
    getSecondsAdd() {
      this.seconds = this.date.getSeconds()+1;
    },  
},
  mounted() {
     let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
      // console.log(_this.date.getHours());
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>