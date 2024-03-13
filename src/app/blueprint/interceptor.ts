import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenService } from "./auth.token.service";
import { JwtPayload } from "jwt-decode";

export let authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log('Auth interceptor...');

  // If valid, send access token in header; else, send refresh 

  const tokenService: TokenService = inject(TokenService);

  let accessToken: (string | undefined) = tokenService.getTokenParsed()?.accessToken;
  let refreshToken: (string | undefined) = tokenService.getTokenParsed()?.refreshToken;
  let decodedToken: (JwtPayload | null);

  if (accessToken) {
    decodedToken = tokenService.getTokenDecoded(accessToken);
    console.log(`(INFO) Decoded Token: ${JSON.stringify(decodedToken)}`)
  }

  if (accessToken && !tokenService.tokenValid(accessToken)) {
    console.log(`(INFO) Access Token: `, JSON.stringify(tokenService.getTokenDecoded(accessToken)));
    accessToken = refreshToken; // NOTE: token exchange to send both in the header
  }

  if (!accessToken) {
    console.log('(INFO) Token not found');
    return next(req);
  }

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(req);
};
