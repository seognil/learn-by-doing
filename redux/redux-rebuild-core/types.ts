interface BasicPayload {
  type?: any;
  [keys: string]: any;
}

export interface ActionPayload extends BasicPayload {}

export type Reducer<State, ActionPayload> = (state: State, action: ActionPayload) => State;

export type ReducerGroup<State = any, ActionPayload = any> = {
  [keys: string]: Reducer<any, BasicPayload>;
  // [Key in keyof State]: Reducer<State[Key], ActionPayload>;
};

export interface Store<State, ActionPayload> {
  getState: () => State;
  dispatch: (payload: ActionPayload) => void;
  subscribe: (observer: Function) => void;
}

export interface CreateStore {
  <State, RealPayload extends ActionPayload>(reducer: Reducer<State, RealPayload>): Store<
    State,
    RealPayload
  >;
}

export interface CombineReducers {
  <State, ActionPayload>(reducers: ReducerGroup<State, ActionPayload>): Reducer<
    State,
    ActionPayload
  >;
}
