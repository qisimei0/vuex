import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 用于存储Vue各个组件中共享的数据
  state: {
    username: 'Tom',
    age: 23,
    sex: true,
    products: [
      {
        id: 1,
        productName: '商品1',
        salePrice:2389.25
      },
      {
        id: 2,
        productName: '商品2',
        salePrice:2289.25
      },
      {
        id: 3,
        productName: '商品3',
        salePrice:2689.25
      },
      {
        id: 4,
        productName: '商品4',
        salePrice:4389.25
      },
      {
        id: 5,
        productName: '商品5',
        salePrice:3389.25
      },
    ]
  },
  getters: {
    // 获取商品的数量---这些方法被认为是state的计算属性
    // state参数代表当前store中的state(其实名字可以为任意合法名称)
    productNum(state) {
      return state.products.length;
    }
  },
  mutations: {
    // 增加年龄
    // state参数代表当前store的state的数据
    // 其名称可以是任意的合法名称，建议使用state
    add_age_mutation(state) {
      state.age += 1;
    },
    reduce_age_mutation(state) {
      state.age -= 1;
    },
    // playload译为载荷，就是参数(其类型可以为任意数据类型)
    add_product_mutation(state,payload) {
      state.products.push(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})
