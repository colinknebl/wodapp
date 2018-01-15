export class UserModel {
  create(user: { 
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    affiliate: string;
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
  }) {
    return { 
      image: user.image,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      affiliate: user.affiliate,
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
      }
    };
  }
}





