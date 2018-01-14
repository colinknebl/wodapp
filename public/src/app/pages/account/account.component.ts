import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  username: string;

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAccountInfo()
      .subscribe(account => {
        this.firstName = account.user.firstName;
        this.lastName = account.user.lastName;
        this.email = account.user.email;
        this.username = account.user.username;
      });
  }


}
