import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router  
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
      fullName: [``, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      hostMail: [``, [Validators.required, Validators.email]],
      phoneNum: [``, []],
      password: [``, [Validators.required, Validators.minLength(5), Validators.maxLength(50), RegisterValidators.validatePattern, RegisterValidators.passwordLimiter]],
      validate: [``, [Validators.required, Validators.minLength(5), Validators.maxLength(50), RegisterValidators.passwordTheSame]],
      termsTimestamp: [false, [Validators.required]],
      termsCheckbox: [false, [RegisterValidators.isRequired]],
      consetCheckbox: [false, [RegisterValidators.isRequired]]

    });
  }
}

class RegisterValidators {

  static isRequired(control: AbstractControl) {
    const term: string = control.value;
    if (!term) return { acceptTerm: false }
    return;
  }

  static passwordLimiter(minValue: number) {
    return (control: AbstractControl) => {
      const field = control.value;
      if (field <= minValue) return { NotGreaterThan: { minValue: minValue } };
      else return null
    }
  }

  static validatePattern(control: FormControl) {
    const password: string = control.value;

    const hasNumericDigitRegex = "(?=.*[0-9])";
    const hasLetterRegex = "(?:(?=.*[A-Z])|(?=.*[a-z]))";

    let pattern = `^${hasNumericDigitRegex}${hasLetterRegex}`; // Combine regexes

    if (!password.match(pattern)) {
      return {
        PasswordHasNotNumberOrString: true
      };
    }

    return;
  }

  static passwordTheSame(control: AbstractControl) {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ ConfirmPassword: true });
    }
  }

}