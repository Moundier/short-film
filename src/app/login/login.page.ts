import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginDTO, TokenResponse } from '../shared/auth.data.transfer.object';
import { LoginService } from './login.service';
import { TokenService } from '../app-state-manager/auth.token.service';

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
    private tokenService: TokenService
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

    this.loginService.login(credentials).subscribe({
      next: (response: TokenResponse) => {
        console.log(response);
        this.tokenService.setTokens(response);
        this.router.navigate([`/tabs/tab1`]);
      },
      error: async (error: HttpErrorResponse) => {

        const toast: Promise<HTMLIonToastElement> = this.toastController.create({
          animated: true,
          message: 'Error on purpose',
          duration: 4000,
          buttons: [{
            role: 'cancel',
            text: 'Dismiss'
          }],
        });

        toast.then((e: HTMLIonToastElement) => e.present());

        console.log(error);
      }
    });
  }

  cancel(): void {
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
