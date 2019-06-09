// 1.支持vue.use
let Vue;
class Stroe {
    constructor (options = {}) {
        this.name = 'debug';
        // state需要Vue做响应式
        this.state = new Vue({
            data: options.state
        });
        // mutations 存储
        // commit执行mutations
        this.mutations = options.mutations || {};

        // actions 存储actions
        this.actions = options.actions;
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
}

function install (_Vue) {
    Vue = _Vue;
    // 由于Vue通过use挂载插件时，Vue还没初始化，因此这时拿不到this
    Vue.mixin({
        beforeCreate () {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    });
}

export default {
    Stroe,
    install
};
