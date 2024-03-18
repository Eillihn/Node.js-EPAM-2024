export enum EventName {
  INIT = 'init',
  STATUS = 'status',
  BEGIN = 'begin',
  END = 'end',
  DATA = 'data',
  DONE = 'done',
  EVENT_ONE = 'eventOne',
  EVENT_ONCE = 'eventOnce',
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type AnyArg = any;
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type AnyReturn = any;
export type AnyFunction = (...args: AnyArg[]) => AnyReturn;

export type EventListener = (...args: AnyArg[]) => void;
export type AsyncFunction = (...args: AnyArg[]) => Promise<AnyArg>;
