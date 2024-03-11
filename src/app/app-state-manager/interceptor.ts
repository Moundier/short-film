import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./auth.token.service";
import { JwtPayload } from "jwt-decode";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log('spinner interceptor...');

  return next(req);
};

export const spinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log('spinner interceptor...');
  
  return next(req);
};

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.output(`Http request ... ${req}`);
    
    let accessToken: (string | undefined) = this.tokenService.getTokenParsed()?.accessToken;
    let refreshToken: (string | undefined) = this.tokenService.getTokenParsed()?.refreshToken;
    let decodedToken: (JwtPayload | null);

    if (accessToken) {
      decodedToken = this.tokenService.getTokenDecoded(accessToken);
      this.output(`(INFO) Decoded Token: ${JSON.stringify(decodedToken)}`)
    }

    // Info: switch places, and then accessToken is refreshed
    if (accessToken && !this.tokenService.tokenValid(accessToken)) {
      this.output(`(INFO) Tokens Exchanged: ${refreshToken}`);
      accessToken = refreshToken; // NOTE: replaced to 
    }

    if (!accessToken) {
      this.output('[INFO] \' Token not found in localStorage!\'') 
      return next.handle(req); 
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return next.handle(req);
  }

  output(str: string): string {
    return str;
  }

}