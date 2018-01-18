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

  eqpmtArray = [
    { 'name': 'Barbell', 'value': 'barbell' },
    { 'name': 'Dumbbells', 'value': 'dumbbells' },
    { 'name': 'Weight Plates', 'value': 'plates' },
    { 'name': 'Squat Rack', 'value': 'rack' },
    { 'name': 'Bench', 'value': 'bench' },
    { 'name': 'Jump Rope', 'value': 'jumpRope' },
    { 'name': 'Plyo Box', 'value': 'box' },
    { 'name': 'Kettle Bell', 'value': 'kBell' },
    { 'name': 'Dip Station', 'value': 'dipStation' },
    { 'name': 'Pull-Up Bar', 'value': 'pullUpBar' },
    { 'name': 'Medicine Ball', 'value': 'medBall' },
    { 'name': 'Rings', 'value': 'rings' },
    { 'name': 'Climbimg Rope', 'value': 'climbimgRope' },
    { 'name': 'Conditioning Ropes', 'value': 'conditioningRope' },
    { 'name': 'Sled', 'value': 'sled' },
    { 'name': 'Sledge Hammer', 'value': 'sledgeHammer' },
    { 'name': 'AbMat', 'value': 'abMat' },
    { 'name': 'Resistance Bands', 'value': 'resBands' },
    { 'name': 'Tire', 'value': 'tire' },
    { 'name': 'Sandbag', 'value': 'sandbag' },
    { 'name': 'Chains', 'value': 'chains' },
    { 'name': 'Peg Board', 'value': 'pegBoard' },
    { 'name': 'GHD', 'value': 'ghd' },
    { 'name': 'Air Bike', 'value': 'airBike' },
    { 'name': 'Rower', 'value': 'rower' },
    { 'name': 'Ski Erg', 'value': 'skiErg' },
    { 'name': 'Treadmill', 'value': 'treadmill' },
    { 'name': 'Outdoor Running Available', 'value': 'outdoorRun' }
  ]

  constructor( 
    public User: UserModel,
    public authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    public updateUserService: UpdateUserService,
    public router:Router,
    public formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      affiliate: null,
      skillLvl: null,
      gender: null,
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
      equipment: null,
      barbell          : null,
      dumbbells        : null,
      plates           : null,
      rack             : null,
      bench            : null,
      jumpRope         : null,
      box              : null,
      kBell            : null,
      dipStation       : null,
      pullUpBar        : null,
      medBall          : null,
      rings            : null,
      climbimgRope     : null,
      conditioningRope : null,
      sled             : null,
      sledgeHammer     : null,
      abMat            : null,
      resBands         : null,
      tire             : null,
      sandbag          : null,
      chains           : null,
      pegBoard         : null,
      ghd              : null,
      airBike          : null,
      rower            : null,
      skiErg           : null,
      treadmill        : null,
      outdoorRun       : null,
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

          if (!account.user.equipment) {
            account.user.equipment= {};
          }

          this.user = this.User.create({
            image: account.user.image,
            firstName: account.user.firstName,
            lastName: account.user.lastName,
            email: account.user.email,
            username: account.user.username,
            affiliate: account.user.affiliate,
            gender: account.user.gender,
            skillLvl: account.user.skillLvl,
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
            },
            equipment: {
              barbell: account.user.equipment.barbell,
              dumbbells: account.user.equipment.dumbbells,
              plates: account.user.equipment.plates,
              rack: account.user.equipment.rack,
              bench: account.user.equipment.bench,
              jumpRope: account.user.equipment.jumpRope,
              box: account.user.equipment.box,
              kBell: account.user.equipment.kBell,
              dipStation: account.user.equipment.dipStation,
              pullUpBar: account.user.equipment.pullUpBar,
              medBall: account.user.equipment.medBall,
              rings: account.user.equipment.rings,
              climbimgRope: account.user.equipment.climbimgRope,
              conditioningRope: account.user.equipment.conditioningRope,
              sled: account.user.equipment.sled,
              sledgeHammer: account.user.equipment.sledgeHammer,
              abMat: account.user.equipment.abMat,
              resBands: account.user.equipment.resBands,
              tire: account.user.equipment.tire,
              sandbag: account.user.equipment.sandbag,
              chains: account.user.equipment.chains,
              pegBoard: account.user.equipment.pegBoard,
              ghd: account.user.equipment.ghd,
              airBike: account.user.equipment.airBike,
              rower: account.user.equipment.rower,
              skiErg: account.user.equipment.skiErg,
              treadmill: account.user.equipment.treadmill,
              outdoorRun: account.user.equipment.outdoorRun
            }
          });

          this.form.reset({
            'affiliate': this.user.affiliate,
            'skillLvl': this.user.skillLvl,
            'gender': this.user.gender,
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
            'badgerSec': this.user.time.badger.seconds,
            'barbell': this.user.equipment.barbell,
            'dumbbells': this.user.equipment.dumbbells,
            'plates': this.user.equipment.plates,
            'rack': this.user.equipment.rack,
            'bench': this.user.equipment.bench,
            'jumpRope': this.user.equipment.jumpRope,
            'box': this.user.equipment.box,
            'kBell': this.user.equipment.kBell,
            'dipStation': this.user.equipment.dipStation,
            'pullUpBar': this.user.equipment.pullUpBar,
            'medBall': this.user.equipment.medBall,
            'rings': this.user.equipment.rings,
            'climbimgRope': this.user.equipment.climbimgRope,
            'conditioningRope': this.user.equipment.conditioningRope,
            'sled': this.user.equipment.sled,
            'sledgeHammer': this.user.equipment.sledgeHammer,
            'abMat': this.user.equipment.abMat,
            'resBands': this.user.equipment.resBands,
            'tire': this.user.equipment.tire,
            'sandbag': this.user.equipment.sandbag,
            'chains': this.user.equipment.chains,
            'pegBoard': this.user.equipment.pegBoard,
            'ghd': this.user.equipment.ghd,
            'airBike': this.user.equipment.airBike,
            'rower': this.user.equipment.rower,
            'skiErg': this.user.equipment.skiErg,
            'treadmill': this.user.equipment.treadmill,
            'outdoorRun': this.user.equipment.outdoorRun
          });
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
      'affiliate': form.affiliate,
      'skillLvl': form.skillLvl,
      'gender': form.gender,
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
        }
      },
      'equipment': {
        'barbell': form.barbell,
        'dumbbells': form.dumbbells,
        'plates': form.plates,
        'rack': form.rack,
        'bench': form.bench,
        'jumpRope': form.jumpRope,
        'box': form.box,
        'kBell': form.kBell,
        'dipStation': form.dipStation,
        'pullUpBar': form.pullUpBar,
        'medBall': form.medBall,
        'rings': form.rings,
        'climbimgRope': form.climbimgRope,
        'conditioningRope': form.conditioningRope,
        'sled': form.sled,
        'sledgeHammer': form.sledgeHammer,
        'abMat': form.abMat,
        'resBands': form.resBands,
        'tire': form.tire,
        'sandbag': form.sandbag,
        'chains': form.chains,
        'pegBoard': form.pegBoard,
        'ghd': form.ghd,
        'airBike': form.airBike,
        'rower': form.rower,
        'skiErg': form.skiErg,
        'treadmill': form.treadmill,
        'outdoorRun': form.outdoorRun
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
