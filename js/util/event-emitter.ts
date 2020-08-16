// * https://github.com/primus/eventemitter3
// * https://nodejs.org/api/events.html

// * ------------------------------------------------ EventEmitter simple

class EventEmitter {
  private handlers: Record<string, Function[]> = {};
  on(event: string, handler: Function) {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event].push(handler);
  }
  off(event: string, handler?: Function) {
    if (!handler) {
      this.handlers[event] = [];
    } else {
      this.handlers[event] = this.handlers[event].filter((fn) => fn !== handler);
    }

    if (!this.handlers[event]) delete this.handlers[event];
  }
  emit(event: string, data: any) {
    if (!this.handlers[event]) return;

    this.handlers[event].forEach((fn) => fn(data));
  }
}

// * ------------------------------------------------ usage

{
  const bus = new EventEmitter();

  bus.on('radio', (e: number) => console.log('log1', e));

  const handler = (e: number) => console.log('log2', e);
  bus.on('radio', handler);

  console.log('--------');

  bus.emit('radio', 333);
  bus.emit('useless', 333);

  console.log('--------');

  bus.off('radio', handler);
  bus.emit('radio', 666);

  console.log('--------');

  bus.off('useless');
  bus.off('radio');
  bus.emit('radio', 999);

  console.log('--------');
}
