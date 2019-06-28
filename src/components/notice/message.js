import Notice from './notice.vue';
import Vue from 'vue';
let Main = Vue.extend(Notice);
export default {
    newInstancd: prototypies => {
        let props = prototypies || {};
        let instance = new Main({
            data: props
        });

        let component = instance.$mount();
        document.body.appendChild(component.$el);
        return {
            add (options) {
                instance.add(options);
            },
            remove (name) {
                instance.remove(name);
            }
        };
    }
};
