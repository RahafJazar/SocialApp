import { guestGuard } from './core/auth/guards/guest-guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { DetailsComponent } from './features/details/details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [guestGuard],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forgetPassword', component: ForgetPasswordComponent }
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'feed', pathMatch: 'full' },
            { path: 'feed', component: FeedComponent },
            { path: 'profile/:userId', component: ProfileComponent },
            { path: 'notifications', component: NotificationsComponent },
            { path: 'changePassword', component: ChangePasswordComponent },
            { path: 'details/:id', component: DetailsComponent },

        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }


];
