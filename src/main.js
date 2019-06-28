import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
// import Vuex from './stroe/store';
import plugin from './plugin/index';
import notice from './components/notice/notice';
import Vuex from './vuex/vuex';
import create from './utils/create.js';
import toast from './components/toast';
Vue.config.productionTip = false;
Vue.use(Vuex);

let store = new Vuex.Stroe({
  state: {
    count: 0
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
Vue.prototype.$notice = notice;
Vue.prototype.$toast = function (props) {
   return create(toast, props);
};

Vue.use(plugin);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
