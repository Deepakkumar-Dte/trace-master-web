export default class EventEmitter {
  eventMap: Map<string, any[]> = new Map();
  constructor() {}
  on(eventName: string, cb: (data: any) => Promise<any> | any) {
    const cbs = this.eventMap.get(eventName) || [];
    cbs.push(cb);
    this.eventMap.set(eventName, cbs);
  }
  emit(eventName: string, data: any) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.get(eventName)?.forEach((cb) => {
        cb(data);
      });
    }
  }
}
