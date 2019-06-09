// 由于vue2.0中的$dispatch已废弃，可结合this.$parent自定义$boradcast，向上通知
export function $dispatch (eventName, data) {
    let parent = this.$parent;
    while (parent) {
        parent.$emit(eventName, data);
        parent = parent.$parent;
    }
}

function boradcast (eventName, data) {
    let children = this.$children;
    children.forEach(child => {
        child.$emit(eventName, data);
        if (child.$children.length) {
            boradcast.call(child, eventName, data);
        }
    });
}

// 由于vue2.0中的$broadcast已废弃，可结合this.$children自定义$boradcast，向下广播
export function $boradcast (eventName, data) {
    boradcast.call(this, eventName, data);
}

// 使用订阅发布者模式模仿vue的EnevtBus事件总线机制
export class Bus {
    constructor () {
        this.callbacks = {};
    }
    $on (name, fn) {
        // 监听
        this.callbacks[name] = this.callbacks[name] || [];
        this.callbacks[name].push(fn);
    }
    $emit (name, data) {
        if (this.callbacks[name]) {
            this.callbacks[name].forEach(fn => {
                fn && fn(data);
            });
        }
    }
}
