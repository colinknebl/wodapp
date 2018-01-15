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
      }
    };
  }
}