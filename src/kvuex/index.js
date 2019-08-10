/*
 * @Author: jackson
 * @Date: 2019-06-06 15:15:55
 * @LastEditors: jackson
 * @LastEditTime: 2019-08-10 20:08:18
 */
/*
1.支持vue.use
2.实现4个东西：state/mutations/actions/getters
3.数据响应式，利用vue的响应式系统，强依赖vue
4.创建stroe类
*/
let Vue;
class Stroe {
    constructor (options = {}) {
        this.name = 'debug';
        // state需要Vue做响应式，所以vuex只适合与vue结合使用
        this.state = new Vue({
            data: options.state
        });
        // mutations 存储
        // commit执行mutations
        this.mutations = options.mutations || {};

        // actions 存储actions
        this.actions = options.actions;

        // getters 自己实现的
        // let getters = options.getters || {};
        // this.getters = {};
        // for (let i in getters) {
        //     this.getters[i] = getters[i](this.state);
        // }

        // 视频实现的
        options.getters && this.handleGetters(options.getters);
    }

    commit = (type, arg) => {
        if (!this.mutations[type]) {
            return false;
        }
        this.mutations[type](this.state, arg);
    }

    dispatch = (type, arg) => {
        if (!this.actions[type]) {
            return false;
        }
        this.actions[type]({
            state: this.state,
            commit: this.commit
        }, arg);
    }

    handleGetters (getters) {
        this.getters = {};
        Object.keys(getters).forEach(key => {
            // 为this.getters定义若干属性，这些属性是只读的，通过Object.defineProperty的访问器属性get实现
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state);
                }
            });
        });
    }
}

function install (_Vue) {
    Vue = _Vue;
    // 由于Vue通过use挂载插件时，Vue还没初始化，因此这时拿不到this
    Vue.mixin({
        beforeCreate () {
            if (this.$options.Kstore) {
                Vue.prototype.$kstore = this.$options.Kstore;
            }
        }
    });
}

export default {
    Stroe,
    install
};
