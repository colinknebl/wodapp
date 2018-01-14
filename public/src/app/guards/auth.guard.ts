import { Injectable }       from '@angular/core';
import { 
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }     from '@angular/router';
import { AuthService }      from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( 
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if (this.authService.tokenCheck()) {
      console.log('false');

      return false;
    }
    else {
      console.log('true');
      this.router.navigate(['/login']);
      return true;
    }
  
  }

}