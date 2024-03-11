import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "./auth.token.service";
import { Injector, inject } from "@angular/core";
import { ToastController } from '@ionic/angular';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {

  // Info: prevent or allow access to routes
  const injector: Injector = inject(Injector);
  const router: Router = inject(Router);

  const tokenService: TokenService = inject(TokenService);
  const toastController = injector.get(ToastController);

  if (false === tokenService.sessionIsValid()) {

    console.log(`[Auth Guard] Session has expired. Please login again.`)

    router.navigate([`login`]);

    const toast: Promise<HTMLIonToastElement> = toastController.create({
      animated: true,
      message: 'Session has expired, please login again.',
      duration: 4000,
      buttons: [{
        role: 'cancel',
        text: 'Dismiss'
      }],
      color: 'danger'
    });

    toast.then((e: HTMLIonToastElement) => e.present());
  }

  return tokenService.sessionIsValid(); // NOTE: depends on token storage and token 
}

class GuardService {
  
  constructor(
    private toastController: ToastController
  ) { }

  async presentToast(text: string, responseType: boolean) {

    const toast = await this.toastController.create({
      message: text,
      color: responseType ? 'danger' : 'success', // Either Error or Successful from the Server
      duration: 2000, // Duration in milliseconds
      position: 'top',
      animated: true,
    });
    await toast.present();
  }
}