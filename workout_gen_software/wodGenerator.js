const path        = require('path'),
      http        = require('http'),
      bodyParser  = require('body-parser'),
      mongodb     = require('../database/database');



const request = require('request');

// const test = require('../workout_gen_software/sandbox');

wodGenerator = {

  wod: {},

  generateWod: (user, wodConst) => {
    let wod;

    switch (user.wodType) {
      case "amrap":
        wod = wodGenerator.amrap(user, wodConst);
        return Promise.resolve(wod);
      // case "bodyweight":
      //   wodGenerator.bodyweight(user, wodConst);
      //   break;
      case "chipper":
        wod = wodGenerator.chipper(user, wodConst);
        return Promise.resolve(wod);
      case "couplet":
        wod = wodGenerator.couplet(user, wodConst);
        return Promise.resolve(wod);
      // case "emom":
      //   wodGenerator.(user, wodConst);
      //   break;
      // case "endurance":
      //   wodGenerator.(user, wodConst);
      //   break;
      // case "hybrid":
      //   wodGenerator.(user, wodConst);
      //   break;
      case "singlet":
        wod = wodGenerator.singlet(user, wodConst);
        return Promise.resolve(wod);
      case "triplet":
        wod = wodGenerator.triplet(user, wodConst);
        return Promise.resolve(wod);
      // case "strength":
      //   wodGenerator.(user, wodConst);
      //   break;
      // case "strongman":
      //   wodGenerator.(user, wodConst);
      //   break;
      // case "tabata":
      //   wodGenerator.(user, wodConst);
      //   break;
      // case "timeCap":
      //   wodGenerator.(user, wodConst);
      //   break;
      // case "weightlifting":
      //   wodGenerator.(user, wodConst);
      //   break;
      default:
        console.log('wod type unknown');

    }
  },

  couplet: (user, wodConst) => {
    console.log('entered couplet method');
  },

  triplet: (user, wodConst) => {
    console.log('entered triplet method');
  },

  chipper: (user, wodConst) => {
    console.log('entered chipper method');
  },

  singlet: (user, wodConst) => {
    console.log('entered singlet method');

    return new Promise((resolve, reject) => {
      // VARIABLE DECLARATIONS
      let priExercises;
      let WOD = wodConst;

      // SET TIMER
      WOD.timer = helpers.setTimer(user.timer);

      // QUERY DATABASE
      // SEE ARGUMENT DOCS IN MONGODB.EXERCISEQUERY METHOD
      let priExerciseQuery = mongodb.exerciseQuery(user, ['muscleGrp', 'category'], ['weightlifting']);

      priExerciseQuery
        .then((priExercisesQueryResults) => { 

          // RETRIEVE PRIMARY MUSCLE GROUP EXERCISES
          priExercises = priExercisesQueryResults;
          priExercises.forEach((exercise) => {
            console.log(exercise.name);
          });

        })
        .catch(err => console.error(err));

    });
  },

  amrap: (user, wodConst) => {

    // console.log('entered amrap method');

    return new Promise((resolve, reject) => {

      // VARIABLE DECLARATIONS
      let priExercises;
      let secExercises;
      let conExercises;
      let oppExercises;
      let wodExercises;
      let repCount;
      let percentOfMax;
      let WOD = wodConst;
      WOD.instructions = 'As many rounds as possible';

      // SET TIMER
      WOD.timer = helpers.setTimer(user.timer);

      // QUERY DATABASE
      // SEE ARGUMENT DOCS IN MONGODB.EXERCISEQUERY METHOD
      let priExerciseQuery = mongodb.exerciseQuery(user, ['priMuscleGrp', 'category']);
      let secExerciseQuery = mongodb.exerciseQuery(user, ['secMuscleGrp', 'category']);
      let conExerciseQuery = mongodb.exerciseQuery(user, ['category'], ['metabolic conditioning']);
      let oppExerciseQuery = mongodb.exerciseQuery(user, ['oppMuscleGrp']);

      priExerciseQuery
        .then((priExercisesQueryResults) => { 

          // RETRIEVE PRIMARY MUSCLE GROUP EXERCISES
          priExercises = priExercisesQueryResults;
          return secExerciseQuery;

        })
        .then((secExercisesQueryResults) => { 

          // RETRIEVE SECONDARY MUSCLE GROUP EXERCISES
          secExercises = secExercisesQueryResults;
          return conExerciseQuery;

        })
        .then((conExerciseQueryResults) => { 

          // RETRIEVE CONDITIONING EXERCISES
          conExercises = conExerciseQueryResults;

          // OPPOSING MUSCLE GROUP EXERCISES ARE ONLY USED IF THE TIMER IS GREATER THAN 16
          if (user.timer >= 16) { 
            return oppExerciseQuery;
          } else {
            return "opposing muscle group exercises not required";
          }

        })
        .then((OppExerciseQueryResults) => { 

          // RETRIEVE OPPOSING MUSCLE EXERCISES 
          oppExercises = OppExerciseQueryResults;

        })
        .then(() => {  

          // FILTER EXERCISES BASED ON USER'S EQUIPMENT
          priExercises = helpers.filterExercisesBasedOnEquipment(priExercises, user.equip);
          secExercises = helpers.filterExercisesBasedOnEquipment(secExercises, user.equip);
          conExercises = helpers.filterExercisesBasedOnEquipment(conExercises, user.equip);
          oppExercises = helpers.filterExercisesBasedOnEquipment(oppExercises, user.equip);
          

          // CHOOSE EXERCISES TO ADD TO WOD
          wodExercises = helpers.compileExercises(user.timer, priExercises, secExercises, conExercises, oppExercises);


          // GENERATE REP COUNT FOR WOD EXERCISES
          repScheme = helpers.generateRepScheme(user.repScheme);
          WOD.repScheme = repScheme;


          // ASSIGN WEIGHT TO EXERCISES
          if (repScheme >= 5 && repScheme <= 7) {
            percentOfMax = 0.5;
          }
          else if (repScheme >= 8 && repScheme <= 12) {
            percentOfMax = 0.45;
          }
          else if (repScheme >= 13 && repScheme <= 20) {
            percentOfMax = 0.4;
          }
          else {
            percentOfMax = 'invalid rep count';
          }
          wodExercises = helpers.assignRx(repScheme, percentOfMax, wodExercises, user);


          // DISPLAY WORKOUT
          let wodSequence = helpers.sequenceWodExercises(wodExercises);


          WOD.exercises = wodSequence;
          // console.log(WOD);

          // ADD WOD TO DATABASE
          mongodb.addWod(WOD);

          resolve(WOD);
        })
        .catch(err => console.error(err));

    });  
  }
};

module.exports = wodGenerator;

helpers = {

  setTimer: (timer) => {
    if (timer === 'any') {
      timer = helpers.numGenerator(5, 60);
    } 
    else if (timer === 'noTimer') {
      timer = 'For Time';
    }
    else {
      timer = timer;
    }
    return timer;
  },

  sequenceWodExercises: (wodExercises) => {

    let pri = wodExercises.priExercises.length;
    let con = wodExercises.conExercises.length;
    let sec;
    let opp;
    let wodExerciseSequence = [];


    if (wodExercises.secExercises) {
      sec = wodExercises.secExercises.length;
    } else { sec = 0; }
    if (wodExercises.oppExercises) {
      opp = wodExercises.oppExercises.length;
    } else { opp = 0; }


    if (pri === 1 && con === 1) {
      wodExerciseSequence.push(
        wodExercises.priExercises[0], 
        wodExercises.conExercises[0]
      );
    }
    else if (pri === 1 && sec === 1 && con === 1) {
      wodExerciseSequence.push(
        wodExercises.priExercises[0],
        wodExercises.secExercises[0], 
        wodExercises.conExercises[0]
      );
    }
    else if (pri === 1 && sec === 1 && con === 2) {
      wodExerciseSequence.push(
        wodExercises.priExercises[0],
        wodExercises.conExercises[0],
        wodExercises.secExercises[0],
        wodExercises.conExercises[1]
      );
    }
    else if (pri === 1 && sec === 1 && opp === 1 && con === 2) {
      wodExerciseSequence.push(
        wodExercises.priExercises[0],
        wodExercises.conExercises[0],
        wodExercises.oppExercises[0],
        wodExercises.secExercises[0],
        wodExercises.conExercises[1]
      );
    }
    else if (pri === 1 && sec === 2 && opp === 1 && con === 2) {
      wodExerciseSequence.push(
        wodExercises.priExercises[0], 
        wodExercises.secExercises[0],
        wodExercises.conExercises[0],
        wodExercises.oppExercises[0],
        wodExercises.secExercises[1],
        wodExercises.conExercises[1]
      );
    }
    else {
      return 'unrecognized wod...';
    }

    return wodExerciseSequence;
  },

  assignRx: (repCount, percentOfMax, wodExercises, user) => {

    // console.log(`rep count: ${repCount}`);
    // console.log(`percent of max: ${percentOfMax}`);
    // console.log(`user.maxBench: ${user.maxBench}`);
    // console.log(`user.maxSquat: ${user.maxSquat}`);
    // console.log(`user.maxSnatch: ${user.maxSnatch}`);
    // console.log(`user.maxDead: ${user.maxDead}`);
    // console.log(wodExercises);

    let userMax;

    switch (user.muscleGrp) {
      case "chest":
        userMax = user.maxBench;
        break;
      case "legs":
        userMax = user.maxSquat;
        break;
      case "back":
        userMax = user.maxDead;
        break;
    }

    function getWeight(userMuscleGrp, percentOfMax) {

      // console.log(`userMuscleGrp: ${userMuscleGrp}`);
      // console.log(`percentOfMax: ${percentOfMax}`);
      
      if (userMuscleGrp === "chest") {

        return Math.floor(userMax * percentOfMax);

      } 

      else if (userMuscleGrp === "legs") {

        return Math.floor(userMax * percentOfMax);

      }

      else if (userMuscleGrp === "back") {

        return Math.floor(userMax * percentOfMax);

      }

      else {
        console.error('error occurred in assigning weight');
      }

    }

    if (wodExercises.priExercises) {
      
      for (var i = 0; i < wodExercises.priExercises.length; i++) {
        // console.log(wodExercises.priExercises[i].name);

        if (wodExercises.priExercises[i].weighted === true) {
          wodExercises.priExercises[i].weightAmount = getWeight(wodExercises.priExercises[i].priMuscleGrp, wodExercises.priExercises[i].percentOfMax);
          // console.log(wodExercises.priExercises[i]);
        }
        else {
          wodExercises.priExercises[i].weightAmount = "BW";
        }
      }
    }

    if (wodExercises.secExercises) {
      
      for (var a = 0; a < wodExercises.secExercises.length; a++) {
        // console.log(wodExercises.secExercises[a].name);

        if (wodExercises.secExercises[a].weighted === true) {
          wodExercises.secExercises[a].weightAmount = getWeight(wodExercises.secExercises[a].priMuscleGrp, wodExercises.secExercises[a].percentOfMax);
          // console.log(wodExercises.secExercises[a]);
        }
        else {
          wodExercises.secExercises[a].weightAmount = "BW";
        }
      }
    }

    if (wodExercises.oppExercises) {
      
      for (var e = 0; e < wodExercises.oppExercises.length; e++) {
        // console.log(wodExercises.oppExercises[e].name);

        if (wodExercises.oppExercises[e].weighted === true) {
          wodExercises.oppExercises[e].weightAmount = getWeight(wodExercises.oppExercises[e].priMuscleGrp, wodExercises.oppExercises[e].percentOfMax);
          // console.log(wodExercises.oppExercises[e]);
        }
        else {
          wodExercises.oppExercises[e].weightAmount = "BW";
        }
      }
    }

    if (wodExercises.conExercises) {


    }

    return wodExercises;

  },

  generateRepScheme: (repScheme) => {

    // console.log(`repScheme: ${repScheme}`);

    if (repScheme === 'any') {
      return helpers.numGenerator(5, 20);
    }

    else if (repScheme === 'lowRepHighWeight') {
      return helpers.numGenerator(5, 7);
    }

    else if (repScheme === 'highRepLowWeight') {
      return helpers.numGenerator(13, 20);
    }

    else if (repScheme === 'mediumRepsAndWeight') {
      return helpers.numGenerator(8, 12);
    }

    else if (repScheme === '21-15-9') {
      return '21-15-9';
    }

    else {
      return 'rep scheme not valid';
    }

  },

  chooseExercises: (exerciseArray, nbrOfExercises) => {

    // console.log(`nbrOfExercises: ${nbrOfExercises}`);

    let newExerciseArray = [];

    let a = helpers.numGenerator(0, exerciseArray.length - 1);
    let b;
    let c;

    if (nbrOfExercises === 2) {
      do {
        b = helpers.numGenerator(0, exerciseArray.length - 1);
      } while (a === b);
    } 
    if (nbrOfExercises >= 3) {
      do {
        b = helpers.numGenerator(0, exerciseArray.length - 1);
      } while (a === b);
      do {
        c = helpers.numGenerator(0, exerciseArray.length - 1);
      } while (a === c || b === c);
    }

    // console.log(`a: ${a}`);
    // console.log(`b: ${b}`);
    // console.log(`c: ${c}`);

    // console.log(`exerciseArray.length: ${exerciseArray.length}`);

    if (nbrOfExercises === 1) {

      let exercise = exerciseArray[a];
      newExerciseArray.push(exercise);

    } else if (nbrOfExercises === 2) {
      
      let firstExercise = exerciseArray[a];
      let secondExercise = exerciseArray[b];
      newExerciseArray.push(firstExercise, secondExercise);

    } else if (nbrOfExercises >= 3) {

      let firstExercise = exerciseArray[a];
      let secondExercise = exerciseArray[b];
      let thirdExercise = exerciseArray[c];
      newExerciseArray.push(firstExercise, secondExercise, thirdExercise);


    } else {
      return "no newExerciseArray available";
    }

    return newExerciseArray;
    
  },

  compileExercises: (userTimer, priExercises, secExercises, conExercises, oppExercises) => {

    let wodExercises = {};
    
    // CHECK TO MAKE SURE NONE OF THE EXERCISES SELECTED ARE THE SAME EXERCISE...NO DUPLICATES ALLOWED
    function checkExercises () {

      let j;
      let f;
      let e;
      let c;

      if (wodExercises.priExercises && wodExercises.secExercises && wodExercises.oppExercises && wodExercises.conExercises) {
        for (j = 0; j < wodExercises.priExercises.length; j++) {
        
          for (f = 0; f < wodExercises.secExercises.length; f++) {
        
            for (e = 0; e < wodExercises.oppExercises.length; e++) {

              for (c = 0; c < wodExercises.conExercises.length; c++) {

                console.log(`Pri name: ${wodExercises.priExercises[j].name} :: Sec name: ${wodExercises.secExercises[f].name} :: Opp name: ${wodExercises.oppExercises[e].name} :: Con name: ${wodExercises.conExercises[c].name}`);

                if (wodExercises.priExercises[j].name === wodExercises.secExercises[f].name || wodExercises.priExercises[j].name === wodExercises.oppExercises[e].name || wodExercises.priExercises[j].name === wodExercises.conExercises[c].name) {
                  // console.log('match found!');
                  getExercises();
                }
              }
            }
          }
        }
      }

      else if (wodExercises.priExercises && wodExercises.secExercises && wodExercises.conExercises) {
        
        for (j = 0; j < wodExercises.priExercises.length; j++) {
        
          for (f = 0; f < wodExercises.secExercises.length; f++) {

            for (c = 0; c < wodExercises.conExercises.length; c++) {

              console.log(`Pri name: ${wodExercises.priExercises[j].name} :: Sec name: ${wodExercises.secExercises[f].name} :: Con name: ${wodExercises.conExercises[c].name}`);

              if (wodExercises.priExercises[j].name === wodExercises.secExercises[f].name || wodExercises.priExercises[j].name === wodExercises.conExercises[c].name) {
                // console.log('match found!');
                getExercises();
              }
            }
          }
        }
      }

      else if (wodExercises.priExercises && wodExercises.conExercises) {
        
        for (j = 0; j < wodExercises.priExercises.length; j++) {

          for (c = 0; c < wodExercises.conExercises.length; c++) {

            console.log(`Pri name: ${wodExercises.priExercises[j].name} :: Con name: ${wodExercises.conExercises[c].name}`);

            if (wodExercises.priExercises[j].name === wodExercises.conExercises[c].name) {
              // console.log('match found!');
              getExercises();
            }
          }
        }
      }

      else {
        console.log('error in checkExercises()');
      }
    }

    function getExercises() {

      // CHOOSE THE NUMBER OF EXERCISES BASED ON HOW LONG THE WOD WILL BE
      if (userTimer >= 5 && userTimer <= 8) {
        wodExercises.priExercises = helpers.chooseExercises(priExercises, 1);
        wodExercises.conExercises = helpers.chooseExercises(conExercises, 1);
      }

      if (userTimer >= 9 && userTimer <= 15) {

        nbrOfExercises = helpers.numGenerator(2, 3);

        if (nbrOfExercises === 2) {
          wodExercises.priExercises = helpers.chooseExercises(priExercises, 1);
          wodExercises.conExercises = helpers.chooseExercises(conExercises, 1);
        }
        else {
          wodExercises.priExercises = helpers.chooseExercises(priExercises, 1);
          wodExercises.secExercises = helpers.chooseExercises(secExercises, 1);
          wodExercises.conExercises = helpers.chooseExercises(conExercises, 1);
        }
        
      }

      if (userTimer >= 16 && userTimer <= 60) {

        nbrOfExercises = helpers.numGenerator(3, 6);
        // *************************************************************************************************
        nbrOfExercises = 6;
        // *************************************************************************************************

        if (nbrOfExercises === 3) {
          wodExercises.priExercises = helpers.chooseExercises(priExercises, 1);
          wodExercises.secExercises = helpers.chooseExercises(secExercises, 1);
          wodExercises.conExercises = helpers.chooseExercises(conExercises, 1);
        }
        else if (nbrOfExercises === 4) {
          wodExercises.priExercises = helpers.chooseExercises(priExercises, 1);
          wodExercises.secExercises = helpers.chooseExercises(secExercises, 1);
          wodExercises.conExercises = helpers.chooseExercises(conExercises, 2);
        }
        else if (nbrOfExercises === 5) {
          wodExercises.priExercises = helpers.chooseExercises(priExercises, 1);
          wodExercises.secExercises = helpers.chooseExercises(secExercises, 1);
          wodExercises.oppExercises = helpers.chooseExercises(oppExercises, 1);
          wodExercises.conExercises = helpers.chooseExercises(conExercises, 2);
        }
        else if (nbrOfExercises === 6) {

          wodExercises.priExercises = helpers.chooseExercises(priExercises, 1);
          wodExercises.secExercises = helpers.chooseExercises(secExercises, 2);
          wodExercises.oppExercises = helpers.chooseExercises(oppExercises, 1);
          wodExercises.conExercises = helpers.chooseExercises(conExercises, 2);
        }
      }
      // checkExercises();
    }

    getExercises();

    return wodExercises;
  },

  filterExercisesBasedOnEquipment: (exerciseArray, userEquip) => {

    let validExercises = [];

    // FILTER OUT THE EXERCISES THE USER CANNOT PERFORM BECAUSE THEY DO NOT HAVE THE NECESSARY EQUIPMENT

    // loop through each exercise in the exerciseArray
    for (let i = 0; i < exerciseArray.length; i++) {
      if (exerciseArray[i].necessaryEquip !== undefined) {
        let matches = 0;       
        // loop through each "necessaryEquip" of that exercise 
        let equipNum = exerciseArray[i].necessaryEquip;
        for (let a = 0; a < equipNum.length; a++) {
          // loop through each item in the "userEquip" array
          for (let t = 0; t < userEquip.length; t++) {
            // if the iteration of necessary equipment matches the iteration of equipment the user has, add 1 to matches variable
            if (equipNum[a] === userEquip[t]) {
              matches++;
            }
          }
          if (equipNum.length === matches) {
            validExercises.push(exerciseArray[i]);
          }
        }
      } 
      else {
        validExercises.push(exerciseArray[i]);
      }
    } 
    return validExercises;
  },

  numGenerator: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

};

















