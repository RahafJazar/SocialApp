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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  // Temporary diagnostics: set false after investigating the phone result.
  private readonly debugLogin = true;
  errorMsg = '';
  loading = false;
  loginSub$ = new Subscription();
  loginForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    )]],
  });

  submitForm(): void {
    if (this.loading) return;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.errorMsg = '';
    this.loading = true;
    let receivedResponse = false;
    this.loginSub$ = this.authService.signIn(this.loginForm.getRawValue()).subscribe({
      next: (resp: UserDataResponse | null) => {
        receivedResponse = true;
        // This method handles its own synchronous and asynchronous failures.
        void this.finishLogin(resp);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = 'Login request failed. Please try again.';
        this.report(`HTTP ERROR\nstatus=${err?.status ?? 'unknown'}`);
      },
      complete: () => {
        // Completion must not clear loading before navigation has finished.
        if (!receivedResponse) {
          this.loading = false;
          this.errorMsg = 'Login completed without a response.';
          this.report('EMPTY RESPONSE: complete ran without next.');
        }
      },
    });
  }

  private async finishLogin(resp: UserDataResponse | null): Promise<void> {
    const trace: string[] = ['1. NEXT received'];
    let stage = 'response validation';
    try {
      const token = resp?.data?.token;
      const user = resp?.data?.user;
      const hasToken = typeof token === 'string' && token.trim().length > 0;
      const hasUser = !!user && typeof user === 'object' && !Array.isArray(user)
        && typeof user._id === 'string' && user._id.length > 0;
      trace.push(`success=${resp?.success === true}; tokenPresent=${hasToken}; userPresent=${hasUser}`);
      if (resp?.success !== true || !hasToken || !hasUser) {
        this.errorMsg = 'Login response was unsuccessful or missing session data.';
        this.report([...trace, 'STOP: invalid login response'].join('\n'));
        return;
      }

      stage = 'saving session';
      const serializedUser = JSON.stringify(user);
      const previousToken = localStorage.getItem('socialToken');
      const previousUser = localStorage.getItem('userData');
      try {
        localStorage.setItem('userData', serializedUser);
        localStorage.setItem('socialToken', token);
        if (localStorage.getItem('socialToken') !== token
          || localStorage.getItem('userData') !== serializedUser) {
          throw new Error('SessionReadbackFailed');
        }
      } catch (error) {
        // Restore the previous session if either write failed.
        try {
          previousToken === null ? localStorage.removeItem('socialToken')
            : localStorage.setItem('socialToken', previousToken);
          previousUser === null ? localStorage.removeItem('userData')
            : localStorage.setItem('userData', previousUser);
        } catch { /* Storage may be inaccessible; preserve the original failure. */ }
        throw error;
      }
      trace.push('2. Session saved and read back');

      stage = 'navigation';
      const navigated = await this.router.navigate(['/feed']);
      const atFeed = this.router.url.split('?')[0].split('#')[0] === '/feed';
      trace.push(`3. Navigation resolved=${navigated}; atFeed=${atFeed}`);
      if (!navigated || !atFeed) {
        this.errorMsg = 'Session saved, but navigation to the feed did not finish.';
      }
      this.report(trace.join('\n'));
    } catch (error: unknown) {
      this.errorMsg = `Login stopped during ${stage}.`;
      // Do not display raw responses, tokens, passwords, or user details.
      this.report([...trace, `STOP: ${stage}`, `errorType=${error instanceof Error ? error.name : typeof error}`].join('\n'));
    } finally {
      this.loading = false;
    }
  }

  private report(message: string): void {
    if (this.debugLogin) alert(message);
  }

  ngOnDestroy(): void {
    this.loginSub$.unsubscribe();
  }
}
