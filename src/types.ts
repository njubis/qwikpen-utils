import type { QRL, Signal } from "@qwik.dev/core";

export type TargetParam<Param> = Pick<
  Param,
  Exclude<keyof Param, keyof EmitterParam>
> &
  Partial<EmitterParam>;

export interface EmitterParam {
  eventType: string;
  // currentTarget: Target;
  stop(): void;
}

export type OnEvent<Param> = EmitterParam & Param;

export type EventHash<Events> = Partial<{
  [Key in keyof Events]: Listener<Events[Key]>;
}>;

export type Listener<Param> = QRL<(e: OnEvent<Param>) => unknown>;

export interface EventOptions {
  once?: boolean;
}

export interface EventInfo<Param> extends Partial<EventOptions> {
  listener: Listener<Param>;
}

export interface UseEventEmitterOptions {
  /** Whether to stop executing remaining listeners after the first stop() call */
  shortCircuit?: boolean;
  /** DOM element to also emit events on (browser only) */
  domTarget?: Signal<Element> | "document" | "window";
  /** Node.js EventEmitter instance to also emit events on (server only) */
  nodeEmitter?: unknown; // EventEmitter type - keeping as any to avoid Node.js type dependency
}

// Event emitter API interface
export interface EventEmitterAPI<Events = Record<string, any>> {
  /** Add event listeners */
  on$<K extends keyof Events>(
    eventName: K,
    listener?: Listener<Events[K]>,
  ): Promise<EventEmitterAPI<Event>>;

  /** Remove event listeners */
  off$<K extends keyof Events>(
    eventName?: K,
    listener?: Listener<Events[K]>,
  ): Promise<EventEmitterAPI<Events>>;

  /** Add event listener that triggers only once */
  once$<K extends keyof Events>(
    eventName: K,
    listener: Listener<Events[K]>,
  ): Promise<EventEmitterAPI<Events>>;

  /** Emit event with data */
  emit$<K extends keyof Events>(
    eventName: K,
    param: TargetParam<Events[K]>,
  ): Promise<boolean>;
}
