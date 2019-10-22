/*
 * @Author: jackson
 * @Date: 2019-06-28 21:39:13
 * @LastEditors: jackson
 * @LastEditTime: 2019-08-11 22:28:14
 */
/**
 * 理解vue-router实现原理，需要做的事情
 * 插件的实现
 * url变化监听
 * 路由配置解析
 * 实现全局组件：router-link，router-view
 */
let _Vue;
class VueRouter {
    // 实例化router的时候传递的配置选项
    constructor (options) {
        this.options = options;
        this.routeMap = {};

        // 利用vue响应式来实现路由响应式，与vue强绑定，只能用在vue中
        this.app = new _Vue({
            data () {
                return {
                    current: '/'
                };
            }
        });
    }

    init () {
        this.bindEvents(); // 监听url变化
        this.createRouteMap(this.options); // 解析路由配置
        this.initComponent(); // 实现两个组件router-view router-link
    }

    bindEvents () {
        window.addEventListener('load', this.onHashChange.bind(this)); // 页面加载完执行，通过bind改变this指向
        window.addEventListener('hashchange', this.onHashChange.bind(this)); // hash变化时执行
    }

    onHashChange () {
        this.app.current = window.location.hash.slice(1) || '/';
    }

    // 生成路由映射表
    createRouteMap (options) {
        options.routes.forEach(item => {
            this.routeMap[item.path] = item.component;
        });
    }

    // 实现router-view、router-link组件
    initComponent () {
        _Vue.component('krouter-link', {
            props: {
                to: String
            },
            render (h) {
                return h('a', {
                    attrs: {
                        href: '#' + this.to
                    }
                }, [
                    this.$slots.default
                ]);
            }
        });

        _Vue.component('krouter-view', {
            // 利用箭头函数将使得render函数中的this指向VueRouter实例
            render: (h) => {
                const comp = this.routeMap[this.app.current];
                return h(comp);
            }
        });
    }
}
VueRouter.install = function (Vue) {
    _Vue = Vue;
    //  混入
    Vue.mixin({
        beforeCreate () {
            // console.log(this);
            // this是vue实例
            if (this.$options.KRouter) {
                // 仅在根组件执行一次
                Vue.prototype.$krouter = this.$options.KRouter;
                this.$options.KRouter.init();
            }
        }
    });
};

export default VueRouter;
