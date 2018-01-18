import { Injectable }             from '@angular/core';
import { 
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }           from '@angular/router';
import { AuthService }            from '../services/auth/auth.service';
import { FlashMessagesService } from '../services/flash-messages/flash-messages.service';

@Injectable()
export class AuthGuard implements CanActivate {

  /*
    If the user IS NOT logged in and you want to restrict routes, use this guard.
  */

  redirectUrl: string;

  constructor( 
    public authService: AuthService,
    public router: Router,
    public flashMessagesService: FlashMessagesService
  ) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.tokenCheck()) {
      return true;
    }
    else {
      this.flashMessagesService.sendMessage({
        message: 'Please log in to view page.',
        messageClass: 'alert',
        showMessageBool: true,
        messageDuration: 4000
      });



      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.flashMessagesService.sendMessage('Message from Home Component to App Component!');
  }

  clearMessage(): void {
    // clear message
    this.flashMessagesService.clearMessage();
  }
}