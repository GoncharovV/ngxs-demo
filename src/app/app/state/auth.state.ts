import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthApiService, AuthData } from '../services/auth-api.service';
import { AuthActions } from './auth.actions';

type AuthStateType = AuthData | null;

@State<AuthStateType | null>({
    name: 'auth',
    defaults: null,
})
@Injectable()
export class AuthState {

    public constructor(
        private readonly authApi: AuthApiService,
    ) {}

    @Selector()
    public static token(state: AuthStateType) {
        return state?.token ?? null;
    }

    @Selector()
    public static isAuthorized(state: AuthStateType) {
        return Boolean(state?.token);
    }

    @Action(AuthActions.Login)
    public async login(ctx: StateContext<AuthStateType>, { data }: AuthActions.Login) {
        const authData = await this.authApi.login(data);

        ctx.setState(authData);
    }

    @Action(AuthActions.Logout)
    public async logout(ctx: StateContext<AuthStateType>) {
        await this.authApi.logout();

        ctx.setState(null);
    }

}
