import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { LoginDTO, TokenResponse, UserModel } from '../shared/auth.data.transfer.object';
import { LoginService } from './login.service';
import { TokenService } from '../blueprint/auth.token.service';
import { UserStore } from '../blueprint/user.store.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPage implements OnInit {
  
  form!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastController: ToastController,
    private tokenService: TokenService,
    private userStore: UserStore,
  ) { }

  ngOnInit() {
    this.form = new LoginBuilderForm(this.formBuilder).createForm();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {

    const credentials: LoginDTO = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    let headers: HttpHeaders = new HttpHeaders({});

    this.loginService.login(credentials)
    .pipe(
      concatMap((response: TokenResponse) => {
        this.tokenService.setTokens(response);

        headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${response.accessToken}`
        });

        return this.loginService.getUser(headers);
      })
    )
    .subscribe({
      next: (user: UserModel) => {
        // Store service 
        this.userStore.setUserState(user); 
        this.router.navigate(['/tabs/tab1']);
        console.log(user);
      },
      error: (error: any) => {
        this.showErrorToast(error.message);
        console.log(error);
      }
    });
  }

  private showErrorToast(str: string) {

    const toast: Promise<HTMLIonToastElement> = this.toastController.create({
      animated: true,
      message: `${str}`,
      duration: 4000,
      buttons: [{
        role: 'cancel',
        text: 'Dismiss'
      }],
      color: 'danger'
    });

    toast.then((e: HTMLIonToastElement) => e.present());
  } 

  public cancel(): void {
    this.router.navigate([`register`]);
  }

}

class LoginBuilderForm {
  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      email: [``, [Validators.required, Validators.email]],
      password: [``, [Validators.required]]
    });
  };

}
