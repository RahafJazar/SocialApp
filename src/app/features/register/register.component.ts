import { BtnLanguageComponent } from '../../shared/ui/btn-language/btn-language.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BtnLanguageComponent, TranslatePipe, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private fb = inject(FormBuilder);
  errorMsg: string = '';
  loading: boolean = false;
  registerSub$: Subscription = new Subscription();
  showPassword: boolean = false;
  showRepassword: boolean = false;
  registerForm: FormGroup = this.fb.nonNullable.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    username: [''],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    dateOfBirth: ['', [
      Validators.required
    ]],

    gender: ['', [
      Validators.required
    ]],

    password: ['', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ]],

    rePassword: ['', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ]]
  }, {
    validators: this.confirmPassword
  })

  /*
  = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl(''),//optional
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)])
  }, { validators: this.confirmPassword })
  */

  submitForm(): void {
    if (this.loading) return;
    this.errorMsg = "";

    if (this.registerForm.valid) {

      this.loading = true
      //send data
      //cancel previous subscription 
      this.registerSub$.unsubscribe();
      //create new subscription
      this.registerSub$ = this.authService.signUp(this.registerForm.value).subscribe(
        {
          next: (resp) => {
            if (resp) {

              //navigate  to login
              setTimeout(() => {
                this.router.navigate(['/login'])
              }, 1000);
            }

          }
          ,
          error: (err: HttpErrorResponse) => {

            //show errors 
            this.errorMsg = err.status === 0 ? 'ERRORS.NETWORK' : err.status === 409 ? 'ERRORS.CONFLICT' : 'AUTH.REGISTER.ERROR';
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }


        }
      )
    }
    else {
      //show all errors for the user 
      this.registerForm.markAllAsTouched()

    }


  }


  //custom validaton

  confirmPassword(group: AbstractControl) {
    //check if password !== repassword ==> set error in  the repassword control [mismatch]
    const password = group.get('password')?.value;
    const repassword = group.get('rePassword')?.value;

    if (password != repassword) {
      group.get('rePassword')?.setErrors({ mismatch: true })
      return { mismatch: true }
    } else {

      //if password == repassword ===> ما تسوي اشي ورجع null
      return null;
    }


  }


  //show or hide password
  togglePassword(elem: HTMLInputElement) {
    this.showPassword = !this.showPassword;

    if (this.showPassword) {
      elem.type = 'text';
    }
    else {
      elem.type = 'password'
    }
  }
  toggleRePassword(elem: HTMLInputElement) {
    this.showRepassword = !this.showRepassword;

    if (this.showRepassword) {
      elem.type = 'text';
    }
    else {
      elem.type = 'password'
    }
  }
}
