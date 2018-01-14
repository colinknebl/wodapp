import { Injectable }       from '@angular/core';
import { 
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }     from '@angular/router';
import { AuthService }      from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  /*
    If the user IS NOT logged in and you want to restrict routes, use this guard.
  */

  redirectUrl: string;

  constructor( 
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.tokenCheck()) {
      return true;
    }
    else {
      this.redirectUrl = state.url;
      console.log(this.redirectUrl, state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }
}