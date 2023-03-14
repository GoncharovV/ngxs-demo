import { createSelector } from '@ngxs/store';


export interface LoadableStateType<T = unknown> {
    loading: boolean;
    error: string | null;
    entities: T;
}


export class BaseLoadableState {

    public static loading() {
        return createSelector([this], (state: LoadableStateType) => {
            return state.loading;
        })
    }

    public static entities<T>() {
        return createSelector([this], (state: LoadableStateType<T>) => {
            return state.entities;
        })
    }

}
