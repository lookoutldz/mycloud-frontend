import {ref} from "vue";

/**
 * 事件总线
 */
class EventBus {
    constructor() {
        // 收集订阅信息,调度中心
        this.eventList = {}// 事件列表，这项是必须的
            // 下面的都是自定义值
        this.msg = ref('这是一条总线的信息')
    }

    // 订阅
    $on(name, fn) {
        this.eventList[name] = this.eventList[name] || []
        this.eventList[name].push(fn)
    }

    // 发布
    $emit(name, data) {
        if (this.eventList[name]) {
            this.eventList[name].forEach((fn) => {
                fn(data)
            });
        }
    }

    // 取消订阅
    $off(name) {
        if (this.eventList[name]) {
            delete this.eventList[name]
        }
    }
}
export default new EventBus()
