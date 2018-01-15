import { Component, OnInit }        from '@angular/core';
import { FormControl,
         FormGroup,
         FormBuilder,
         Validators }               from '@angular/forms';
import { Router }                   from '@angular/router';
import { AuthService }              from '../../services/auth/auth.service';
import { UpdateUserService }        from '../../services/update-user/update-user.service';
import { FlashMessagesService }     from '../../services/flash-messages/flash-messages.service';
import { UserModel }                from '../../models/user';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user;
  public form: FormGroup;
  public editFormBool: boolean = false;
  public accountLoaded: boolean = false;


  constructor( 
    private User: UserModel,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private updateUserService: UpdateUserService,
    private router:Router,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      maxSquat: null,
      maxDead: null,
      maxSnatch: null,
      maxBench: null,
      murphHrs: null,
      murphMin: null,
      murphSec: null,
      dianeHrs: null,
      dianeMin: null,
      dianeSec: null,
      dtHrs: null,
      dtMin: null,
      dtSec: null,
      badgerHrs: null,
      badgerMin: null,
      badgerSec: null,
    })
  }

  ngOnInit() {
    this.form.disable();

    // USING TESTING URL IN AUTH.SERVICE
    this.authService.getAccountInfo()
      .subscribe(account => {

        if (account.success) {

          if (!account.user.image) {account.user.image = 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg';}

          if (!account.user.max) {
            account.user.max = {}
            account.user.max.squat = 0;
            account.user.max.dead = 0;
            account.user.max.snatch = 0;
            account.user.max.bench = 0;
          }

          if (!account.user.time) {
            account.user.time = {
              murph: {hours: 0, minutes: 0, seconds: 0},
              diane: {hours: 0, minutes: 0, seconds: 0},
              dt: {hours: 0, minutes: 0, seconds: 0},
              badger: {hours: 0, minutes: 0, seconds: 0}
            };
          }

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
            },
            time: {
              murph: {
                hours: account.user.time.murph.hours,
                minutes: account.user.time.murph.minutes,
                seconds: account.user.time.murph.seconds
              },
              diane: {
                hours: account.user.time.diane.hours,
                minutes: account.user.time.diane.minutes,
                seconds: account.user.time.diane.seconds
              },
              dt: {
                hours: account.user.time.dt.hours,
                minutes: account.user.time.dt.minutes,
                seconds: account.user.time.dt.seconds
              },
              badger: {
                hours: account.user.time.badger.hours,
                minutes: account.user.time.badger.minutes,
                seconds: account.user.time.badger.seconds
              }
            }          
          });          

          this.form.reset({
            'maxSquat': this.user.max.squat,
            'maxDead': this.user.max.dead,
            'maxSnatch': this.user.max.snatch,
            'maxBench': this.user.max.bench,
            'murphHrs': this.user.time.murph.hours,
            'murphMin': this.user.time.murph.minutes,
            'murphSec': this.user.time.murph.seconds,
            'dianeHrs': this.user.time.diane.hours,
            'dianeMin': this.user.time.diane.minutes,
            'dianeSec': this.user.time.diane.seconds,
            'dtHrs': this.user.time.dt.hours,
            'dtMin': this.user.time.dt.minutes,
            'dtSec': this.user.time.dt.seconds,
            'badgerHrs': this.user.time.badger.hours,
            'badgerMin': this.user.time.badger.minutes,
            'badgerSec': this.user.time.badger.seconds
          })
          this.accountLoaded = true;
        }
        else {
          this.accountLoaded = false;
          this.authService.logout();

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);

          this.flashMessagesService.sendMessage({
            message: 'Account failed to load. Please log back in to view your account information.',
            messageClass: 'info',
            showMessageBool: true,
            messageDuration: 5000
          });
        }
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
      'maxBench': this.user.max.bench,
      'murphHrs': this.user.time.murph.hours,
      'murphMin': this.user.time.murph.minutes,
      'murphSec': this.user.time.murph.seconds,
      'dianeHrs': this.user.time.diane.hours,
      'dianeMin': this.user.time.diane.minutes,
      'dianeSec': this.user.time.diane.seconds,
      'dtHrs': this.user.time.dt.hours,
      'dtMin': this.user.time.dt.minutes,
      'dtSec': this.user.time.dt.seconds,
      'badgerHrs': this.user.time.badger.hours,
      'badgerMin': this.user.time.badger.minutes,
      'badgerSec': this.user.time.badger.seconds
    })
  }

  submit() {
    this.editFormBool = false;
    let form = this.form.value;

    const reformattedForm = {
      'max': {
        'squat': form.maxSquat,
        'dead': form.maxDead,
        'snatch': form.maxSnatch,
        'bench': form.maxBench
      },
      'time': {
        'murph': {
          'hours': form.murphHrs,
          'minutes': form.murphMin,
          'seconds':form.murphSec
        },
        'diane': {
          'hours': form.dianeHrs,
          'minutes': form.dianeMin,
          'seconds': form.dianeSec
        },
        'dt': {
          'hours': form.dtHrs,
          'minutes': form.dtMin,
          'seconds': form.dtSec
        },
        'badger': {
          'hours': form.badgerHrs,
          'minutes': form.badgerMin,
          'seconds': form.badgerSec
        },
      }
    }

    this.updateUserService.updateUser(reformattedForm)
      .subscribe(data => {
        if (data.success) {
          this.flashMessagesService.sendMessage({
            message: data.message,
            messageClass: 'success',
            showMessageBool: true,
            messageDuration: 4000
          })
        }
        else {
          this.flashMessagesService.sendMessage({
            message: data.message,
            messageClass: 'alert',
            showMessageBool: true,
            messageDuration: 4000
          })
        }
      });
  }


}
