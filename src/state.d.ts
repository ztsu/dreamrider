import "./state";

export interface Params<S> {
    state: S;
}

export interface Result<S> {
    state: S;
}

export interface ParamsThunk<S> {
    apply: Apply<S>;
}

type ResultThunk = void

type Fn<S> =  ((parmas: Params<S>) => Result<S>) | ((params: ParamsThunk<S>) => ResultThunk)

export interface Apply<S> {
    (...fn: Fn<S>[]): () => void;
}

export interface Listener<S> {
    (state: S): void
}

export interface ConenctedFunctions<S> {
    apply: Apply<S>;
    subscribe(listener: Listener<S>): void;
    getState(): S;
}

export interface Initiator {
    <S>(initial: S): ConenctedFunctions<S>
}

export const init: Initiator