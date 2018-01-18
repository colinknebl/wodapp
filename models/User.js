module.exports = {

  validate: (user, file, tag) => {
    console.log(typeof [1, 2]);
    console.log(Array.isArray([1,2]));
    if (!user.firstName || typeof user.firstName !== 'string') {
      throw `user does not have a first name. ${file} tag: ${tag}`;
    }
    else if (!user.lastName || typeof user.lastName !== 'string') {
      throw `user does not have a last name. ${file} tag: ${tag}`;
    }
    else if (!user.email || typeof user.email !== 'string') {
      throw `user does not have an email. ${file} tag: ${tag}`;
    }
    else if (!user.tel || typeof user.tel !== 'string') {
      throw `user does not have a phone number. ${file} tag: ${tag}`;
    }
    else if (!user.skillLvl || typeof user.skillLvl !== 'string') {
      throw `user does not have a skillLvl. ${file} tag: ${tag}`;
    }
    else if (!user.gender || typeof user.gender !== 'string') {
      throw `user does not have a gender. ${file} tag: ${tag}`;
    }
    else if (!user.wodType || typeof user.wodType !== 'string') {
      throw `user does not have a wodType. ${file} tag: ${tag}`;
    }
    else if (!user.muscleGrp || typeof user.muscleGrp !== 'string') {
      throw `user does not have a muscleGrp. ${file} tag: ${tag}`;
    }
    else if (!user.repScheme || typeof user.repScheme !== 'string') {
      throw `user does not have a repScheme. ${file} tag: ${tag}`;
    }
    else if (!user.timer || typeof user.timer !== 'string') {
      throw `user does not have a timer. ${file} tag: ${tag}`;
    }
    else if (!user.maxBench || typeof user.maxBench !== 'number') {
      throw `user does not have a maxBench. ${file} tag: ${tag}`;
    }
    else if (!user.maxSquat || typeof user.maxSquat !== 'number') {
      throw `user does not have a maxSquat. ${file} tag: ${tag}`;
    }
    else if (!user.maxSnatch || typeof user.maxSnatch !== 'number') {
      throw `user does not have a maxSnatch. ${file} tag: ${tag}`;
    }
    else if (!user.maxDead || typeof user.maxDead !== 'number') {
      throw `user does not have a maxDead. ${file} tag: ${tag}`;
    }
    else if (!user.equip || Array.isArray(user.equip) === false) {
      throw `user does not have an equip array. ${file} tag: ${tag}`;
    }
  }


  // class User {
  //   constructor(user) {
  //     this.firstName = user.firstName;
  //     this.lastName = user.lastName;
  //     this.email = user.email;
  //   }
  // }

  // const colin = new User(u1);


  // function validateUser(user){
    
  // }


  // createUser(u1);
  // createUser(u2);

  // function createUser(user) {
  //   let userInput = new User(user);

  //   validateUser(userInput);
  // }
};

