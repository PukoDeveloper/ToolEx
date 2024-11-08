var ToolEx = ToolEx || {};
ToolEx.EventObject = true;

class EventObject {
    constructor() {
        this.events = {};
    }
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    once(event, callback) {
        const onceCallback = (...args) => {
            callback(...args);
            this.off(event, onceCallback);
        };
        this.on(event, onceCallback);
    }
    off(event, callback) {
        if (!this.events[event]) {
            return;
        }
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
    emit(event, ...args) {
        if (!this.events[event]) {
            return;
        }
        const e = {
            "type": event,
            "break": false,
            "returnValue": undefined
        }
        for (const callback of this.events[event]) {
            callback(e, ...args);
            if (e.break) {
                break;
            }
        }
        return e;
    }
    emitAsync(event, ...args) {
        return new Promise((resolve, reject) => {
            if (!this.events[event]) {
                reject('Event not found.');
                return;
            }
            const e = {
                "type": event,
                "break": false,
                "returnValue": undefined
            }
            for (const callback of this.events[event]) {
                callback(e, ...args);
                if (e.break) {
                    break;
                }
            }
            resolve(e);
        });
    }
    clear(event = undefined) {
        if (event) {
            this.events[event] = [];
        } else {
            this.events = {};
        }
    }
}