import { Injectable }           from '@angular/core';
import { CanActivate, Router }  from '@angular/router';
import { AuthService }          from '../services/auth/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  /*
    If the user IS logged in and you want to restrict routes, use this guard.
  */

  constructor( 
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if (this.authService.tokenCheck()) {
      this.router.navigate(['/account']);
      return false;
    }
    else {
      return true;
    }
  }
}