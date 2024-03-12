import { ActivatedRouteSnapshot, CanActivateFn, GuardsCheckStart, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "./auth.token.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const tokenService: TokenService = inject(TokenService); // Prevent or allow access to routes 

  return tokenService.sessionIsValid(); // Note: depends on token storage and token 
}
