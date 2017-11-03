module.exports = {

  wodMain: {

    stats: {},

    generateWOD: function(stats){
      this.stats = stats;
      console.log(this.stats);


      let repsANDweight = helpers.repsANDweight(stats.repScheme);
      let reps = repsANDweight[0];
      let weight = repsANDweight[1];
      console.log('test');
      // let wod = this.wodType(stats.wodType, stats.muscleGrp);

      
      // return wod;
    },

    wodType: function(wodType, muscleGrp){
      if (wodType === "amrap") {
        console.log('user wants an AMRAP WOD type');

      }
      else if (wodType === "bodyweight") {
        console.log('user wants a bodyweight WOD type');

      }
      else if (wodType === "chipper") {
        console.log('user wants an chipper WOD type');

      }
      else if (wodType === "couplet") {
        console.log('user wants a couplet WOD type');

        let exercise = this.wodExercises(muscleGrp, 2);
        let rounds = helpers.numGenerator(5, 7);

        let wod = {
          instructions: `${rounds} rounds for time of:`,
          exerciseOne: {
            exercise: exercise[0].name,
            weight: 135 + "lbs"
          },          
          exerciseTwo: {
            exercise: exercise[1].name,
            weight: 40 + "lbs"
          }
        };

        return wod;
      }
      else if (wodType === "emom") {
        console.log('user wants an emom WOD type');
        
      }
      else if (wodType === "singlet") {
        console.log('user wants a singlet WOD type');
        
      }
      else if (wodType === "triplet") {
        console.log('user wants a bodyweight WOD type');
        
      }
      else {
        console.log('must define a valid WOD type');
      }
    },

    wodExercises: function(muscleGrp, numOfExercises){

      console.log(exercises.legs.gold.length);

      let one = helpers.numGenerator(0,(exercises.legs.gold.length - 1));
      let two = helpers.numGenerator(0,(exercises.legs.silver.length - 1));
      let three = helpers.numGenerator(0,(exercises.legs.bronze.length - 1));
      let four = helpers.numGenerator(0,(exercises.legs.bronze.length - 1));

      console.log(`one = ${one}, two = ${two}, three = ${three}, four = ${four}`);

      if (muscleGrp === "legs") {
        console.log('users wants a WOD for legs');

        let exerciseOne = exercises.legs.gold[one];
        let exerciseTwo = exercises.legs.silver[two];
        let exerciseThree = exercises.legs.bronze[three];
        let exerciseFour = exercises.legs.bronze[four];

        switch (numOfExercises) {
          case 1: 
            console.log('only one exercise needed');
            break;
          case 2:
            console.log('only two exercises needed');
            console.log(exerciseOne);
            return [exerciseOne, exerciseTwo];
          default:
            console.log('no exercises needed');
        }

      }
      else if (muscleGrp === "chest") {
        console.log('users wants a WOD for chest');

      }
      else if (muscleGrp === "back") {
        console.log('users wants a WOD for back');

      }
      else if (muscleGrp === "shoulders") {
        console.log('users wants a WOD for shoulders');

      }
      else {
        console.log('user does not want the WOD to focus on a specific muscle group');

      }
    },

  }
};

helpers = {

  numGenerator: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  weightPercent: function(skillLvl, repScheme) {

    switch (skillLvl) {
      case "beginner":
        console.log('user is a beginner');


        if (repScheme === "lowRepHighWeight") {
          let percent = 0.6;
        }

        return ;

      case "intermediate":
        console.log('user is an intermediate');
        return ;
      case "advanced":
        console.log('user is advanced');
        return ;
    }
  },

  repsANDweight: function(repScheme) {

    let reps;
    let weight;

    switch (repScheme) {
      case "lowRepHighWeight":
        reps = this.numGenerator(3,7);
        weight = 0.8;
        return [reps, weight];
      case "mediumRepsAndWeight":
        reps = this.numGenerator(8,14);
        weight = 0.6;
        return [reps, weight];
      case "highRepLowWeight":
        reps = this.numGenerator(15,20);
        weight = 0.4;
        return [reps, weight];
      default:
        reps = this.numGenerator(3,20);
        if (reps >= 3 && reps <= 7) {
          weight = 0.8;
        }
        else if (reps >= 8 && reps <= 14) {
          weight = 0.6;
        }
        else {
          weight = 0.4;
        }
        return [reps, weight];
    }
  }

};

legWOD = {



};

// module.exports = wodMain.generateWOD();



/*

data needed
- first name
- last name
- email
- skill level
- desired rep scheme
- WOD type
- muscle group focus
- PRs
- available equipment

1. add the first name, last name, and email address to user database

2. get the desired rep scheme
  a. lowRepHighWeight
    i. reps = 3 - 5
    ii. weight = 80% 1RM
  b. highRepLowWeight
    i. reps = 15 - 20
    ii. weight = 40% 1RM
  c. mediumRepsAndWeight
    i. reps = 8 - 12
    ii. weight = 60% 1RM

3. get the WOD type 
  a. couplet
  b. amrap
  c. bodyweight
  d. chipper
  e. emom
  f. singlet
  g. triplet

4. get the muscle group focus
  a. legs
  b. chest
  c. back
  d. shoulders

5. PRs get the PRs
  a. flat bench press
  b. back squat
  c. snatch
  d. deadlift

6. get the available equipment

7. 


*/































