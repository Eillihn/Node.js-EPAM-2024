import EventEmitter from '../EventEmitter';
import { EventName } from '../types';

export default function (): void {
  const myEmitter = new EventEmitter();

  function c1() {
    console.log('an event occurred!');
  }

  function c2() {
    console.log('yet another event occurred!');
  }

  myEmitter.on(EventName.EVENT_ONE, c1); // Register for eventOne
  myEmitter.on(EventName.EVENT_ONE, c2); // Register for eventOne

  // Register eventOnce for one time execution
  myEmitter.once(EventName.EVENT_ONCE, () =>
    console.log('eventOnce once fired'),
  );
  myEmitter.once(EventName.INIT, () => console.log('init once fired'));

  // Register for 'status' event with parameters
  myEmitter.on(EventName.STATUS, (code, msg) =>
    console.log(`Got ${code} and ${msg}`),
  );

  myEmitter.emit(EventName.EVENT_ONE);

  // Emit 'eventOnce' -> After this the eventOnce will be
  // removed/unregistered automatically
  myEmitter.emit(EventName.EVENT_ONCE);

  myEmitter.emit(EventName.EVENT_ONE);
  myEmitter.emit(EventName.INIT);
  myEmitter.emit(EventName.INIT); // Will not be fired
  myEmitter.emit(EventName.EVENT_ONE);
  myEmitter.emit(EventName.STATUS, 200, 'ok');

  // Get listener's count
  console.log(myEmitter.listenerCount(EventName.EVENT_ONE));

  // Get array of rawListeners//
  // Event registered with 'once()' will not be available here after
  // emit has been called
  console.log(myEmitter.rawListeners(EventName.EVENT_ONE));

  // Get listener's count after remove one or all listeners of EventName.EVENT_ONE
  myEmitter.off(EventName.EVENT_ONE, c1);
  console.log(myEmitter.listenerCount(EventName.EVENT_ONE));
  myEmitter.off(EventName.EVENT_ONE, c2);
  console.log(myEmitter.listenerCount(EventName.EVENT_ONE));
}
