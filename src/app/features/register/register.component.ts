import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  errorMsg: string = '';
  loading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl(''),//optional
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)])
  }, { validators: this.confirmPassword, updateOn: 'submit' })

  submitForm(): void {

    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this.loading = true
      //send data
      this.authService.signUp(this.registerForm.value).subscribe(
        {
          next: (resp) => {
            if (resp) {
              console.log(resp);
              //navigate  to login
              setTimeout(() => {
                this.router.navigate(['/login'])
              }, 1000);
            }

          }
          ,
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
            //show errors 
            this.errorMsg = err.error.message;
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
    const repassword = group.get('rePasseord')?.value;

    if (password != repassword) {
      group.get('rePassword')?.setErrors({ mismatch: true })
      return { mismatch: true }
    } else {

      //if password == repassword ===> ما تسوي اشي ورجع null
      return null;
    }


  }
}
