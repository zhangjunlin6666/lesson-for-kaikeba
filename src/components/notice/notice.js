import Message from './message';

let instance;

function notice ({ duration = 1.5, content = '' }) {
    instance = instance || Message.newInstancd();
    instance.add({
        duration,
        content
    });
};

export default {
    info (options) {
        notice(options);
    }
};
