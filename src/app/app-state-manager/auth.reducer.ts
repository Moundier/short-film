import { createReducer, on } from "@ngrx/store";
import { TokenResponse, UserModel } from "../shared/auth.data.transfer.object";
import * as AuthActions from './auth.actions'

export interface AuthState {
    isAuthenticated: boolean;
    token: TokenResponse | null;
    user: UserModel | null;
}

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
}

export const authReducer = createReducer(
    initialAuthState,

    on(AuthActions.login, (state: AuthState, { tokens }) => ({ ...state, isAuthenticated: true, tokens, })),

    on(AuthActions.logout, (state: AuthState) => ({ ...state, isAuthenticated: false, token: null })),

    on(AuthActions.sessionSet, (state: AuthState, { user: UserModel }) => ({ ...state, isAuthenticated: true, user: UserModel })),

    on(AuthActions.tokenSet, (state: AuthState, { tokens }) => ({ ...state, isAuthenticated: false, tokens, })),
)
