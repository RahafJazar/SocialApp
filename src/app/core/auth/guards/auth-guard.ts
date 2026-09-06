import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  //check on token
  // if we have token -> true(go)
  // if we  don't have token ->false (don't go)
  const socialToken = localStorage.getItem("socialToken");

  if (!socialToken) {
    router.createUrlTree(['/login']);

    return false
  }

  return true;
};
