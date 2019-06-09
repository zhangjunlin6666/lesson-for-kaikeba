import * as Emitter from './../emitter/index';
export default function install (Vue, options) {
    Vue.prototype.$dispatch = Emitter.$dispatch;
    Vue.prototype.$boradcast = Emitter.$boradcast;
}
