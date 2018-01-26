import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {

  constructor(
    public navService:NavService,
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }

  navClose() {
    this.navService.navAction('close nav');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
