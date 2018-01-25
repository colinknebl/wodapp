import { Component,
         OnInit,
         ViewChild,
         ElementRef }           from '@angular/core';
import { FormControl,
         FormGroup,
         FormBuilder,
         Validators }           from '@angular/forms';
import { Router }               from '@angular/router';
import { IndexDemoFormService } from '../../services/index-demo-form/index-demo-form.service';
import { AuthService }          from '../../services/auth/auth.service';
import { UserGenModel   }       from '../../models/user-gen-wod';

@Component({
  selector: 'app-demonstrate',
  templateUrl: './demonstrate.component.html',
  styleUrls: ['./demonstrate.component.scss']
})
export class DemonstrateComponent implements OnInit {
  @ViewChild("_id", {read: ElementRef}) tref: ElementRef;
  @ViewChild('btnPrev') btnPrev: ElementRef;
  @ViewChild('slide1') slide1: ElementRef;
  @ViewChild('slide2') slide2: ElementRef;
  @ViewChild('slide3') slide3: ElementRef;
  @ViewChild('slide4') slide4: ElementRef;
  @ViewChild('slide5') slide5: ElementRef;
  @ViewChild('slide6') slide6: ElementRef;
  @ViewChild('slide7') slide7: ElementRef;
  @ViewChild('slide8') slide8: ElementRef;

  
  public form: FormGroup;
  public user;
  public errorMessage: string;
  public gender: boolean = true;
  public fixSkillLvl: boolean = true;
  public formSubmitted: boolean = false;
  public slides: any[];
  public slideOneNextClicked: boolean = false;
  public slideTwoNextClicked: boolean = false;
  public wodType;
  public showBodyWeightOnly: boolean;
  public showStrongman: boolean;
  public showEnduranceFocus: boolean;
  public showTimer: boolean;

  constructor(
    public router:Router,
    public indexDemoForm: IndexDemoFormService,
    public authService: AuthService,
    public User: UserGenModel,
    public fb: FormBuilder) {
    this.form = fb.group({
      firstName        : [null, Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      lastName         : [null, Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      email            : [null, Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      tel              : null,
      skillLvl         : [null, Validators.required],
      gender           : [null, Validators.required],
      bodyweightOnly   : null,
      enduranceWod     : null,
      includeStrongManExercises: null,
      wodType          : null,
      muscleGrp        : null,
      repScheme        : null,
      wodTimer         : null,
      maxBench         : null,
      maxSquat         : null,
      maxSnatch        : null,
      maxDead          : null,
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
      climbingRope     : null,
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
      outdoorRun       : null
    });
  }

  ngOnInit() {
    const loggedIn = this.authService.tokenCheck();


    this.slides = [
      this.slide1,
      this.slide2,
      this.slide3,
      this.slide4,
      this.slide5,
      this.slide6,
      this.slide7,
      this.slide8
    ];

    if (loggedIn) {
      this.authService.getAccountInfo()
        .subscribe(account => {

          if (account.success) {

            if (!account.equipment) {
              account.equipment = {};
            }

            this.user = this.User.create({
              firstName: account.user.firstName,
              lastName: account.user.lastName,
              email: account.user.email,
              skillLvl: account.user.skillLvl,
              gender: account.user.gender,
              max: {
                squat: account.user.max.squat,
                dead: account.user.max.dead,
                snatch: account.user.max.snatch,
                bench: account.user.max.bench
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
              'firstName': this.user.firstName,
              'lastName': this.user.lastName,
              'email': this.user.email,
              'skillLvl' : this.user.skillLvl,
              'gender' : this.user.gender,
              'maxSquat': this.user.max.squat,
              'maxDead' : this.user.max.dead,
              'maxBench': this.user.max.bench,
              'maxSnatch': this.user.max.snatch,
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
            })

          }
        });
    }
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (regExp.test(controls.value)) {
      return null;
    }
    else {
      return { 'validateEmail' : true};
    }
  }

  private transform: number = 0;

  nextSlide() {
    
    this.transform = this.transform - 100;

    this.slides.forEach(slide => {
      slide.nativeElement.style.transform = `translate(${this.transform}%, 0%)`;
    })
  }

  prevSlide() {

    this.transform = this.transform + 100;

    this.slides.forEach(slide => {
      slide.nativeElement.style.transform = `translate(${this.transform}%, 0%)`;
    })
  }

  validateSlideOne() {
    this.slideOneNextClicked = true;

    let form = this.form.controls;
    if (form.firstName.valid && form.lastName.valid && form.email.valid) {
      this.nextSlide();
    }
  }

  validateSlideTwo() {
    this.slideTwoNextClicked = true;

    if (this.form.value.wodType) {
      this.wodType = this.form.value.wodType;

      // LOGIC FOR SHOWING BODYWEIGHT ONLY AND STRONGMAN EXERCISES QUESTIONS IN FORM
      if (this.wodType === 'Chipper' || 
          this.wodType === 'AMRAP' || 
          this.wodType === 'Couplet' || 
          this.wodType === 'Triplet' || 
          this.wodType === 'EMOM' || 
          this.wodType === 'Tabata') {
        this.showBodyWeightOnly = true;
        this.showStrongman = true;
      }
      else {
        this.showBodyWeightOnly = false;
        this.showStrongman = false;
      }

      // LOGIC FOR SHOWING ENDURANCE QUESTION IN FORM
      if (this.wodType === 'Chipper' || 
          this.wodType === 'Couplet' || 
          this.wodType === 'Triplet' || 
          this.wodType === 'EMOM' || 
          this.wodType === 'Tabata') {
        this.showEnduranceFocus = true;
      }
      else {
        this.showEnduranceFocus = false;
      }

      // LOGIC FOR SHOWING TIMER OPTION IN FORM
      if (this.wodType === 'Chipper' || 
          this.wodType === 'Couplet' || 
          this.wodType === 'Triplet' || 
          this.wodType === 'Singlet' ||
          this.wodType === 'Tabata') {
        this.showTimer = false;
      }
      else {
        this.showTimer = true;
      }
    }

    let form = this.form.controls;
    if (form.skillLvl.valid && form.gender.valid) {
      this.nextSlide();
    }
  }

  submit() {
    this.formSubmitted = true;

    if (this.form.valid) {
      let form = this.form.value;

      const user = this.createUserObject();
      const date = Date.now();
      const _id = date + user.firstName[0] + user.lastName[0];

      let redirectUrl = '/workout-generator/' + _id;

      this.indexDemoForm.submit({
        _id: _id,
        user: user,
        redirectUrl: redirectUrl
      });
    }
    else {
      this.errorMessage = 'Please correct errors before submitting.';

      if (!this.form.controls.skillLvl.valid) {
        this.fixSkillLvl = false;
      }
      if (!this.form.controls.gender.valid) {
        this.gender = false;
      }
    }
  }

  createUserObject() {

    const user = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      tel: this.form.value.tel,
      skillLvl: this.form.value.skillLvl,
      gender: this.form.value.gender,
      bodyweightOnly: this.form.value.bodyweightOnly,
      wodType: this.form.value.wodType,
      muscleGrp: this.form.value.muscleGrp,
      repScheme: this.form.value.repScheme,
      timer: this.form.value.wodTimer,
      max: {
        bench: this.form.value.maxBench,
        squat: this.form.value.maxSquat,
        snatch: this.form.value.maxSnatch,
        dead: this.form.value.maxDead
      },
      equipment: this.createEqpmtArray()
    }

    return user;
  }

  createEqpmtArray() {
    const eArray: string[] = [];
    this.form.value.barbell ? eArray.push('barbell') : null;
    this.form.value.dumbbells ? eArray.push('dumbbells') : null;
    this.form.value.plates ? eArray.push('plates') : null;
    this.form.value.rack ? eArray.push('rack') : null;
    this.form.value.bench ? eArray.push('bench') : null;
    this.form.value.jumpRope ? eArray.push('jumpRope') : null;
    this.form.value.box ? eArray.push('box') : null;
    this.form.value.kBell ? eArray.push('kBell') : null;
    this.form.value.dipStation ? eArray.push('dipStation') : null;
    this.form.value.pullUpBar ? eArray.push('pullUpBar') : null;
    this.form.value.medBall ? eArray.push('medBall') : null;
    this.form.value.rings ? eArray.push('rings') : null;
    this.form.value.climbimgRope ? eArray.push('climbimgRope') : null;
    this.form.value.conditioningRope ? eArray.push('conditioningRope') : null;
    this.form.value.sled ? eArray.push('sled') : null;
    this.form.value.sledgeHammer ? eArray.push('sledgeHammer') : null;
    this.form.value.abMat ? eArray.push('abMat') : null;
    this.form.value.resBands ? eArray.push('resBands') : null;
    this.form.value.tire ? eArray.push('tire') : null;
    this.form.value.sandbag ? eArray.push('sandbag') : null;
    this.form.value.chains ? eArray.push('chains') : null;
    this.form.value.pegBoard ? eArray.push('pegBoard') : null;
    this.form.value.ghd ? eArray.push('ghd') : null;
    this.form.value.airBike ? eArray.push('airBike') : null;
    this.form.value.rower ? eArray.push('rower') : null;
    this.form.value.skiErg ? eArray.push('skiErg') : null;
    this.form.value.treadmill ? eArray.push('treadmill') : null;
    this.form.value.outdoorRun ? eArray.push('outdoorRun') : null;
    return eArray;
  }

  public eqArray1: any[] = [ //10
    {span: 'Barbell', value: 'barbell'},
    {span: 'Dumbbells', value: 'dumbbells'},
    {span: 'Weight Plates', value: 'plates'},
    {span: 'Bench', value: 'bench'},
    {span: 'Chains', value: 'chains'},
    {span: 'Squat Rack', value: 'rack'},
    {span: 'Dip Station', value: 'dipStation'},
    {span: 'Pull-Up Bar', value: 'pullUpBar'},
    {span: 'Tire', value: 'tire'},
    {span: 'Rings', value: 'rings'}
  ]

  public eqArray2: any[] = [ //9
    {span: 'Kettle Bell', value: 'kBell'},
    {span: 'Resistance Bands', value: 'resBands'},
    {span: 'Plyo Box', value: 'box'},
    {span: 'Medicine Ball', value: 'medBall'},
    {span: 'GHD', value: 'ghd'},
    {span: 'Peg Board', value: 'pegBoard'},
    {span: 'AbMat', value: 'abMat'},
    {span: 'Sledge Hammer', value: 'sledgeHammer'},
    {span: 'Climbing Rope', value: 'climbingRope'}    
  ]

  public eqArray3: any[] = [ //9
    {span: 'Jump Rope', value: 'jumpRope'},
    {span: 'Sled', value: 'sled'},
    {span: 'Sandbag', value: 'sandbag'},
    {span: 'Conditioning Ropes', value: 'conditioningRope'},
    {span: 'Air Bike', value: 'airBike'},
    {span: 'Rower', value: 'rower'},
    {span: 'SkiErg', value: 'skiErg'},
    {span: 'Treadmill', value: 'treadmill'},
    {span: 'Outdoor Running Space', value: 'outdoorRun'}
  ]

}
