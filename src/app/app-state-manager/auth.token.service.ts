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

    if (accessToken && refreshToken) {
      accessTokenValid = this.tokenValid(accessToken);
      refreshTokenValid = this.tokenValid(refreshToken);
    }

    if (accessTokenValid) {
      console.log(`INFO: Token not expired. Continue navigation.`);
      // TODO: redirect to tabs
      return true; // NOTE: allow access to tabs pages
    }

    if (refreshTokenValid) {

      console.log(`(INFO) Access Token expired. Refresh Token refreshed Access Token.`); 
      
      let tokenDTO: TokenResponse = {
        accessToken: '', 
        refreshToken: ''
      };

      // ERROR: make const again, not let

      this.getRefreshedToken().subscribe({
        next: (response: TokenResponse) => {
          tokenDTO = response;
          console.log(`Refresh: ${JSON.stringify(tokenDTO)}`);

          this.removeToken();
          this.setTokens(tokenDTO);
        },
        error: (error: HttpErrorResponse) => console.log(error.status)
      });

      return true; // NOTE: allow access to tabs pages
    }

    if (!accessTokenValid && !refreshTokenValid) {
      console.log(`(INFO) Tokens have expired. Session is terminated`); // NOTE: session logout
      localStorage.removeItem(environment.session_key);
      // TODO: perform session logout
      // TODO: session expired message
      return false; // NOTE: returns to login page
    }

    this.router.navigate([`login`]); // NOTE: perform logout 

    return false; // INFO: just default value
  }

}
