import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AuthActions from './auth.actions';
import { AuthState } from "./auth.reducer";
import { environment } from "./environment";
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { TokenResponse } from "../shared/auth.data.transfer.object";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private store: Store<AuthState>,
    private http: HttpClient,
    private router: Router
  ) { }

  getTokens(): string | null {
    return localStorage.getItem(environment.session_key);
  }

  setTokens(tokens: TokenResponse): void {
    localStorage.setItem(environment.session_key, JSON.stringify(tokens));
    this.store.dispatch(AuthActions.register({ tokens }));
  }

  removeToken(): void {
    localStorage.removeItem(environment.session_key);
    this.store.dispatch(AuthActions.logout());
  }

  getTokenParsed(): TokenResponse | null {
    const token: string | null = this.getTokens();
    let tranform: TokenResponse;

    if (token) {
      return tranform = JSON.parse(token); // TODO: this method transforms a string from localStorage into an TokenDTO
    }

    return null;
  }

  getTokenDecoded(token: string): JwtPayload | null {

    if (token) {
      return jwtDecode(token);
    }

    return null;
  }

  private API: string = 'http://localhost:9090';

  getRefreshedToken(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/refresh-token`, null);
  }

  setRefreshedToken(): void {

    let tokenResponse: TokenResponse = {
      accessToken: '', 
      refreshToken: ''
    };

    this.getRefreshedToken().subscribe({
      next: (response: TokenResponse) => {
        this.removeToken();
        tokenResponse = response;
        this.setTokens(tokenResponse);
      },
      error: (error: HttpErrorResponse) => { console.log(error.status); }
    });
  }

  tokenValid(token: string): boolean {

    const decodeToken: JwtPayload | null = jwtDecode(token)

    if (decodeToken?.exp) {
      return (decodeToken.exp * 1000) > (new Date().getTime());
    }

    return false;
  }

  sessionIsValid(): boolean {

    const accessToken: (string | undefined) = this.getTokenParsed()?.accessToken;
    const refreshToken: (string | undefined) = this.getTokenParsed()?.refreshToken;

    let accessTokenValid: boolean = false;
    let refreshTokenValid: boolean = false;
    const sessionHasFinished = (!accessTokenValid && !refreshTokenValid); 

    if (accessToken && refreshToken) {
      accessTokenValid = this.tokenValid(accessToken);
      refreshTokenValid = this.tokenValid(refreshToken);
    }

    if (accessTokenValid) {
      console.log(`(Token): access not expired. Continue navigation.`);
      return true; // Note: keep allowing access 
    }

    if (refreshTokenValid) {
      this.setRefreshedToken();
      console.log(`(Token) access token expired. Refresh access token.`); 
      return true; // Note: allow access to tabs pages
    }

    if (sessionHasFinished) {
      console.log(`(INFO) Tokens have expired. Session is terminated`); // Note: automatic logout
      this.router.navigate([`login`]);
      localStorage.removeItem(environment.session_key);
      return false; // Note: returns to login page
    }

    // this.router.navigate([`login`]); // NOTE: perform logout 

    return false; // Note: default return
  }

}
