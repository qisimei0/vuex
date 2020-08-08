import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.导入组件文件
import Header from '../components/demo/Header.vue'
import Field from '../components/demo/Field.vue'
import Navbar from '../components/demo/Navbar.vue'
import Tabcontainer from '../components/demo/Tabcontainer.vue'
import List from '../components/demo/List.vue'
import Tabbar from '../components/demo/Tabbar.vue'
import Tabbar2 from '../components/demo/Tabbar2.vue'
import Infinite from '../components/demo/infinite.vue'
import Indicator from '../components/demo/Indicator.vue'
import Timer from '../components/demo/Timer.vue'
//项目
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Article from '../views/Article.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/infinite',
    component: Infinite
  },
  {
    path: '/indicator',
    component: Indicator
  },
  {
    path: '/timer',
    component: Timer
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/field',
    name: 'Field',
    component:Field    
  },
  {
    path: '/tabbar',
    name: 'Tabbar',
    component:Tabbar    
  },
  {
    path: '/tabbar2',
    component:Tabbar2    
  },
  {
    path: '/navbar',
    component:Navbar    
  },
  {
    path: '/list',
    name: 'List',
    component:List  
  },
  {
    path: '/tabcontainer',
    name: 'Tabcontainer',
    component:Tabcontainer    
  },
  {
    path: '/header',
    // name: '/Header',
    component:Header
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
