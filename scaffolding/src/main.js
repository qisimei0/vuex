import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
// 1)导入axios模块
import axios from 'axios'
import qs from 'qs'
// 1.导入Mint UI是node_modules里面的
import MintUI from 'mint-ui'
//2.导入Mint UI的样式表文件
import 'mint-ui/lib/style.min.css'
// 3.通过Vue.use()方法注册为插件
Vue.use(MintUI)
//2)配置axios的基础地址:http协议，所以服务器要是提供http的服务的express框架
// http://127.0.0.1:3000是服务器端基础地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 3)在原型链上扩展属性
Vue.prototype.axios = axios;
Vue.prototype.moment = moment;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
