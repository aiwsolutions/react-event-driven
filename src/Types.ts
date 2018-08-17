export type Consumer<T> = (t: T) => void;

export type Supplier<T> = () => T;

export type Function<T, R> = (t: T) => R;

export type Predicate<T> = (t: T) => boolean;

export type BiConsumer<T, U> = (t: T, u: U) => void;

export type BiFunction<T, U, R> = (t: T, u: U) => R;

export type BiPredicate<T, U> = (t: T, u: U) => boolean;

export interface Event {
    name: string;
    payload: any;
}

export type Emitter = Consumer<Event>;

export type Listener = BiConsumer<string, Consumer<Event>>;

export type Reducer = BiFunction<object, Event, object>;

export interface MessageBus {
    emit: Emitter;
    listen: Listener;
    remove: Listener;
}

export interface StateContainer {
    getState: Supplier<object>;
    reduce: Reducer;
}
