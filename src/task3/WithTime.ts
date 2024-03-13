import * as console from 'console';
import EventEmitter from './EventEmitter.js';
import { AnyArg, AsyncFunction, EventName } from './types.js';

export default class WithTime extends EventEmitter {
  async execute(asyncFunc: AsyncFunction, ...args: AnyArg[]): Promise<void> {
    this.emit(EventName.BEGIN);
    const startTime = Date.now();
    try {
      const result = await asyncFunc(...args);
      this.emit(EventName.DATA, result);
    } catch (error) {
      console.error('Error:', error);
    }
    this.emit(EventName.END);
    console.log(`Execution time: ${Date.now() - startTime}ms`);
  }
}
