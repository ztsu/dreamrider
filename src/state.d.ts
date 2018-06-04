import "./state";

export interface Params<S> {
    state: S;
}

export interface Result<S> {
    state: S;
}

export interface Fn<S> {
    (params: Params<S>): Result<S>;
}

export interface ConenctedFunctions<S> {
    apply(...fn: Fn<S>[]): () => void;
    subscribe(listener: (state: S) => void): void;
    getState(): S;
}

export interface Initiator {
    <S>(initial: S): ConenctedFunctions<S>
}

export const init: Initiator