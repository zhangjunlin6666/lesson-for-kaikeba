import Vue from 'vue';
let instances = [];
export default function create (component, props) {
    // 先创建实例，$mount不传值时，会将模版渲染为文档之外的元素，需要手动插入到文档中，如body
    const vm = new Vue({
        render (h) {
            return h(component, { props });
        }
    }).$mount();
    // vm.$el返回的是真实的dom元素
    document.body.appendChild(vm.$el);
    const comp = vm.$children[0];
    // 动态计算当前组件的top值
    instances.forEach(item => {
        item.top += item.$el.offsetHeight + 20;
    });
    // 将当前的instance存入数组
    instances.push(comp);
    comp.remove = function () {
        // 当前组件销毁后，需要将该组件从instances中删除
        instances.forEach((item, index) => {
            if (item === comp) {
                instances.splice(index, 1);
            }
        });
        document.body.removeChild(vm.$el);
        vm.$destroy();
    };
    return comp;
}
