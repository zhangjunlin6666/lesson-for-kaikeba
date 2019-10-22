/*
 * @Author: jackson
 * @Date: 2019-05-30 11:31:19
 * @LastEditors: jackson
 * @LastEditTime: 2019-08-11 22:54:04
 */
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './stroe'; // 官网vuex
import router from './router'; // 官网router
import plugin from './plugin/index'; // 自定义插件

Vue.use(ElementUI);
Vue.use(plugin);
Vue.config.productionTip = false;

// 定义在prototype上的组件
import notice from './components/notice/notice';
import create from './utils/create.js';
import toast from './components/toast';
Vue.prototype.$notice = notice;
Vue.prototype.$toast = function (props) {
   return create(toast, props);
};

// 自定义的vuex
import Kvuex from './kvuex';
Vue.use(Kvuex);
let Kstore = new Kvuex.Stroe({
  state: {
    count: 0
  },
  getters: {
    score (state) {
      return state.count + 1; // 有问题需要看源码学习其原理
    }
  },
  mutations: {
    setCount (state, arg) {
      if (!arg) {
        state.count++;
      } else {
        state.count += arg;
      }
    }
  },
  actions: {
    setCountMore ({ commit, state }, arg) {
      setTimeout(() => {
        commit('setCount', arg);
      }, 1000);
    }
  }
});

// 自定义的router
import Krouter from "./krouter";
import Home from './views/krouter/Home';
import About from './views/krouter/About';
Vue.use(Krouter);
let KRouter = new Krouter({
  routes: [
    {
      path: '/khome',
      component: Home
    },
    {
      path: '/kabout',
      component: About
    }
  ]
});
console.log(router.match('/home')); // 相当于在组件中调用this.$route一样，返回的内容是一样的
console.log(router.history);
new Vue({
  router,
  store,
  Kstore,
  KRouter,
  render: h => h(App)
}).$mount('#app');
