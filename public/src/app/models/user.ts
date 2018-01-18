export class UserModel {
  create(user: { 
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    affiliate: string;
    gender: string;
    skillLvl: string;
    max: {
      squat: number;
      dead: number;
      snatch: number;
      bench: number;
    };
    time: {
      murph: {
        hours: number;
        minutes: number;
        seconds: number;
      };
      diane: {
        hours: number;
        minutes: number;
        seconds: number;
      };
      dt: {
        hours: number;
        minutes: number;
        seconds: number;
      };
      badger: {
        hours: number;
        minutes: number;
        seconds: number;
      };
    };
    equipment:{
      barbell: boolean;
      dumbbells: boolean;
      plates: boolean;
      rack: boolean;
      bench: boolean;
      jumpRope: boolean;
      box: boolean;
      kBell: boolean;
      dipStation: boolean;
      pullUpBar: boolean;
      medBall: boolean;
      rings: boolean;
      climbimgRope: boolean;
      conditioningRope: boolean;
      sled: boolean;
      sledgeHammer: boolean;
      abMat: boolean;
      resBands: boolean;
      tire: boolean;
      sandbag: boolean;
      chains: boolean;
      pegBoard: boolean;
      ghd: boolean;
      airBike: boolean;
      rower: boolean;
      skiErg: boolean;
      treadmill: boolean;
      outdoorRun: boolean;
    };
  }) {
    return { 
      image: user.image,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      affiliate: user.affiliate,
      gender: user.gender,
      skillLvl: user.skillLvl,
      max: {
        squat: user.max.squat,
        dead: user.max.dead,
        snatch: user.max.snatch,
        bench: user.max.bench
      },
      time: {
        murph: {
          hours: user.time.murph.hours,
          minutes: user.time.murph.minutes,
          seconds: user.time.murph.seconds
        },
        diane: {
          hours: user.time.diane.hours,
          minutes: user.time.diane.minutes,
          seconds: user.time.diane.seconds
        },
        dt: {
          hours: user.time.dt.hours,
          minutes: user.time.dt.minutes,
          seconds: user.time.dt.seconds
        },
        badger: {
          hours: user.time.badger.hours,
          minutes: user.time.badger.minutes,
          seconds: user.time.badger.seconds
        }
      },
      equipment: {
        barbell: user.equipment.barbell,
        dumbbells: user.equipment.dumbbells,
        plates: user.equipment.plates,
        rack: user.equipment.rack,
        bench: user.equipment.bench,
        jumpRope: user.equipment.jumpRope,
        box: user.equipment.box,
        kBell: user.equipment.kBell,
        dipStation: user.equipment.dipStation,
        pullUpBar: user.equipment.pullUpBar,
        medBall: user.equipment.medBall,
        rings: user.equipment.rings,
        climbimgRope: user.equipment.climbimgRope,
        conditioningRope: user.equipment.conditioningRope,
        sled: user.equipment.sled,
        sledgeHammer: user.equipment.sledgeHammer,
        abMat: user.equipment.abMat,
        resBands: user.equipment.resBands,
        tire: user.equipment.tire,
        sandbag: user.equipment.sandbag,
        chains: user.equipment.chains,
        pegBoard: user.equipment.pegBoard,
        ghd: user.equipment.ghd,
        airBike: user.equipment.airBike,
        rower: user.equipment.rower,
        skiErg: user.equipment.skiErg,
        treadmill: user.equipment.treadmill,
        outdoorRun: user.equipment.outdoorRun
      }
    };
  }
}





