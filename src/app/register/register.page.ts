import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './register.service';
import { RegisterDTO, TokenDTO } from '../shared/auth.data.transfer.object';
import { HttpResponse } from '@capacitor/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  public form!: FormGroup;
  public showPassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new RegisterPageForm(this.formBuilder).createForm();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword; // show and hide password
  }

  // hashPassword(password: string): string {
  //   return crypto.SHA256(password).toString(crypto.enc.hex);
  // }

  register(): void {

    const register: RegisterDTO = {
      firstName: this.form.get('firstName')?.value,
      lastName: "",
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    console.log(register);

    this.authService.register(register).subscribe({
      next: (response: TokenDTO): void => {
        console.log(response);
        // this.tokenService.setTokens(response); // The token should be passed to AuthInterceptor
        // this.handleSuccess();
        this.router.navigate([`tabs/tab1`]);
      },
      error: (error: HttpResponse) => {
        console.log(error);
      }
    });
  }

  routeToLogin(): void {
    this.router.navigate([`login`]);
  }
}

class RegisterPageForm {

  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: [``, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      lastName: [``, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: [``, [Validators.required, Validators.email,]],
      password: [``, [Validators.required, Validators.minLength(5), Validators.maxLength(50),]],
      validate: [``, [Validators.required, Validators.minLength(5), Validators.maxLength(50), ]],
    });
  }
}
