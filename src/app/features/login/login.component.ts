import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { UserDataResponse } from '../../core/models/user-data.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { BtnLanguageComponent } from '../../shared/ui/btn-language/btn-language.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ɵInternalFormsSharedModule, ReactiveFormsModule, TranslatePipe, BtnLanguageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private fb = inject(FormBuilder);
  errorMsg: string = '';
  loading: boolean = false;
  loginSub$: Subscription = new Subscription();
  loginForm: FormGroup = this.fb.nonNullable.group({

    email: ['', [
      Validators.required,
      Validators.email
    ]],



    password: ['', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ]],

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

    if (this.loginForm.valid) {
      console.log(this.loginForm);
      this.loading = true
      //   //send data
      //   //cancel previous subscription 
      this.loginSub$.unsubscribe();
      //   //create new subscription
      this.loginSub$ = this.authService.signIn(this.loginForm.value).subscribe(
        {
          next: (resp: UserDataResponse) => {
            if (resp.success) {
              console.log(resp);
              localStorage.setItem("socialToken", resp.data.token);
              localStorage.setItem("userData", JSON.stringify(resp.data.user));

              //navigate to feed
              this.router.navigate(['/feed']);
            }

          }
          ,
          error: (err: HttpErrorResponse) => {
            console.log('FULL ERROR:', err);
            console.log('ERROR BODY:', err.error);

            this.errorMsg = err.error?.message ?? 'Something went wrong';
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
      this.loginForm.markAllAsTouched()

    }


  }

}


