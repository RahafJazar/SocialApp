import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { UserDataResponse } from '../../core/models/user-data.interface';
import { BtnLanguageComponent } from '../../shared/ui/btn-language/btn-language.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, TranslatePipe, BtnLanguageComponent],
  templateUrl: './login.component.html', styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  errorMsg = '';
  loading = false;
  loginSub$ = new Subscription();
  loginForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]]
  });

  submitForm(): void {
    if (this.loading) return;
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.errorMsg = '';
    this.loading = true;
    let received = false;
    this.loginSub$ = this.authService.signIn(this.loginForm.getRawValue()).subscribe({
      next: (response: UserDataResponse) => { received = true; void this.finishLogin(response); },
      error: (error: HttpErrorResponse) => {
        this.errorMsg = error.status === 0 ? 'ERRORS.NETWORK' : 'AUTH.LOGIN.ERROR_FALLBACK';
        this.loading = false;
      },
      complete: () => {
        if (!received) { this.errorMsg = 'AUTH.LOGIN.ERROR_FALLBACK'; this.loading = false; }
      }
    });
  }

  private async finishLogin(response: UserDataResponse): Promise<void> {
    let stage = 'validation';
    try {
      if (!response?.success || !response.data?.token || !response.data?.user?._id) {
        this.errorMsg = 'AUTH.LOGIN.ERROR_FALLBACK'; return;
      }
      stage = 'storage';
      const previousToken = localStorage.getItem('socialToken');
      const previousUser = localStorage.getItem('userData');
      try {
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        localStorage.setItem('socialToken', response.data.token);
      } catch (error) {
        try {
          previousToken === null ? localStorage.removeItem('socialToken') : localStorage.setItem('socialToken', previousToken);
          previousUser === null ? localStorage.removeItem('userData') : localStorage.setItem('userData', previousUser);
        } catch {}
        throw error;
      }
      stage = 'navigation';
      if (!await this.router.navigate(['/feed'])) this.errorMsg = 'ERRORS.NAVIGATION';
    } catch {
      this.errorMsg = stage === 'storage' ? 'ERRORS.STORAGE' : stage === 'navigation' ? 'ERRORS.NAVIGATION' : 'AUTH.LOGIN.ERROR_FALLBACK';
    } finally { this.loading = false; }
  }

  ngOnDestroy(): void { this.loginSub$.unsubscribe(); }
}
