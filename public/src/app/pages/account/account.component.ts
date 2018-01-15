import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserModel } from '../../models/user';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user: any;
  public filler: string = 'filler';
  public form: FormGroup;
  public editFormBool: boolean;



  constructor( 
    private User: UserModel,
    private authService: AuthService,
    private router:Router,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      maxSquat: null,
      maxDead: null,
      maxSnatch: null,
      maxBench: null,
      murphTime: null,
      dianeTime: null,
      dtTime: null,
      badgerTime: null
    })
  }

  ngOnInit() {
    this.form.disable();

    // USING TESTING URL IN AUTH.SERVICE
    this.authService.getAccountInfo()
      .subscribe(account => {
        console.log('account',account);
        console.log('this.user1', this.user)

        this.user = this.User.create({
          image: account.user.image,
          firstName: account.user.firstName,
          lastName: account.user.lastName,
          email: account.user.email,
          username: account.user.username,
          affiliate: account.user.affiliate,
          max: {
            squat: account.user.max.squat,
            dead: account.user.max.dead,
            snatch: account.user.max.snatch,
            bench: account.user.max.bench
          }
        })

        this.form.reset({
          'maxSquat': this.user.max.squat,
          'maxDead': this.user.max.dead,
          'maxSnatch': this.user.max.snatch,
          'maxBench': this.user.max.bench
        })

        console.log('this.user2', this.user)

      });
  }


  editForm() {
    this.editFormBool = true;
    this.form.enable();
  }

  cancelEdit() {
    this.editFormBool = false;
    this.form.disable();
    this.form.reset({
      'maxSquat': this.user.max.squat,
      'maxDead': this.user.max.dead,
      'maxSnatch': this.user.max.snatch,
      'maxBench': this.user.max.bench
    })
  }

  submit() {
    console.log('submitting form');
  }


}
