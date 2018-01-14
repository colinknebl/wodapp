import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private navService: NavService,
    private authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }

  navOpen() {
    this.navService.navAction('open nav');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
