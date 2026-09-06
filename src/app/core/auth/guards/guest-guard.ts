import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const socialToken = localStorage.getItem("socialToken");
  const router = inject(Router);
  //check on token
  // if we have token ->  and try to go to login -> retiurn to feed
  // if we  don't have token ->go to token  
  if (socialToken) {
    router.createUrlTree(['/feed']);

  }
  return true;
};
