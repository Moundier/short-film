import { createAction, props, } from "@ngrx/store";
import { TokenResponse, UserModel } from "../shared/auth.data.transfer.object";

export const register = createAction(`[Auth] Register`, props<{ tokens: TokenResponse }>());
export const login = createAction(`[Auth] Login`, props<{ tokens: TokenResponse }>());

export const logout = createAction(`[Auth] Logout`);
export const sessionSet = createAction(`[Auth] Set user session`, props<{ user: UserModel }>());
export const tokenSet = createAction(`[Token] Access token`, props<{ tokens: TokenResponse }>());
