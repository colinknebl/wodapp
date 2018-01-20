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

    if (user.timer === null) {
      user.timer = 'any';
    }

    if (user.wodType === 'any' || user.wodType === null) {
      let num = helpers.numGenerator(0, 2);
      switch (num) {
        case 0:
          user.wodType = 'amrap';
          break;
        case 1:
          user.wodType = 'singlet';
          break;
        case 2:
          user.wodType = 'couplet';
          break;
        default:
          console.log('error parsing `any` wodType. tag: 3^38gfdangliahsdg');
      }
    }

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
        console.log('wod type parse error. tag: 398tngad02%39g#f');

    }
  },

  triplet: (user, wodConst) => {
    console.log('entered triplet method');
  },

  chipper: (user, wodConst) => {
    console.log('entered chipper method');
  },

  singlet: (user, wodConst) => {

    return new Promise((resolve, reject) => {

      // VARIABLE DECLARATIONS
      let priExercises;
      let wodExercise;
      let repScheme;
      let WOD = wodConst;

      // SET TYPE
      WOD.type = 'Singlet';

      // ADD WOD INSTRUCTIONS
      WOD.instructions = 'Track weight of each set; your score is the sum of weight lifted';

      // SET TIMER
      WOD.timer = 'n/a';

      // QUERY DATABASE - SEE ARGUMENT DOCS IN MONGODB.EXERCISEQUERY METHOD
      let priExerciseQuery = mongodb.exerciseQuery({
        user: user,
        queryTypes: [
          'muscleGrp',
          'category'
        ],
        categorySearchValues: ['weightlifting']
      });

      priExerciseQuery
        .then((priExercisesQueryResults) => { 
          console.log('priExercisesQueryResults', priExercisesQueryResults.length);
          priExercisesQueryResults.forEach(exercise => console.log(exercise.name));

          // RETRIEVE PRIMARY MUSCLE GROUP EXERCISES
          priExercises = priExercisesQueryResults;

          // FILTER EXERCISES BASED ON USER'S EQUIPMENT
          priExercises = helpers.filterExercisesBasedOnEquipment.v2(priExercises, user.equip);

          // CHOOSE EXERCISE(S) TO ADD TO WOD
          wodExercise = priExercises[helpers.numGenerator(0, priExercises.length - 1)];

          // GENERATE REP COUNT FOR WOD EXERCISES
              // between 7 and 10 reps if singles
              // 5x5, 5x3, 5*10, 7*3
              // 10-5-3-1-1-1-3-5-10 = 9 sets
              // 5-5-3-3-3-1-1-1-1-1 = 10 sets

              // 7-5-3-1-1-1-1-3-5-7
              // 5-5-5-3-3-3-1-1-1-10
              // 
          let isConsistentReps = helpers.numGenerator(0, 1);

          if (isConsistentReps === 1) {
            let sets;
            let reps = helpers.numGenerator(1, 10);
            if (reps >= 1 && reps <= 3) {
              sets = helpers.numGenerator(7, 10);
            }
            else {
              sets = helpers.numGenerator(5, 10);
            }
            repScheme = '';
            for (let i = 0; i < sets; i++) {
              if (i === sets - 1) {
                repScheme += reps;
              } else {
                repScheme += reps + '-';
              }
            }
          } else {
            let repSchemePossibilities = [
              '10-5-3-1-1-1-3-5-10',
              '5-5-3-3-3-1-1-1-1-1',
              '7-5-3-1-1-1-1-3-5-7',
              '5-5-5-3-3-3-1-1-1-10',
              '5-5-5-3-3-3-1-1-1-20'
            ];
            repScheme = repSchemePossibilities[helpers.numGenerator(0, repSchemePossibilities.length)];
          }
          WOD.repScheme = repScheme;

          // ASSIGN WEIGHT TO EXERCISES
          wodExercise.weightAmount = 'n/a';

          // ADD EXERCISES TO WOD OBJECT
          if (Array.isArray(wodExercise) === false) {
            WOD.exercises = [wodExercise];
          }
          else {
            WOD.exercises = wodExercise;
          }
          console.log(wodExercise);
          

          // ADD WOD TO DATABASE
          mongodb.addWod(WOD);

          // SEND WOD BACK TO ROUTE TO SEND BACK TO CLIENT
          resolve(WOD);

        })
        .catch(err => console.error(err));

    });
  },

  couplet: (user, wodConst) => {

    return new Promise((resolve, reject) => {

      // VARIABLE DECLARATIONS
      // let firstExercise;
      // let secondExercise;
      // let wodExercises;
      // let repScheme;
      // let percentOfMax;
      // let WOD = wodConst;
      // WOD.exercises = [];
      // let maxLifts = {
      //   squat: user.maxSquat,
      //   bench: user.maxBench,
      //   snatch: user.maxSnatch,
      //   deadlift: user.maxDead
      // };
      // ***************************


      // SET TYPE
      // WOD.type = 'Couplet';
      // ***************************


      // SET TIMER
      // if (user.timer !== 'any') {
      //   WOD.timer = user.timer;
      // }
      // WOD.timer = helpers.setTimer(user.timer);
      // ***************************

      /*
        what is the wod setup style going to be?
        how many rounds in the wod?
        what are the exercises in the wod?
        how many reps of each exercise?
        is there a built-in rest between rounds?
      */


      // WOD SETUP STYLE & ROUNDS
      // let styles = [
      //   'set reps',
      //   'varied reps'
      // ];
      // let style = styles[helpers.numGenerator(0, styles.length)];
      // let rounds = helpers.assignRounds(WOD.timer, user.skillLvl);
      // WOD.rounds = rounds;
      // ***************************


      // ADD WOD INSTRUCTIONS
      // if (style === 'set reps') {
      //   WOD.instructions = `${rounds} rounds for time`;
      // } else {
      //   WOD.reps = helpers.assignVariedRepsPerRound(rounds, user.repScheme);        
      //   WOD.instructions = `${WOD.reps} reps, for time`;
      // }
      // ***************************


      // // QUERY DATABASE - GETS ALL EXERCISES THAT ARE IN THE 'CROSSFIT' CATEGORY
      // let crossfitExercisesQuery = mongodb.exerciseQuery({
      //   user: user,
      //   queryTypes: [
      //     'category',
      //     'skillLvl'
      //   ],
      //   categorySearchValues: ['crossfit'],
      //   skillLvlSearchValues: user.skillLvl
      // });
      // // ***************************


      crossfitExercisesQuery
        .then((crossfitExercisesQueryResults) => {

          // FILTER EXERCISES BASED ON USER'S EQUIPMENT
          // let validExercises = helpers.filterExercisesBasedOnEquipment.v2(crossfitExercisesQueryResults, user.equip);
          // ***************************


          // // CHOOSE EXERCISE(S) TO ADD TO WOD
          // if (user.muscleGrp === 'any') {
          //   // if the user selects 'any' for muscle group focus, choose any two exercises in any order from the 'validExercises' array
          //   firstExercise = validExercises[helpers.numGenerator(0, validExercises.length)];
          //   do {
          //     secondExercise = validExercises[helpers.numGenerator(0, validExercises.length)];  
          //   } while (firstExercise.name === secondExercise.name);
          // }
          // else {
          //   // if the user selects a specific muscle group to target, get one exercise in which the 'exercise.priMuscleGrpGeneral' is equal to the 'user.muscleGrp'
          //   let targetMuscleGrpArray = [];

          //   // add the exercises in which the 'exercise.priMuscleGrpGeneral' is what the user wants to focus on to the 'targetMuscleGrpArray'
          //   validExercises.forEach((exercise) => {
          //     if (exercise.priMuscleGrpGeneral === user.muscleGrp) {
          //       targetMuscleGrpArray.push(exercise);
          //     }
          //   });

          //   firstExercise = targetMuscleGrpArray[helpers.numGenMaxMinusOne(0, targetMuscleGrpArray.length)];
          //   do {
          //     secondExercise = validExercises[helpers.numGenMaxMinusOne(0, validExercises.length)];
          //   } 
          //   while (firstExercise.name === secondExercise.name);
          // }
          // // ***************************


          // // GENERATE REP COUNT FOR WOD EXERCISES
          // let exercises = [firstExercise, secondExercise];

          // if (style === 'set reps') {
          //   // if the style is 'set reps', the rep count is a random number based on user's desired rep scheme 
          //   exercises = helpers.assignReps(user.repScheme, exercises);
          // }
          // WOD.exercises = exercises;
          // // ***************************
          

          // ASSIGN WEIGHT TO EXERCISES
          // exercises = helpers.assignRx(exercises, maxLifts, WOD.reps, WOD.rounds, user.repScheme, user.gender);
          // ***************************


          // ADD EXERCISES TO WOD OBJECT
          // WOD.exercises = exercises;
          // ***************************


          // OPTIONAL: ADD RUN COMPONENT
          // let runNum = helpers.numGenerator(0, 10);
          // // I don't like running, so only add a run if the below criteria are met. 
          // if (runNum >= 7 && WOD.timer >= 15) {
          //   WOD = helpers.addRun(WOD);
          // }
          // else {
          //   WOD.run = false;
          // }
          // ************************


          // // ADD WOD TO DATABASE
          // mongodb.addWod(WOD);
          // // ***************************


          // // SEND WOD BACK TO ROUTE TO SEND BACK TO CLIENT
          // resolve(WOD);
          // // ***************************

        })
        .catch(err => console.error(err));
    });
  },



  amrap: (user, wodConst) => {

    return new Promise((resolve, reject) => {

      // VARIABLE DECLARATIONS
      let priExercises;
      let secExercises;
      let conExercises;
      let oppExercises;
      let wodExercises;
      let repScheme;
      let percentOfMax;
      let WOD = wodConst;
      let maxLifts = {
        squat: user.maxSquat,
        bench: user.maxBench,
        snatch: user.maxSnatch,
        deadlift: user.maxDead
      };
      // ************************


      // SET TYPE
      WOD.type = 'AMRAP';
      // ************************


      // SET TIMER
      WOD.timer = helpers.setTimer(user.timer);
      // ************************


      // set style
      // ************************


      // SET ROUNDS
      let rounds = helpers.assignRounds(WOD.timer, user.skillLvl);
      WOD.rounds = rounds;
      // ************************


      // ADD WOD INSTRUCTIONS
      WOD.instructions = 'As many rounds as possible';
      // ************************
      

      // QUERY DATABASE - SEE ARGUMENT DOCS IN MONGODB.EXERCISEQUERY METHOD
      let exerciseQuery = mongodb.exerciseQuery({
        user: user,
        queryTypes: [
          'skillLvl'
        ],
        skillLvlSearchValues: user.skillLvl
      });
      // ************************

      exerciseQuery
        .then((exerciseQueryResults) => {

          // console.log('exerciseQueryResults: ', exerciseQueryResults);

          // FILTER EXERCISES BASED ON USER'S EQUIPMENT
          exercises = helpers.filterExercisesBasedOnEquipment.v2(exerciseQueryResults, user.equip);
          // ************************


          // CHOOSE EXERCISE(S) TO ADD TO WOD
          wodExercises = helpers.compileAmrapExercises.parseExercises(exercises, user.muscleGrp);
          wodExercises = helpers.compileAmrapExercises.compileExercises(WOD.timer, wodExercises.priExercises, wodExercises.secExercises, wodExercises.conExercises, wodExercises.oppExercises);
          // ************************


          // GENERATE REP COUNT FOR WOD EXERCISES
          repScheme = helpers.generateAmrapRepScheme(user.repScheme);
          WOD.repScheme = repScheme;
          // ************************


          // ASSIGN WEIGHT TO EXERCISES
          let exerciseArray = [];
          if (wodExercises.priExercises) {
            wodExercises.priExercises.forEach((exercise) => {
              exercise.position = 'pri';
              exerciseArray.push(exercise);
            });
          }
          if (wodExercises.conExercises) {
            wodExercises.conExercises.forEach((exercise) => {
              exercise.position = 'con';
              exerciseArray.push(exercise);
            });
          }
          if (wodExercises.secExercises) {
            wodExercises.secExercises.forEach((exercise) => {
              exercise.position = 'sec';
              exerciseArray.push(exercise);
            });
          }
          if (wodExercises.oppExercises) {
            wodExercises.oppExercises.forEach((exercise) => {
              exercise.position = 'opp';
              exerciseArray.push(exercise);
            });
          }
          // the exercise needs an exercise.reps key/value pair in order to assign the weight
          exerciseArray.forEach((exercise) => {
            exercise.reps = repScheme;
          });
          wodExercises = helpers.assignRx(exerciseArray, maxLifts, null, WOD.rounds, WOD.repScheme, user.gender);
          // ************************


          // SEQUENCE WOD
          let wodSequence = helpers.sequenceWodExercises(wodExercises);
          // ************************


          // ADD EXERCISES TO WOD OBJECT
          WOD.exercises = wodSequence;
          // ************************


          // OPTIONAL: ADD RUN COMPONENT
          let runNum = helpers.numGenerator(0, 10);
          // I don't like running, so only add a run if the below criteria are met. 
          if (runNum >= 7 && WOD.timer >= 15) {
            WOD = helpers.addRun(WOD);
          }
          else {
            WOD.run = false;
          }
          // ************************


          // ADD WOD TO DATABASE
          mongodb.addWod(WOD);
          // ************************


          // SEND WOD BACK TO ROUTE TO SEND BACK TO CLIENT
          resolve(WOD);
          // ************************

        })
        .catch((err) => console.error(err));
    });  
  }
};

module.exports = wodGenerator;









helpers = {
  
  addRun: (WOD) => {

    const run = { 
      name: 'Run',
      level: 'bronze',
      skillLevel: 'beginner',
      category: [
        "metabolic conditioning"
      ],
      "weighted" : false,
      "distance" : {
        "range" : [0.5, 5],
        "short" : [0.5, 1],
        "med" : [2, 2],
        "long" : [3, 3],
        "unit" : "mile(s)"
      }
    };

    if ((WOD.timer / WOD.rounds) >= 8) {
      WOD.rounds = WOD.rounds - 1;  
      run.weightAmount = '1 mile';
    }
    else {
      WOD.rounds = WOD.rounds - 2;
      run.weightAmount = '2 miles';
    }

    WOD.exercises.forEach(exercise => {
      let reps = exercise.reps * WOD.rounds;
      reps = helpers.roundNum(reps);
      exercise.reps = reps;
    });

    // add to beginning or end or both
    let num = helpers.numGenerator(0, 2);
    if (num === 0) {
      WOD.exercises.unshift(run);
    }
    else if (num === 2 && run.weightAmount === '2 miles') {
      run.weightAmount = '1 mile';
      WOD.exercises.unshift(run);
      WOD.exercises.push(run);
    }
    else {
      WOD.exercises.push(run);
    }

    WOD.run = true;
    WOD.instructions = `For time. ${WOD.timer} minute time cap.`;

    return WOD;
  },






  compileAmrapExercises: {

    parseExercises: (exercises, muscleGrp) => {

      let priExercises = [];
      let secExercises = [];
      let conExercises = [];
      let oppExercises = [];
      console.log('muscleGrp:',muscleGrp);
      exercises.forEach((exercise) => {


        console.log(exercise);
        let oppMuscleGrp;

          switch (muscleGrp) {
            case "chest":
              oppMuscleGrp = "back";
              break;
            case "back":
              oppMuscleGrp = "chest";
              break;
            case "legs":
              oppMuscleGrp = "legs";
              break;
            case "shoulders":
              oppMuscleGrp = "shoulders";
              break;
            default:
              console.log(`error in opposing muscle group assignment for ${exercise.name}. tag: a4erw8y+yrtey5`);
          }


        // filter the exercises in which the exercise.priMuscleGrpGeneral === the muscleGrp and includes either the weightlifting or body building categories
        if (exercise.priMuscleGrpGeneral === muscleGrp || exercise.priMuscleGrpGeneral === 'multi') {

          let addedToPri = false;
          exercise.category.forEach((category) => {
            if (category === 'weightlifting' || category === 'body building') {
              // console.log('primary before: ', exercise.name);
              if (addedToPri === true) {
                return;
              }
              // console.log('primary after: ', exercise.name);
              priExercises.push(exercise);
              addedToPri = true;
            }
            else {
              if (addedToPri === true) {
                return;
              }
              secExercises.push(exercise);
              addedToPri = true;
            }
          });
        }
        else {

          exercise.category.forEach((category) => {
            if (category === 'metabolic conditioning') {
              // console.log('conditioning: ', exercise.name);
              conExercises.push(exercise);
            }
          });

          if (exercise.muscleGrps) {
            exercise.muscleGrps.forEach((exerciseMuscleGrp) => {
              if (exerciseMuscleGrp === oppMuscleGrp) {
                // console.log('secondary: ', exercise.name);
                oppExercises.push(exercise);
              }
            });
          }

        }
      });

      return {
        priExercises: priExercises,
        secExercises: secExercises,
        conExercises: conExercises,
        oppExercises: oppExercises
      };
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

                  // console.log(`Pri name: ${wodExercises.priExercises[j].name} :: Sec name: ${wodExercises.secExercises[f].name} :: Opp name: ${wodExercises.oppExercises[e].name} :: Con name: ${wodExercises.conExercises[c].name}`);

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

                // console.log(`Pri name: ${wodExercises.priExercises[j].name} :: Sec name: ${wodExercises.secExercises[f].name} :: Con name: ${wodExercises.conExercises[c].name}`);

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

              // console.log(`Pri name: ${wodExercises.priExercises[j].name} :: Con name: ${wodExercises.conExercises[c].name}`);

              if (wodExercises.priExercises[j].name === wodExercises.conExercises[c].name) {
                // console.log('match found!');
                getExercises();
              }
            }
          }
        }

        else {
          console.log('error in checkExercises(). tag: 4309gn341tg+f0934');
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
    }
  },







  // assignRx: (exerciseArray, maxLifts, reps, rounds, repScheme, gender) => {
    /*
      exerciseArray = array
      maxLifts = object
      reps = string <= optional, may be null or undefined
      rounds = number
      repScheme = string
      gender = string
    */

    // const newExerciseArray = [];

    // // IF THE REP COUNT IS VARIED, GET THE AVERAGE REPS PERFORMED PER ROUND - THE AVERAGE IS THEN USED TO ASSIGN THE WEIGHT USED FOR THAT EXERCISE
    // let average;
    // if (reps) {
      
    //   let repSchemeArray = [];
    //   let number = '';

    //   for (let i = 0; i < reps.length; i++) {

    //     if (reps[i] === '-') {
    //       number = Number.parseInt(number);
    //       repSchemeArray.push(number);
    //       number = '';
    //     }
    //     else if (i === (reps.length - 1)) {
    //       number += reps[i];
    //       number = Number.parseInt(number);
    //       repSchemeArray.push(number);
    //     }
    //     else if (reps[i] !== '-') {
    //       number += reps[i];
    //     }
    //     else {
    //       console.log('error finding average. tag: 3890qn5bad-26');
    //     }
    //   }
    //   let sum = 0;

    //   repSchemeArray.forEach((repRound) => {
    //     sum = sum + repRound;
    //   });
    //   average = sum / repSchemeArray.length;
    // }


    // function assignWeight(exercise) {

    //   // ASSIGN A VALUE TO maxLift
    //   let maxLift;
    //   switch (exercise.maxOfExercise) {
    //     case 'bench':
    //       maxLift = maxLifts.bench;
    //       break;
    //     case 'squat':
    //       maxLift = maxLifts.squat;
    //       break;
    //     case 'deadlift':
    //       maxLift = maxLifts.deadlift;
    //       break;
    //     case 'snatch':
    //       maxLift = maxLifts.snatch;
    //       break;
    //     default:
    //       console.log(`error assigning 'maxLift' for exercise ${exercise.name}. tag: 39dhtn38dfh`);
    //   }

    //   // ASSIGN A VALUE TO "weightFactor"
    //   let weightFactor;
    //   if (exercise.reps <= 2 || average <= 2 || repScheme <= 2) {
    //     weightFactor = 0.95;
    //   }
    //   else if (
    //     (exercise.reps > 2 && exercise.reps <= 4) 
    //     || 
    //     (average > 2 && average <= 4)
    //     ||
    //     (repScheme > 2 && repScheme <= 4)) 
    //     {
    //       weightFactor = 0.9;
    //   }
    //   else if (
    //     (exercise.reps > 4 && exercise.reps <= 6) 
    //     || 
    //     (average > 4 && average <= 6)
    //     ||
    //     (repScheme > 4 && repScheme <= 6)) 
    //     {
    //       weightFactor = 0.85;
    //   }
    //   else if (
    //     (exercise.reps > 6 && exercise.reps <= 11) 
    //     || 
    //     (average > 6 && average <= 11)
    //     ||
    //     (repScheme > 6 && repScheme <= 11))
    //     {
    //       weightFactor = 0.8;
    //   }
    //   else if (
    //     (exercise.reps > 11 && exercise.reps <= 19) 
    //     || 
    //     (average > 11 && average <= 19)
    //     ||
    //     (repScheme > 11 && repScheme <= 19))
    //     {
    //       weightFactor = 0.7;
    //   }
    //   else if (
    //     (exercise.reps > 19 && exercise.reps <= 29) 
    //     || 
    //     (average > 19 && average <= 29)
    //     ||
    //     (repScheme > 19 && repScheme <= 29))
    //     {
    //       weightFactor = 0.5;
    //   }
    //   else if (
    //     (exercise.reps >= 30)
    //     || 
    //     (average >= 30)
    //     ||
    //     (repScheme >= 30)) 
    //     {
    //       weightFactor = 0.4;
    //   }
    //   else {
    //     console.log(`error in assigning weight factor for '${exercise.name}'. tag: asdoip215`);
    //   }

    //   // ASSIGN THE EXERCISE weightAmount
    //   let weightAmount = Math.floor(maxLift * exercise.percentOfMax * weightFactor);
    //   weightAmount = helpers.roundNum(weightAmount);
    //   exercise.weightAmount = weightAmount + ' lbs';

    //   // ADD THE EXERCISE WITH THE WEIGHT ASSIGNED TO newExerciseArray
    //   newExerciseArray.push(exercise);
    // }


    // // ASSIGN THE COUNT FOR MOUNTAIN CLIMBERS
    // function assignMtClimbersCount(climbers) {

    //   let count;
    //   let reps = climbers.repScheme;

    //   if (repScheme === 'any') {
    //     count = helpers.numGenerator(reps.range[0], reps.range[1]);
    //   }
    //   else if (repScheme === 'lowRepHighWeight') {
    //     count = helpers.numGenerator(reps.low[0], reps.low[1]);
    //   }
    //   else if (repScheme === 'mediumRepsAndWeight') {
    //     count = helpers.numGenerator(reps.mid[0], reps.mid[1]);
    //   }
    //   else if (repScheme === 'highRepLowWeight') {
    //     count = helpers.numGenerator(reps.high[0], reps.high[1]);
    //   }
    //   else {
    //     console.log('error in assigning mountain climbers amount. tag: jt65+g53qg51');
    //   }
    //   count = helpers.roundNum(count);
    //   climbers.weightAmount = count + ' four count';
    //   newExerciseArray.push(climbers);
    // }


    // // ASSIGN THE COUNT FOR JUMP ROPE
    // function assignJumpRopeCount(exercise) {

    //   let count;
    //   let reps = exercise.repScheme;

    //   if (repScheme === 'any') {
    //     count = helpers.numGenerator(reps.range[0], reps.range[1]);
    //   }
    //   else if (repScheme === 'lowRepHighWeight') {
    //     count = helpers.numGenerator(reps.low[0], reps.low[1]);
    //   }
    //   else if (repScheme === 'mediumRepsAndWeight') {
    //     count = helpers.numGenerator(reps.mid[0], reps.mid[1]);
    //   }
    //   else if (repScheme === 'highRepLowWeight') {
    //     count = helpers.numGenerator(reps.high[0], reps.high[1]);
    //   }
    //   else {
    //     console.log('error in assigning jump rope count. tag: nv410dq%e0g');
    //   }
    //   count = helpers.roundNum(count);
    //   exercise.weightAmount = count;
    //   newExerciseArray.push(exercise);
    // }


    // // ASSIGN DISTANCE FOR SPRINTS
    // function assignDistance(exercise) {
    //   rounds = 1;

    //   let dist = exercise.distance;
    //   let distance;
    //   if (rounds >= 1 && rounds <= 2) {
    //     distance = helpers.numGenerator(dist.long[0], dist.long[1]);
    //   }
    //   else if (rounds > 2 && rounds <= 5) {
    //     distance = helpers.numGenerator(dist.med[0], dist.med[1]);
    //   }
    //   else if (rounds > 5) {
    //     distance = helpers.numGenerator(dist.short[0], dist.short[1]);
    //   }
    //   else {
    //     console.error(`error in assigning ${exercise.name} distance. tag: 57aa55g09dnt`);
    //   }

    //   if(exercise.name === "Handstand Walk") {
    //     distance = helpers.roundNum(distance);
    //     exercise.weightAmount = `${distance} ${exercise.distance.unit}`;
    //   }
    //   else if (exercise.name === "Sprint") {
    //     exercise.weightAmount = `${distance * 100} ${exercise.distance.unit}`;
    //   }
    //   else if (exercise.name !== "Handstand Walk" && exercise.name !== "Sprint") {
    //     exercise.weightAmount = `${distance} ${exercise.distance.unit}`;
    //   }
    //   else {
    //     console.error(`error in assigning ${exercise.name} weightAmount. tag: 849dfng-dadgne^f`);
    //   }
    //   newExerciseArray.push(exercise);
    // }



    // function distOrCal(exercise) {

    //   // choose whether the weight amount will be distance or calories
    //   let choice = helpers.numGenerator(0, 1);

    //   if (choice === 1) {

    //     let cal = exercise.calories;
    //     let calories;
    //     if (rounds >= 1 && rounds <= 2) {
    //       calories = helpers.numGenerator(cal.high[0], cal.high[1]);
    //     }
    //     else if (rounds > 2 && rounds <= 5) {
    //       calories = helpers.numGenerator(cal.mid[0], cal.mid[1]);
    //     }
    //     else if (rounds > 5) {
    //       calories = helpers.numGenerator(cal.low[0], cal.low[1]);
    //     }
    //     else {
    //       console.error(`error in assigning ${exercise.name} calories. tag: gbf38^3idjg77afn`);
    //     }
    //     calories = helpers.roundNum(calories);
    //     exercise.weightAmount = `${calories} ${exercise.calories.unit}`;
    //   }
    //   else {

    //     let dist = exercise.distance;
    //     let distance;
    //     if (rounds >= 1 && rounds <= 2) {
    //       distance = helpers.numGenerator(dist.long[0], dist.long[1]);
    //     }
    //     else if (rounds > 2 && rounds <= 5) {
    //       distance = helpers.numGenerator(dist.med[0], dist.med[1]);
    //     }
    //     else if (rounds > 5) {
    //       distance = helpers.numGenerator(dist.short[0], dist.short[1]);
    //     }
    //     else {
    //       console.error(`error in assigning ${exercise.name} distance. tag: 48g3j%^fugnq0v4g68/`);
    //     }
    //     exercise.weightAmount = `${distance * 100} ${exercise.distance.unit}`;
    //   }
    //   newExerciseArray.push(exercise);
    // }




    // function assignCalories(exercise) {

    //   let cal = exercise.calories;
    //   let calories;
    //   if (rounds >= 1 && rounds <= 2) {
    //     calories = helpers.numGenerator(cal.high[0], cal.high[1]);
    //   }
    //   else if (rounds > 2 && rounds <= 5) {
    //     calories = helpers.numGenerator(cal.mid[0], cal.mid[1]);
    //   }
    //   else if (rounds > 5) {
    //     calories = helpers.numGenerator(cal.low[0], cal.low[1]);
    //   }
    //   else {
    //     console.error(`error in assigning ${exercise.name} calories. tag: 5fk40tb28&ak$e`);
    //   }
    //   calories = helpers.roundNum(calories);
    //   exercise.weightAmount = `${calories} calories`;
    //   newExerciseArray.push(exercise);
    // }



    // function assignWeightByGender(exercise) {
    //   if (gender === 'female') {
    //     exercise.weightAmount = `${exercise.weight.female} ${exercise.weight.unit}`;
    //   }
    //   else {
    //     exercise.weightAmount = `${exercise.weight.male} ${exercise.weight.unit}`;
    //   }
    //   newExerciseArray.push(exercise);
    // }


    // // ASSIGN WEIGHT TO EXERCISES IN WHICH THE VALUE OF "weighted" IS "either"
    // function assignEither(exercise) {
    //   let ex;
    //   if (repScheme > 19 || reps > 19 || average > 19) {
    //     ex = exercise.weightAmount = "BW";
    //     newExerciseArray.push(ex);
    //   }
    //   else {
    //     assignWeight(exercise);
    //   }
    // }


    // console.log('rounds:', rounds);
    // console.log('repScheme:', repScheme);
    // console.log('average:',average);
    // console.log('maxLifts:',maxLifts);
    // console.log('reps:',reps);
    // console.log('gender:',gender);
    

    // // LOOP THROUGH EACH EXERCISE AND SEND IT TO A FUNCTION TO CALCULATE weightAmount
    // exerciseArray.forEach((exercise) => {
      
    //   if (exercise.weightAmount) {
    //     newExerciseArray.push(exercise);
    //   }

    //   else if (exercise.weighted === true && 'percentOfMax' in exercise) {
    //     assignWeight(exercise);
    //   }

    //   else if ('distance' in exercise && 'calories' in exercise) {
    //     distOrCal(exercise);
    //   }

    //   else if ('calories' in exercise) {
    //     assignCalories(exercise);
    //   }

    //   else if ('distance' in exercise) {
    //     assignDistance(exercise);
    //   }

    //   else if (exercise.weighted === "gender") {
    //     assignWeightByGender(exercise);
    //   }

    //   else if (exercise.name === 'Mountain Climbers' && reps === undefined) {
    //     assignMtClimbersCount(exercise);
    //   }

    //   else if (exercise.necessaryEquip == 'jump rope' && reps === undefined) {
    //     assignJumpRopeCount(exercise);
    //   }

    //   else if (exercise.weighted === false && reps !== undefined) {
    //     exercise.weightAmount = 'n/a';
    //     newExerciseArray.push(exercise);
    //   }

    //   else if (exercise.assisted === true) {
    //     exercise.weightAmount = 'assisted';
    //     newExerciseArray.push(exercise);
    //   }

    //   else if (exercise.weighted === 'either') {
    //     assignEither(exercise);
    //   }

    //   else {
    //     console.log(`error parsing exercise while assigning weight for: '${exercise.name}'. tag: 213554sdafasd`);
    //   }

    // });

    // newExerciseArray.forEach((exercise, index) => {
    //   console.log(`${index+1}. ${exercise.name} :: ${exercise.weightAmount}`);
    // });

    // return newExerciseArray;
  // },






  // assignVariedRepsPerRound: (rounds, desiredRepScheme) => {
    
  //   let reps;
  //   let repsStart;
  //   let repsString = '';
  //   let repIncrements = [
  //     [1, 2],
  //     [3, 4],
  //     [5, 6],
  //     [7, 8, 10]
  //   ];
  //   let repIncArray;
  //   let repIncrement;
    
    
  //   // CHOOSE IF ASCENDING OR DESCENDING REP INCREMENTS
  //   let repTypes = ['ascending', 'descending'];
  //   let repType = repTypes[helpers.numGenMaxMinusOne(0, repTypes.length)];
    
    
  //   // CHOOSE THE INCREMENT AMOUNT FOR DESCENDING REP SCHEMES
  //   function chooseDescendingIncrement(repsStart) {

  //     let descendingRepIncrements = [
  //       []
  //     ];

  //     let count = 0;
  //     do { 
  //       if (repsStart > 0 && repsStart <= 20) {
  //         // rep increment possibilities: 1 or 2
  //         repIncArray = repIncrements[0];
  //         repIncrement = repIncArray[helpers.numGenMaxMinusOne(0, repIncArray.length)];
  //       }
  //       else if (repsStart > 20 && repsStart <= 29) {
  //         // rep increment possibilities: 3 - 6
  //         repIncArray = repIncrements[helpers.numGenMaxMinusOne(1, repIncrements.length - 1)];
  //         repIncrement = repIncArray[helpers.numGenMaxMinusOne(0, repIncArray.length)];
  //       }
  //       else if (repsStart > 29) {
  //         // rep increment possibilities: 5 - 8, 10
  //         repIncArray = repIncrements[helpers.numGenMaxMinusOne(2, repIncrements.length)];
  //         repIncrement = repIncArray[helpers.numGenMaxMinusOne(0, repIncArray.length)];
  //       }
  //       else {
  //         console.log('error in choosing descending rep increment. tag: 2667a4t6gfahhh');
  //       }
  //       count++;
  //     } while (repsStart - (rounds * repIncrement) < 1 && count < 10);

  //     if (count >= 9 && repIncrement < 1) {
  //       repIncrement = 4;
  //     }

  //     return repIncrement;
  //   }


  //   // CHOOSE THE INCREMENT AMOUNT FOR ASCENDING REP SCHEMES
  //   function chooseAscendingIncrement(repsStart) {

  //     if (repsStart > 0 && repsStart <= 20) {
  //       // rep increment possibilities: 3 - 8, 10
  //       repIncArray = repIncrements[helpers.numGenMaxMinusOne(1, repIncrements.length)];
  //       repIncrement = repIncArray[helpers.numGenMaxMinusOne(0, repIncArray.length)];
  //     }
  //     else if (repsStart > 20 && repsStart <= 30) {
  //       // rep increment possibilities: 3 - 6
  //       repIncArray = repIncrements[helpers.numGenMaxMinusOne(1, repIncrements.length - 1)];
  //       repIncrement = repIncArray[helpers.numGenMaxMinusOne(0, repIncArray.length )];
  //     }
  //     else if (repsStart > 30) {
  //       // if the repsStart is greater than 30, the reps will be consistent throughout each round
  //       repIncrement = 0;
  //     }
  //     else {
  //       console.log('error in choosing ascending rep increment.');
  //     }

  //     return repIncrement;
  //   }


  //   // ASSIGNS REPS TO EACH ROUND
  //   function assignReps(repsStart, repIncrement) {

  //     let repArray = [];

  //     repArray.push(repsStart);
 
  //     if (repType === 'ascending') {
  //       for (let i = 1; i < rounds; i++) {

  //         nextRep = repArray.splice(repArray.length - 1, 1);
  //         repArray.push(nextRep[0]);
  //         addRep = Number.parseInt(nextRep) + Number.parseInt(repIncrement);         
  //         repArray.push(addRep);
  //       }
  //     }
  //     else {
  //       for (let i = 1; i < rounds; i++) {

  //         nextRep = repArray.splice(repArray.length - 1, 1);
  //         repArray.push(nextRep[0]);
  //         addRep = Number.parseInt(nextRep) - Number.parseInt(repIncrement);         
  //         repArray.push(addRep);
  //       }
  //     }

  //     return repArray;
  //   }


  //   // FIXES REP SCHEMES THAT INCLUDE NEGATIVE NUMBERS BY ADDING THE INCREMENT
  //   function fixRepsAssignment(newRepArray, inc) {

  //     let fixedArray = [];

  //     newRepArray.forEach((roundReps) => {
  //       if (roundReps < 1) {
  //         roundReps = fixedArray[fixedArray.length - 1] + inc;
  //         fixedArray.push(roundReps);
  //       }
  //       else {
  //         fixedArray.push(roundReps);
  //       }

  //     });

  //     return fixedArray;

  //   }


  //   // CONVERTS THE REP ARRAY TO A STRING
  //   function toString(newRepArray) {

  //     for (let i = 0; i < newRepArray.length; i++) {
  //       reps = newRepArray[i] + '';
        
  //       if (i === newRepArray.length - 1) {
  //         repsString += reps;
  //       }
  //       else {
  //         repsString += reps + '-';
  //       }
  //     }

  //     return repsString;
  //   }


  //   // FIND THE REPS IN THE FIRST ROUND
  //   if (desiredRepScheme === 'lowRepHighWeight') {
  //     repsStart = helpers.numGenerator(3, 9);
  //   }
  //   else if (desiredRepScheme === 'mediumRepsAndWeight') {
  //     repsStart = helpers.numGenerator(10, 24);
  //   }
  //   else if (desiredRepScheme === 'highRepLowWeight') {
  //     repsStart = helpers.numGenerator(25, 50);
  //   } 
  //   else {
  //     repsStart = helpers.numGenerator(3, 50);
  //   }

  //   if (rounds > 3) {
  //     repsStart = helpers.roundNum(repsStart);
  //   }
    

  //   // console.log(`varied reps; rounds: ${rounds}`);
  //   // console.log(`desiredRepScheme: ${desiredRepScheme}`);
  //   // console.log(`repType: ${repType}`);
  //   // console.log(`repsStart: ${repsStart}`);
    

  //   // ADD OR SUBTRACT REPS FROM EACH ROUND
  //   let inc;
  //   if (repType === 'descending') {
  //     inc = chooseDescendingIncrement(repsStart);
  //   }
  //   else {
  //     inc = chooseAscendingIncrement(repsStart);
  //   }

  //   // IF THE REP ARRAY INCLUDES ANY NUMBER LESS THAN 1, THE INCREMENT IS ADDED TO THE ROUND INSTEAD OF SUBTRACTED. THIS WILL ENSURE THE REP SCHEME DOES NOT ASSIGN A ROUND WITH NEGATIVE REPS.
  //   newRepArray = assignReps(repsStart, inc);
  //   if (newRepArray[newRepArray.length - 1] < 1) {
  //     newRepArray = fixRepsAssignment(newRepArray, inc);
  //   }

  //   // CONVERT THE ARRAY OF REPS IN EACH ROUND TO A STRING SEPERATED BY DASHES
  //   repsString = toString(newRepArray);

  //   return repsString;
  // },







  // assignRounds: (timer, skillLvl) => {
  //   /*
  //     Arguments:
  //     1. timer = the user.timer from form submission
  //     2. skillLvl = the user.skillLvl from form submission

  //     Function:
  //     Assign the number of rounds based on the user's skill level. The more skilled the user is, the less time per round assigned. Additionally, as the rounds progress the user is alloted more time to complete the rounds. 
  //   */

  //   let rounds;

  //   if (skillLvl === 'beginner') {
  //     if (timer > 0 && timer <= 6) {
  //       rounds = 1;
  //     }
  //     else if (timer > 6 && timer <= 12) {
  //       rounds = 2;
  //     }
  //     else if (timer > 12 && timer <= 19) {
  //       rounds = 3;
  //     }
  //     else if (timer > 19 && timer <= 26) {
  //       rounds = 4;
  //     }
  //     else if (timer > 26 && timer <= 34) {
  //       rounds = 5;
  //     }
  //     else if (timer > 34 && timer <= 42) {
  //       rounds = 6;
  //     }
  //     else if (timer > 42 && timer <= 51) {
  //       rounds = 7;
  //     }
  //     else if (timer > 51) {
  //       rounds = 8;
  //     }
  //     else {
  //       console.log("error calculating 'beginner' rounds. tag: adg7924ba058s");
  //     }
  //   }
  //   else if (skillLvl === 'intermediate') {
  //     if (timer > 0 && timer <= 5) {
  //       rounds = 1;
  //     }
  //     else if (timer > 5 && timer <= 10) {
  //       rounds = 2;
  //     }
  //     else if (timer > 10 && timer <= 16) {
  //       rounds = 3;
  //     }
  //     else if (timer > 16 && timer <= 22) {
  //       rounds = 4;
  //     }
  //     else if (timer > 22 && timer <= 28) {
  //       rounds = 5;
  //     }
  //     else if (timer > 28 && timer <= 35) {
  //       rounds = 6;
  //     }
  //     else if (timer > 35 && timer <= 42) {
  //       rounds = 7;
  //     }
  //     else if (timer > 42 && timer <= 50) {
  //       rounds = 8;
  //     }
  //     else if (timer > 50) {
  //       rounds = 9;
  //     }
  //     else {
  //       console.log("error calculating 'intermediate' rounds. tag: sd0g9u8dfg96sdf8g");
  //     }
  //   }
  //   else if (skillLvl === 'advanced') {
  //     if (timer > 0 && timer <= 4) {
  //       rounds = 1;
  //     }
  //     else if (timer > 4 && timer <= 8) {
  //       rounds = 2;
  //     }
  //     else if (timer > 8 && timer <= 13) {
  //       rounds = 3;
  //     }
  //     else if (timer > 13 && timer <= 18) {
  //       rounds = 4;
  //     }
  //     else if (timer > 18 && timer <= 24) {
  //       rounds = 5;
  //     }
  //     else if (timer > 24 && timer <= 30) {
  //       rounds = 6;
  //     }
  //     else if (timer > 30 && timer <= 37) {
  //       rounds = 7;
  //     }
  //     else if (timer > 37 && timer <= 44) {
  //       rounds = 8;
  //     }
  //     else if (timer > 44 && timer <= 52) {
  //       rounds = 9;
  //     }
  //     else if (timer > 52) {
  //       rounds = 10;
  //     }
  //     else {
  //       console.log("error calculating 'advanced' rounds. tag: 215;jb145;1465624");
  //     }
  //   }
  //   else if (skillLvl === 'athlete') {
  //     if (timer > 0 && timer <= 3) {
  //       rounds = 1;
  //     }
  //     else if (timer > 3 && timer <= 6) {
  //       rounds = 2;
  //     }
  //     else if (timer > 6 && timer <= 10) {
  //       rounds = 3;
  //     }
  //     else if (timer > 10 && timer <= 14) {
  //       rounds = 4;
  //     }
  //     else if (timer > 14 && timer <= 19) {
  //       rounds = 5;
  //     }
  //     else if (timer > 19 && timer <= 24) {
  //       rounds = 6;
  //     }
  //     else if (timer > 24 && timer <= 30) {
  //       rounds = 7;
  //     }
  //     else if (timer > 30 && timer <= 36) {
  //       rounds = 8;
  //     }
  //     else if (timer > 36 && timer <= 43) {
  //       rounds = 9;
  //     }
  //     else if (timer > 43 && timer <= 50) {
  //       rounds = 10;
  //     }
  //     else if (timer > 50) {
  //       rounds = 12;
  //     }
  //     else {
  //       console.log("error calculating 'athlete' rounds. tag: q9wre84@6q8er846f4");
  //     }
  //   }

  //   return rounds;
  // },






  // assignReps: (desiredRepScheme, exerciseArray) => {
  //   /*
  //      SEE documentation.txt FOR MORE DETAILS
  //   */

  //   let reps;
  //   let exercisesWithRepsAssigned = [];

  //   // console.log(' ^^^^^^^^^^^^^^^^ ');
  //   // console.log(desiredRepScheme);
  //   // console.log(exerciseArray);
  //   // console.log(' ^^^^^^^^^^^^^^^^ ');

  //   desiredRepScheme = 'highRepLowWeight';

  //   exerciseArray.forEach((exercise) => {
  //     if ('repScheme' in exercise) {
  //       if (desiredRepScheme === 'lowRepHighWeight') {
  //         exercise.reps = helpers.numGenerator(exercise.repScheme.low[0], exercise.repScheme.low[1]);
  //       }
  //       else if (desiredRepScheme === 'highRepLowWeight') {
  //         reps = helpers.numGenerator(exercise.repScheme.high[0], exercise.repScheme.high[1]);
  //         reps = helpers.roundNum(reps);
  //         exercise.reps = reps;
  //       }
  //       else if (desiredRepScheme === 'mediumRepsAndWeight') {
  //         reps = helpers.numGenerator(exercise.repScheme.mid[0], exercise.repScheme.mid[1]);
  //         if (reps >= 25) {reps = helpers.roundNum(reps); }
  //         exercise.reps = reps;
  //       }
  //       else {
  //         reps = helpers.numGenerator(exercise.repScheme.range[0], exercise.repScheme.range[1]);
  //         if (reps >= 25) {reps = helpers.roundNum(reps); }
  //         exercise.reps = reps;
  //       }
  //     }
  //     else {
  //       console.log(`error in assigning reps to exercise or reps not applicable -- exercise: ${exercise.name}. tag: 23508ugna8gh44`);
  //       exercise.reps = 'n/a';
  //     }

  //     exercisesWithRepsAssigned.push(exercise);
  //   });

  //   return exercisesWithRepsAssigned;
  // },

  




  // roundNum: (num) => {
  //   let returnNum;
  //   num = num + '';

  //   let originalNum = num.slice(0, num.length - 1);

  //   let roundedNum = num.slice(-1);
  //   if (roundedNum < 2.5) {
  //     roundedNum = 0;
  //     returnNum = originalNum + roundedNum;
  //   }
  //   else if (roundedNum >= 2.5 && roundedNum <= 7.4) {
  //     roundedNum = 5;
  //     returnNum = originalNum + roundedNum;
  //   }
  //   else  {
  //     let upNum = num.slice(num.length - 2, num.length - 1);
  //     upNum++;
  //     upNum = upNum + '0';
  //     originalNum = num.slice(0, num.length - 2);
  //     returnNum = originalNum + upNum;
  //   }
    
  //   returnNum = Number.parseInt(returnNum);

  //   return returnNum;
  // },

  




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
    timer = helpers.roundNum(timer);
    return timer;
  },

  




  sequenceWodExercises: (wodExercises) => {

    let priArray = [];
    let secArray = [];
    let conArray = [];
    let oppArray = [];
    wodExercises.forEach((exercise) => {
      if (exercise.position === 'pri') {
        priArray.push(exercise);
      }
      else if (exercise.position === 'sec') {
        secArray.push(exercise);
      }
      else if (exercise.position === 'con') {
        conArray.push(exercise);
      }
      else if (exercise.position === 'opp') {
        oppArray.push(exercise);
      }
      else {
        console.log('error parsing exercise. tag: &49oadsg28gj4mff7u');
      }
    });

    let pri = priArray.length;
    let con = conArray.length;
    let sec;
    let opp;
    let wodExerciseSequence = [];


    if (secArray.length > 0) {
      sec = secArray.length;
    } else { sec = 0; }
    if (oppArray.length > 0) {
      opp = oppArray.length;
    } else { opp = 0; }


    if (pri === 1 && sec === 2 && opp === 1 && con === 2) {
      wodExerciseSequence.push(
        priArray[0], 
        secArray[0],
        conArray[0],
        oppArray[0],
        secArray[1],
        conArray[1]
      );
    }
    else if (pri === 1 && sec === 1 && opp === 1 && con === 2) {
      wodExerciseSequence.push(
        priArray[0],
        conArray[0],
        oppArray[0],
        secArray[0],
        conArray[1]
      );
    }
    else if (pri === 1 && sec === 1 && con === 2) {
      wodExerciseSequence.push(
        priArray[0],
        conArray[0],
        secArray[0],
        conArray[1]
      );
    }
    else if (pri === 1 && sec === 1 && con === 1) {
      wodExerciseSequence.push(
        priArray[0],
        secArray[0], 
        conArray[0]
      );
    }
    else if (pri === 1 && con === 1) {
      wodExerciseSequence.push(
        priArray[0], 
        conArray[0]
      );
    }
    else {
      console.log('error sequencing WOD. tag: f9gnafg^209dganas');
    }

    return wodExerciseSequence;
  },

  




  assignRxWeightAmrap: (repCount, percentOfMax, wodExercises, user) => {

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
          wodExercises.priExercises[i].weightAmount = getWeight(wodExercises.priExercises[i].priMuscleGrpGeneral, wodExercises.priExercises[i].percentOfMax);
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
          wodExercises.secExercises[a].weightAmount = getWeight(wodExercises.secExercises[a].priMuscleGrpGeneral, wodExercises.secExercises[a].percentOfMax);
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
          wodExercises.oppExercises[e].weightAmount = getWeight(wodExercises.oppExercises[e].priMuscleGrpGeneral, wodExercises.oppExercises[e].percentOfMax);
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

  




  generateAmrapRepScheme: (repScheme) => {

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

  




  filterExercisesBasedOnEquipment: {
    v1: (exerciseArray, userEquip) => {

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
              // if the value of matches is equal to the amount of the number of equipment needed in the "necessaryEquip" array, add the exercise to the "validExercises" array.
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





    v2: (exerciseArray, userEquip) => {

      let validExercises = [];

      // FILTER OUT THE EXERCISES THE USER CANNOT PERFORM BECAUSE THEY DO NOT HAVE THE NECESSARY EQUIPMENT

      function needOneEquipConfig(exercise) {

        let arrayMatch = 0;
        let added = false;
        userEquip.forEach((userEquipItem) => {
          if (added === true) { return; }

          exercise.needOneEquipConfig.forEach((needOneEquipConfigItem) => {

            if (added === true) { return; }


            if (Array.isArray(needOneEquipConfigItem)) {
              
              needOneEquipConfigItem.forEach((needOneEquipconfigSubItem, index1) => {

                userEquip.forEach((userEquipItemX, index2) => {

                  if (index1 >= 0 && arrayMatch !== index1) { return; }

                  if (needOneEquipconfigSubItem === userEquipItemX) {
                    arrayMatch++;
                  }

                });

                if (needOneEquipConfigItem.length === arrayMatch) {
                  added = true;
                  validExercises.push(exercise);
                }
              else {
                console.log(`user does not have necessary optional equipment configurations for ${exercise.name}. tag: 2/3tewaf5asdf63h`);
              }

              });
            }
            else {
              if (needOneEquipConfigItem === userEquipItem) {
                added = true;
                validExercises.push(exercise);
              }
              else {
                console.log(`user does not have necessary optional equipment configurations for ${exercise.name}. tag: 20abcagre654erwg`);
              }
            }
          });

        });
      }




      // loop through each exercise in the exerciseArray
      exerciseArray.forEach((exercise) => {

        // if the exercise contains a "necessaryEquip" key/value pair
        if (exercise.necessaryEquip) {
          let matches = 0;

          // loop through each "necessaryEquip" of that exercise 
          exercise.necessaryEquip.forEach((necessaryEquipItem, neindex) => {


            // loop through each item in the "userEquip" array
            userEquip.forEach((userEquipItem) => {

              if (matches === neindex + 1) {return;}

              // if the iteration of necessary equipment matches the iteration of equipment the user has, add 1 to matches variable
              if (necessaryEquipItem === userEquipItem) {
                matches++;
              }

              // if the value of matches is equal to the amount of the number of equipment needed in the "necessaryEquip" array, add the exercise to the "validExercises" array.
              if (exercise.necessaryEquip.length === matches) {

                if (exercise.needOneEquipConfig) {
                  needOneEquipConfig(exercise);
                }
                else {
                  validExercises.push(exercise);
                }
              }
            });
          });
        }
        else if (exercise.needOneEquipConfig) {
          needOneEquipConfig(exercise);
        }
        else {
          // if the exercise does not require any equipment (does not contain the "necessaryEquip" key/value pair), add the exercise to the "validExercises" array
          validExercises.push(exercise);
        }

      });

      return validExercises;
    }
  },

  



  numGenerator: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },



  numGenMaxMinusOne: (min, max) => {
    max = max - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

};

















