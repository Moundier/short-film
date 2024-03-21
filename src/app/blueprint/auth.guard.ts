import { ActivatedRouteSnapshot, CanActivateFn, GuardsCheckStart, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "./auth.token.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  // Prevents or Allows Access

  const isDeactivated: boolean = true;

  if (isDeactivated) {
    console.log(`(Guard) disabled for testing.`);
    return true;
  }

  console.log(`(Guard) enabled on production.`);

  const tokenService: TokenService = inject(TokenService); // Prevent or allow access to routes 

  return tokenService.sessionIsValid(); // Note: depends on token storage and token 
}