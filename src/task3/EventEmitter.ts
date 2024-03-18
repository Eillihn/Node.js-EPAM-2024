import { AnyArg, EventListener, EventName } from './types';

export default class EventEmitter {
  private listeners: { [key in EventName]?: EventListener[] } = {};

  addListener(eventName: EventName, fn: EventListener): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName]!.push(fn);
    } else {
      this.listeners[eventName] = [fn];
    }
  }

  on(eventName: EventName, fn: EventListener): void {
    this.addListener(eventName, fn);
  }

  removeListener(eventName: EventName, fn: EventListener): void {
    if (!this.listeners[eventName]) {
      return;
    }
    const index = this.listeners[eventName]!.findIndex(
      (listener: EventListener): boolean => listener === fn,
    );
    if (index > -1) {
      this.listeners[eventName]!.splice(index, 1);
    }
  }

  off(eventName: EventName, fn: EventListener): void {
    this.removeListener(eventName, fn);
  }

  once(eventName: EventName, fn: EventListener): void {
    const onceFn = () => {
      fn();
      this.removeListener(eventName, onceFn);
    };
    this.addListener(eventName, onceFn);
  }

  emit(eventName: EventName, ...args: AnyArg[]): void {
    this.listeners[eventName]?.forEach((listener: EventListener) =>
      listener(...args),
    );
  }

  listenerCount(eventName: EventName): number {
    return this.listeners[eventName]?.length || 0;
  }

  rawListeners(eventName: EventName): EventListener[] {
    return this.listeners[eventName] || [];
  }
}
