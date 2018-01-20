const numbers = require('./numbers');

helpers = {

  setTimer: (timer) => {
    if (timer === 'any') {
      timer = numbers.generate(5, 60);
    } 
    else if (timer === 'noTimer') {
      timer = 'For Time';
    }
    else {
      timer = timer;
    }
    timer = numbers.round.promise(timer);
    return timer;
  },

  verifyUserData: {
    v1: (user) => {

      return new Promise((resolve, reject) => {
        if (!user) {
          reject({
            success: false,
            message: 'No user data provided. helpers.js tag: 2309ggnio4#fe'
          });
        }
        else {

          if (user.muscleGrp === null) {
            let muscleGrps = ['back', 'legs', 'chest', 'shoulders'];
            user.muscleGrp = muscleGrps[numbers.pickOneFromList(0, muscleGrps.length)];
          }
          if (user.repScheme === null) {
            user.repScheme = 'any';
          }
          if (user.timer === null) {
            user.timer = 'any';
          }

          resolve({
            success: true,
            message: 'Successfully verified user data',
            user: user
          });
        }
      });
    }
  },

  assignWodInfo: {
    v1: (wod, user) => {
            
      return new Promise ((resolve, reject) => {
        if (user.wodType) {
          wod.type = user.wodType;
          resolve({
            success: true,
            message: 'WOD info successfully assigned.',
            wod: wod
          });
        }

        if (!wod || !user) {
          reject({
            success: false,
            message: 'No WOD/user data provided. helpers.js tag: 25g09ag#f08a'
          });
        }
        else {

            let getType = helpers.assignWodInfo.assignType(wod.type, user.wodType);
            
            getType
              .then(type => {

                wod.type = type;

                if (!wod.instructions) {

                  switch(wod.type) {
                    case 'AMRAP':
                      wod.instructions = 'Complete as many rounds as possible';
                      break;
                    case 'Singlet':
                      wod.instructions = 'Track weight of each set; your score is the sum of weight lifted';
                      break;
                    case 'Couplet':
                      break;
                  }
                }


                if (!wod.timer || wod.timer === 'any') {
                  if (wod.type === 'Singlet') {
                    wod.timer = 'n/a';
                  }
                  else {
                    wod.timer = numbers.generate(5, 60) ;
                  }
                }


            
                resolve({
                  success: true,
                  message: 'WOD info successfully assigned.',
                  wod: wod
                });

            });
          }
    
      });
    },


    v2: (wod, user) => {

      function assignInstructions() {
        if (!wod.instructions) {
          switch(wod.type) {
            case 'AMRAP':
              wod.instructions = 'Complete as many rounds as possible';
              break;
            case 'Singlet':
              wod.instructions = 'Track weight of each set; your score is the sum of weight lifted';
              break;
            case 'Couplet':
              break;
          }
        }
      }

      function assignTimer() {
        return new Promise(resolve => {
          if (!wod.timer || wod.timer === 'any') {
            if (wod.type === 'Singlet') {
              wod.timer = 'n/a';
              resolve();
            }
            else {
              let timer = numbers.generate(5, 60) ;
              let round = numbers.round.promise(timer);
              round
                .then(results => {
                  wod.timer = results;
                  resolve();
                });
            }
          }
        });
      }
            
      return new Promise ((resolve, reject) => {
        if (user.wodType) {
          wod.type = user.wodType;
          assignInstructions();
          let timeAssignment = assignTimer();

          timeAssignment
            .then(() => {
              resolve({
                success: true,
                message: 'WOD info successfully assigned.',
                wod: wod
              });
            });
        }

        if (!wod || !user) {
          reject({
            success: false,
            message: 'No WOD/user data provided. helpers.js tag: 25g09ag#f08a'
          });
        }
        else {

            let getType = helpers.assignWodInfo.assignType(wod.type, user.wodType);
            
            getType
              .then(type => {
                wod.type = type;

                // assign instructions
                assignInstructions();

                // assign timer
                let assignTime = assignTimer();

                assignTime
                  .then(() => {
                    resolve({
                      success: true,
                      message: 'WOD info successfully assigned.',
                      wod: wod
                    });
                  });
            });
          }
      });
    },

    assignType: (type) => {
      return new Promise(resolve => {
        if (!type || type === 'any') {
          let wodTypes = ['AMRAP', 'Singlet', 'Couplet'];
          let num = numbers.pickOneFromList(0, wodTypes.length);
          resolve(wodTypes[num]);
        }
        else { resolve(type); }
      });
    },
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
      // console.log('exerciseArray', exerciseArray);
      // console.log('userEquip', userEquip);
      return new Promise((resolve, reject) => {

        if (!exerciseArray || !userEquip) {
          reject({
            success: false,
            message: 'User equipment and/or exercises were not provided'
          });
        }
        else {
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

            if (validExercises) {
              resolve({
                success: true,
                message: 'Filtered exercises successfully.',
                filteredExercises: validExercises
              });
            }
            else {
              reject({
                success: false,
                message: 'Failed to filter exercises. tag: 39t%rf9298v2@8'
              });
            }
          });
        }
      });
    }
  },


  assignRounds: {
    v1: (timer, skillLvl) => {
      /*
        Arguments:
        1. timer = the user.timer from form submission
        2. skillLvl = the user.skillLvl from form submission

        Function:
        Assign the number of rounds based on the user's skill level. The more skilled the user is, the less time per round assigned. Additionally, as the rounds progress the user is alloted more time to complete the rounds. 
      */

      return new Promise((resolve, reject) => {


        let rounds;

        if (skillLvl === 'beginner') {
          if (timer > 0 && timer <= 6) {
            rounds = 1;
          }
          else if (timer > 6 && timer <= 12) {
            rounds = 2;
          }
          else if (timer > 12 && timer <= 19) {
            rounds = 3;
          }
          else if (timer > 19 && timer <= 26) {
            rounds = 4;
          }
          else if (timer > 26 && timer <= 34) {
            rounds = 5;
          }
          else if (timer > 34 && timer <= 42) {
            rounds = 6;
          }
          else if (timer > 42 && timer <= 51) {
            rounds = 7;
          }
          else if (timer > 51) {
            rounds = 8;
          }
          else {
            console.log("error calculating 'beginner' rounds. tag: adg7924ba058s");
          }
        }
        else if (skillLvl === 'intermediate') {
          if (timer > 0 && timer <= 5) {
            rounds = 1;
          }
          else if (timer > 5 && timer <= 10) {
            rounds = 2;
          }
          else if (timer > 10 && timer <= 16) {
            rounds = 3;
          }
          else if (timer > 16 && timer <= 22) {
            rounds = 4;
          }
          else if (timer > 22 && timer <= 28) {
            rounds = 5;
          }
          else if (timer > 28 && timer <= 35) {
            rounds = 6;
          }
          else if (timer > 35 && timer <= 42) {
            rounds = 7;
          }
          else if (timer > 42 && timer <= 50) {
            rounds = 8;
          }
          else if (timer > 50) {
            rounds = 9;
          }
          else {
            console.log(`error calculating 'intermediate' rounds; timer: ${timer} tag: sd0g9u8dfg96sdf8g`);
          }
        }
        else if (skillLvl === 'advanced') {
          if (timer > 0 && timer <= 4) {
            rounds = 1;
          }
          else if (timer > 4 && timer <= 8) {
            rounds = 2;
          }
          else if (timer > 8 && timer <= 13) {
            rounds = 3;
          }
          else if (timer > 13 && timer <= 18) {
            rounds = 4;
          }
          else if (timer > 18 && timer <= 24) {
            rounds = 5;
          }
          else if (timer > 24 && timer <= 30) {
            rounds = 6;
          }
          else if (timer > 30 && timer <= 37) {
            rounds = 7;
          }
          else if (timer > 37 && timer <= 44) {
            rounds = 8;
          }
          else if (timer > 44 && timer <= 52) {
            rounds = 9;
          }
          else if (timer > 52) {
            rounds = 10;
          }
          else {
            console.log("error calculating 'advanced' rounds. tag: 215;jb145;1465624");
          }
        }
        else if (skillLvl === 'athlete') {
          if (timer > 0 && timer <= 3) {
            rounds = 1;
          }
          else if (timer > 3 && timer <= 6) {
            rounds = 2;
          }
          else if (timer > 6 && timer <= 10) {
            rounds = 3;
          }
          else if (timer > 10 && timer <= 14) {
            rounds = 4;
          }
          else if (timer > 14 && timer <= 19) {
            rounds = 5;
          }
          else if (timer > 19 && timer <= 24) {
            rounds = 6;
          }
          else if (timer > 24 && timer <= 30) {
            rounds = 7;
          }
          else if (timer > 30 && timer <= 36) {
            rounds = 8;
          }
          else if (timer > 36 && timer <= 43) {
            rounds = 9;
          }
          else if (timer > 43 && timer <= 50) {
            rounds = 10;
          }
          else if (timer > 50) {
            rounds = 12;
          }
          else {
            console.log("error calculating 'athlete' rounds. tag: q9wre84@6q8er846f4");
          }
        }

        resolve(rounds);
      });
    }
  },

  assignVariedRepsPerRound: {
    v1: (rounds, desiredRepScheme) => {

      return new Promise((resolve, reject) => {

        let reps;
        let repsStart;
        let repsString = '';
        let repIncrements = [
          [1, 2],
          [3, 4],
          [5, 6],
          [7, 8, 10]
        ];
        let repIncArray;
        let repIncrement;
        
        
        // CHOOSE IF ASCENDING OR DESCENDING REP INCREMENTS
        let repTypes = ['ascending', 'descending'];
        let repType = repTypes[numbers.pickOneFromList(0, repTypes.length)];
        
        
        // CHOOSE THE INCREMENT AMOUNT FOR DESCENDING REP SCHEMES
        function chooseDescendingIncrement(repsStart) {

          let descendingRepIncrements = [
            []
          ];

          let count = 0;
          do { 
            if (repsStart > 0 && repsStart <= 20) {
              // rep increment possibilities: 1 or 2
              repIncArray = repIncrements[0];
              repIncrement = repIncArray[numbers.pickOneFromList(0, repIncArray.length)];
            }
            else if (repsStart > 20 && repsStart <= 29) {
              // rep increment possibilities: 3 - 6
              repIncArray = repIncrements[numbers.pickOneFromList(1, repIncrements.length - 1)];
              repIncrement = repIncArray[numbers.pickOneFromList(0, repIncArray.length)];
            }
            else if (repsStart > 29) {
              // rep increment possibilities: 5 - 8, 10
              repIncArray = repIncrements[numbers.pickOneFromList(2, repIncrements.length)];
              repIncrement = repIncArray[numbers.pickOneFromList(0, repIncArray.length)];
            }
            else {
              console.log('error in choosing descending rep increment. tag: 2667a4t6gfahhh');
            }
            count++;
          } while (repsStart - (rounds * repIncrement) < 1 && count < 10);

          if (count >= 9 && repIncrement < 1) {
            repIncrement = 4;
          }

          return repIncrement;
        }


        // CHOOSE THE INCREMENT AMOUNT FOR ASCENDING REP SCHEMES
        function chooseAscendingIncrement(repsStart) {

          if (repsStart > 0 && repsStart <= 20) {
            // rep increment possibilities: 3 - 8, 10
            repIncArray = repIncrements[numbers.pickOneFromList(1, repIncrements.length)];
            repIncrement = repIncArray[numbers.pickOneFromList(0, repIncArray.length)];
          }
          else if (repsStart > 20 && repsStart <= 30) {
            // rep increment possibilities: 3 - 6
            repIncArray = repIncrements[numbers.pickOneFromList(1, repIncrements.length - 1)];
            repIncrement = repIncArray[numbers.pickOneFromList(0, repIncArray.length )];
          }
          else if (repsStart > 30) {
            // if the repsStart is greater than 30, the reps will be consistent throughout each round
            repIncrement = 0;
          }
          else {
            console.log('error in choosing ascending rep increment.');
          }

          return repIncrement;
        }


        // ASSIGNS REPS TO EACH ROUND
        function assignReps(repsStart, repIncrement) {

          let repArray = [];

          repArray.push(repsStart);
     
          if (repType === 'ascending') {
            for (let i = 1; i < rounds; i++) {

              nextRep = repArray.splice(repArray.length - 1, 1);
              repArray.push(nextRep[0]);
              addRep = Number.parseInt(nextRep) + Number.parseInt(repIncrement);         
              repArray.push(addRep);
            }
          }
          else {
            for (let i = 1; i < rounds; i++) {

              nextRep = repArray.splice(repArray.length - 1, 1);
              repArray.push(nextRep[0]);
              addRep = Number.parseInt(nextRep) - Number.parseInt(repIncrement);         
              repArray.push(addRep);
            }
          }

          return repArray;
        }


        // FIXES REP SCHEMES THAT INCLUDE NEGATIVE NUMBERS BY ADDING THE INCREMENT
        function fixRepsAssignment(newRepArray, inc) {

          let fixedArray = [];

          newRepArray.forEach((roundReps) => {
            if (roundReps < 1) {
              roundReps = fixedArray[fixedArray.length - 1] + inc;
              fixedArray.push(roundReps);
            }
            else {
              fixedArray.push(roundReps);
            }

          });

          return fixedArray;

        }


        // CONVERTS THE REP ARRAY TO A STRING
        function toString(newRepArray) {

          for (let i = 0; i < newRepArray.length; i++) {
            reps = newRepArray[i] + '';
            
            if (i === newRepArray.length - 1) {
              repsString += reps;
            }
            else {
              repsString += reps + '-';
            }
          }

          return repsString;
        }


        // FIND THE REPS IN THE FIRST ROUND
        if (desiredRepScheme === 'lowRepHighWeight') {
          repsStart = numbers.generate(3, 9);
        }
        else if (desiredRepScheme === 'mediumRepsAndWeight') {
          repsStart = numbers.generate(10, 24);
        }
        else if (desiredRepScheme === 'highRepLowWeight') {
          repsStart = numbers.generate(25, 50);
        } 
        else {
          repsStart = numbers.generate(3, 50);
        }

        // if (rounds > 3) {
        //   repsStart = helpers.roundNum(repsStart);
        // }
        

        // console.log(`varied reps; rounds: ${rounds}`);
        // console.log(`desiredRepScheme: ${desiredRepScheme}`);
        // console.log(`repType: ${repType}`);
        // console.log(`repsStart: ${repsStart}`);
        

        // ADD OR SUBTRACT REPS FROM EACH ROUND
        let inc;
        if (repType === 'descending') {
          inc = chooseDescendingIncrement(repsStart);
        }
        else {
          inc = chooseAscendingIncrement(repsStart);
        }

        // IF THE REP ARRAY INCLUDES ANY NUMBER LESS THAN 1, THE INCREMENT IS ADDED TO THE ROUND INSTEAD OF SUBTRACTED. THIS WILL ENSURE THE REP SCHEME DOES NOT ASSIGN A ROUND WITH NEGATIVE REPS.
        newRepArray = assignReps(repsStart, inc);
        if (newRepArray[newRepArray.length - 1] < 1) {
          newRepArray = fixRepsAssignment(newRepArray, inc);
        }

        // CONVERT THE ARRAY OF REPS IN EACH ROUND TO A STRING SEPERATED BY DASHES
        repsString = toString(newRepArray);
        
        if (repsString) {
          resolve({
            success: true,
            message: 'Successfully assigned a rep scheme.',
            reps: repsString
          });
        }
        else {
          reject({
            success: false,
            message: 'Failure assigning a rep scheme.'
          });
        }
      });
    }
  },


  assignReps: {
    v1: (desiredRepScheme, exerciseArray) => {
      // console.log('desiredRepScheme', desiredRepScheme);
      // console.log('exerciseArray',exerciseArray);
      /*
         SEE documentation.txt FOR MORE DETAILS
      */
      return new Promise((resolve, reject) => {

        let reps;
        let exercisesWithRepsAssigned = [];

        // console.log(' ^^^^^^^^^^^^^^^^ ');
        // console.log(desiredRepScheme);
        // console.log(exerciseArray);
        // console.log(' ^^^^^^^^^^^^^^^^ ');

        desiredRepScheme = 'highRepLowWeight';

        exerciseArray.forEach((exercise) => {
          if ('repScheme' in exercise) {
            if (desiredRepScheme === 'lowRepHighWeight') {
              exercise.reps = numbers.generate(exercise.repScheme.low[0], exercise.repScheme.low[1]);
            }
            else if (desiredRepScheme === 'highRepLowWeight') {
              reps = numbers.generate(exercise.repScheme.high[0], exercise.repScheme.high[1]);
              roundReps = numbers.round.promise(reps);
              roundReps
                .then(reps => {
                  exercise.reps = reps;
                })
                .catch(err => reject(err));
            }
            else if (desiredRepScheme === 'mediumRepsAndWeight') {
              reps = numbers.generate(exercise.repScheme.mid[0], exercise.repScheme.mid[1]);
              if (reps >= 25) {
                roundReps = numbers.round.promise(reps);
                roundReps
                  .then(reps => {
                    exercise.reps = reps;
                  })
                  .catch(err => reject(err));
              }
              else {
                exercise.reps = reps;
              }
            }
            else {
              reps = numbers.generate(exercise.repScheme.range[0], exercise.repScheme.range[1]);
              if (reps >= 25) {
                roundReps = numbers.round.promise(reps);
                roundReps
                  .then(reps => {
                    exercise.reps = reps;
                  })
                  .catch(err => reject(err));
              }
              else {
                exercise.reps = reps;
              }
            }
          }
          else {
            console.log(`error in assigning reps to exercise or reps not applicable -- exercise: ${exercise.name}. tag: 23508ugna8gh44`);
            exercise.reps = 'n/a';
          }

          exercisesWithRepsAssigned.push(exercise);
        });

        if (exercisesWithRepsAssigned) {
          // console.log('exercisesWithRepsAssigned',exercisesWithRepsAssigned);
          resolve({
            success: true,
            message: 'Successfully assigned rep count to exercises.',
            exercises: exercisesWithRepsAssigned
          });
        }
        else {
          reject({
            success: false,
            message: 'Failed to add reps to exercises.'
          });
        }
      });
    }
  },



  addRun: (wod) => {

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

    if ((wod.timer / wod.rounds) >= 8) {
      wod.rounds = wod.rounds - 1;  
      run.distance = '1 mile';
    }
    else {
      wod.rounds = wod.rounds - 2;
      run.distance = '2 miles';
    }

    wod.exercises.forEach(exercise => {
      let reps = exercise.reps * wod.rounds;
      reps = numbers.round.noPromise(reps);
      exercise.reps = reps;
    });

    // add to beginning or end or both
    let num = numbers.generate(0, 2);
    if (num === 0) {
      wod.exercises.unshift(run);
    }
    else if (num === 2 && run.distance === '2 miles') {
      run.distance = '1 mile';
      wod.exercises.unshift(run);
      wod.exercises.push(run);
    }
    else {
      wod.exercises.push(run);
    }

    wod.run = true;
    wod.instructions = `For time. ${wod.timer} minute time cap.`;

    return wod;
  },



  assignRx: {
    v1: (exerciseArray, maxLifts, reps, rounds, repScheme, gender) => {

      /*
        exerciseArray = array
        maxLifts = object
        reps = string <= optional, may be null or undefined
        rounds = number
        repScheme = string
        gender = string
      */

      return new Promise((resolve, reject) => {

        const newExerciseArray = [];
        let average;

        // IF THE REP COUNT IS VARIED, GET THE AVERAGE REPS PERFORMED PER ROUND - THE AVERAGE IS THEN USED TO ASSIGN THE WEIGHT USED FOR THAT EXERCISE
        if (reps) {
          
          let repSchemeArray = [];
          let number = '';

          for (let i = 0; i < reps.length; i++) {

            if (reps[i] === '-') {
              number = Number.parseInt(number);
              repSchemeArray.push(number);
              number = '';
            }
            else if (i === (reps.length - 1)) {
              number += reps[i];
              number = Number.parseInt(number);
              repSchemeArray.push(number);
            }
            else if (reps[i] !== '-') {
              number += reps[i];
            }
            else {
              console.log('error finding average. tag: 3890qn5bad-26');
            }
          }
          let sum = 0;

          repSchemeArray.forEach((repRound) => {
            sum = sum + repRound;
          });
          average = sum / repSchemeArray.length;
        }




        // ASSIGN DISTANCE
        function assignDistance(exercise) {

          rounds = 1;

          let dist = exercise.distance;
          let distance;
          if (rounds >= 1 && rounds <= 2) {
            distance = numbers.generate(dist.long[0], dist.long[1]);
          }
          else if (rounds > 2 && rounds <= 5) {
            distance = numbers.generate(dist.med[0], dist.med[1]);
          }
          else if (rounds > 5) {
            distance = numbers.generate(dist.short[0], dist.short[1]);
          }
          else {
            console.error(`error in assigning ${exercise.name} distance. tag: 57aa55g09dnt`);
          }

          if(exercise.name === "Handstand Walk") {
            distance = numbers.round.noPromise(distance);
            exercise.distanceAssigned = `${distance} ${exercise.distance.unit}`;
          }
          else if (exercise.name === "Sprint") {
            exercise.distanceAssigned = `${distance * 100} ${exercise.distance.unit}`;
          }
          else if (exercise.name !== "Handstand Walk" && exercise.name !== "Sprint") {
            exercise.distanceAssigned = `${distance} ${exercise.distance.unit}`;
          }
          else {
            console.error(`error in assigning ${exercise.name} weightAmount. tag: 849dfng-dadgne^f`);
          }
          newExerciseArray.push(exercise);
        }

        function assignWeight(exercise) {

          // ASSIGN A VALUE TO maxLift
          let maxLift;
          switch (exercise.maxOfExercise) {
            case 'bench':
              maxLift = maxLifts.bench;
              break;
            case 'squat':
              maxLift = maxLifts.squat;
              break;
            case 'deadlift':
              maxLift = maxLifts.dead;
              break;
            case 'snatch':
              maxLift = maxLifts.snatch;
              break;
            default:
              console.log(`error assigning 'maxLift' for exercise ${exercise.name}. tag: 39dhtn38dfh`);
          }

          // ASSIGN A VALUE TO "weightFactor"
          let weightFactor;
          if (exercise.reps <= 2 || average <= 2 || repScheme <= 2) {
            weightFactor = 0.95;
          }
          else if (
            (exercise.reps > 2 && exercise.reps <= 4) 
            || 
            (average > 2 && average <= 4)
            ||
            (repScheme > 2 && repScheme <= 4)) 
            {
              weightFactor = 0.9;
          }
          else if (
            (exercise.reps > 4 && exercise.reps <= 6) 
            || 
            (average > 4 && average <= 6)
            ||
            (repScheme > 4 && repScheme <= 6)) 
            {
              weightFactor = 0.85;
          }
          else if (
            (exercise.reps > 6 && exercise.reps <= 11) 
            || 
            (average > 6 && average <= 11)
            ||
            (repScheme > 6 && repScheme <= 11))
            {
              weightFactor = 0.8;
          }
          else if (
            (exercise.reps > 11 && exercise.reps <= 19) 
            || 
            (average > 11 && average <= 19)
            ||
            (repScheme > 11 && repScheme <= 19))
            {
              weightFactor = 0.7;
          }
          else if (
            (exercise.reps > 19 && exercise.reps <= 29) 
            || 
            (average > 19 && average <= 29)
            ||
            (repScheme > 19 && repScheme <= 29))
            {
              weightFactor = 0.5;
          }
          else if (
            (exercise.reps >= 30)
            || 
            (average >= 30)
            ||
            (repScheme >= 30)) 
            {
              weightFactor = 0.4;
          }
          else {
            console.log(`error in assigning weight factor for '${exercise.name}'. tag: asdoip215`);
          }

          // ASSIGN THE EXERCISE weightAmount
          let weightAmount = Math.floor(maxLift * exercise.percentOfMax * weightFactor);
          weightAmount = numbers.round.noPromise(weightAmount);
          exercise.weightAmount = weightAmount + ' lbs';

          // ADD THE EXERCISE WITH THE WEIGHT ASSIGNED TO newExerciseArray
          newExerciseArray.push(exercise);
        }


        // ASSIGN WEIGHT TO EXERCISES IN WHICH THE VALUE OF "weighted" IS "either"
        function assignEither(exercise) {
          let ex;
          if (repScheme > 19 || reps > 19 || average > 19) {
            ex = exercise.weightAmount = "BW";
            newExerciseArray.push(ex);
          }
          else {
            assignWeight(exercise);
          }
        }

        function assignWeightByGender(exercise) {
          if (gender === 'female') {
            exercise.weightAmount = `${exercise.weight.female} ${exercise.weight.unit}`;
          }
          else {
            exercise.weightAmount = `${exercise.weight.male} ${exercise.weight.unit}`;
          }
          newExerciseArray.push(exercise);
        }

        function assignCalories(exercise) {

          let cal = exercise.calories;
          let calories;
          if (rounds >= 1 && rounds <= 2) {
            calories = numbers.generate(cal.high[0], cal.high[1]);
          }
          else if (rounds > 2 && rounds <= 5) {
            calories = numbers.generate(cal.mid[0], cal.mid[1]);
          }
          else if (rounds > 5) {
            calories = numbers.generate(cal.low[0], cal.low[1]);
          }
          else {
            console.error(`error in assigning ${exercise.name} calories. tag: 5fk40tb28&ak$e`);
          }
          calories = numbers.round.noPromise(calories);
          exercise.weightAmount = `${calories} calories`;
          newExerciseArray.push(exercise);
        }

        function distOrCal(exercise) {

          // choose whether the weight amount will be distance or calories
          let choice = numbers.generate(0, 1);

          if (choice === 1) {

            let cal = exercise.calories;
            let calories;
            if (rounds >= 1 && rounds <= 2) {
              calories = numbers.generate(cal.high[0], cal.high[1]);
            }
            else if (rounds > 2 && rounds <= 5) {
              calories = numbers.generate(cal.mid[0], cal.mid[1]);
            }
            else if (rounds > 5) {
              calories = numbers.generate(cal.low[0], cal.low[1]);
            }
            else {
              console.error(`error in assigning ${exercise.name} calories. tag: gbf38^3idjg77afn`);
            }
            calories = numbers.round.noPromise(calories);
            exercise.weightAmount = `${calories} ${exercise.calories.unit}`;
          }
          else {

            let dist = exercise.distance;
            let distance;
            if (rounds >= 1 && rounds <= 2) {
              distance = numbers.generate(dist.long[0], dist.long[1]);
            }
            else if (rounds > 2 && rounds <= 5) {
              distance = numbers.generate(dist.med[0], dist.med[1]);
            }
            else if (rounds > 5) {
              distance = numbers.generate(dist.short[0], dist.short[1]);
            }
            else {
              console.error(`error in assigning ${exercise.name} distance. tag: 48g3j%^fugnq0v4g68/`);
            }
            exercise.weightAmount = `${distance * 100} ${exercise.distance.unit}`;
          }
          newExerciseArray.push(exercise);
        }

        // ASSIGN THE COUNT FOR JUMP ROPE
        function assignJumpRopeCount(exercise) {

          let count;
          let reps = exercise.repScheme;

          if (repScheme === 'any') {
            count = numbers.generate(reps.range[0], reps.range[1]);
          }
          else if (repScheme === 'lowRepHighWeight') {
            count = numbers.generate(reps.low[0], reps.low[1]);
          }
          else if (repScheme === 'mediumRepsAndWeight') {
            count = numbers.generate(reps.mid[0], reps.mid[1]);
          }
          else if (repScheme === 'highRepLowWeight') {
            count = numbers.generate(reps.high[0], reps.high[1]);
          }
          else {
            console.log('error in assigning jump rope count. tag: nv410dq%e0g');
          }
          count = numbers.round.noPromise(count);
          exercise.weightAmount = count;
          newExerciseArray.push(exercise);
        }

        // ASSIGN THE COUNT FOR MOUNTAIN CLIMBERS
        function assignMtClimbersCount(climbers) {

          let count;
          let reps = climbers.repScheme;

          if (repScheme === 'any') {
            count = numbers.generate(reps.range[0], reps.range[1]);
          }
          else if (repScheme === 'lowRepHighWeight') {
            count = numbers.generate(reps.low[0], reps.low[1]);
          }
          else if (repScheme === 'mediumRepsAndWeight') {
            count = numbers.generate(reps.mid[0], reps.mid[1]);
          }
          else if (repScheme === 'highRepLowWeight') {
            count = numbers.generate(reps.high[0], reps.high[1]);
          }
          else {
            console.log('error in assigning mountain climbers amount. tag: jt65+g53qg51');
          }
          count = numbers.round.noPromise(count);
          climbers.weightAmount = count + ' four count';
          newExerciseArray.push(climbers);
        }


        // console.log('exerciseArray', exerciseArray);
        // console.log('maxLifts:',maxLifts);
        // console.log('reps:',reps);
        // console.log('rounds:', rounds);
        // console.log('repScheme:', repScheme);
        // console.log('gender:',gender);
        // console.log('average:',average);

        // LOOP THROUGH EACH EXERCISE AND SEND IT TO A FUNCTION TO CALCULATE weightAmount
        exerciseArray.forEach((exercise) => {
          
          if (exercise.weightAmount && !exercise.distance && exercise.name !== 'Mountain Climbers') {
            // console.log('1',exercise.name);
            newExerciseArray.push(exercise);
          }

          else if (exercise.weighted === true && 'percentOfMax' in exercise) {
            // console.log('2',exercise.name);
            assignWeight(exercise);
          }

          else if ('distance' in exercise && 'calories' in exercise) {
            // console.log('3',exercise.name);
            distOrCal(exercise);
          }

          else if ('calories' in exercise) {
            // console.log('4',exercise.name);
            assignCalories(exercise);
          }

          else if ('distance' in exercise) {
            // console.log('5',exercise.name);
            assignDistance(exercise);
          }

          else if (exercise.weighted === "gender") {
            // console.log('6',exercise.name);
            assignWeightByGender(exercise);
          }

          else if (exercise.name === 'Mountain Climbers' && reps === undefined) {
            // console.log('7',exercise.name);
            assignMtClimbersCount(exercise);
          }

          else if (exercise.necessaryEquip == 'jump rope' && reps === undefined) {
            // console.log('8',exercise.name);
            assignJumpRopeCount(exercise);
          }

          else if (exercise.weighted === false && reps !== undefined) {
            // console.log('9',exercise.name);
            exercise.weightAmount = 'n/a';
            newExerciseArray.push(exercise);
          }

          else if (exercise.assisted === true) {
            // console.log('10',exercise.name);
            exercise.weightAmount = 'assisted';
            newExerciseArray.push(exercise);
          }

          else if (exercise.weighted === 'either') {
            // console.log('11',exercise.name);
            assignEither(exercise);
          }

          else {
            console.log(`error parsing exercise while assigning weight for: '${exercise.name}'. tag: 213554sdafasd`);
          }

        });

        // console.log('start loop');
        // newExerciseArray.forEach((exercise, index) => {
        //   // console.log(exercise);

        //   if (exercise.name === 'Mountain Climbers' ||
        //     exercise.name === 'Jump Rope (Single Unders)' ||
        //     exercise.name === 'Jump Rope (Double Unders)') {
        //     console.log(exercise);
        //   }
        //   else {
        //     console.log(`${index+1}. ${exercise.weightAmount} :: ${exercise.distanceAssigned} :: ${exercise.name}`);
        //   }
        // });
        // console.log('end loop');


        if (newExerciseArray) {
          resolve({
            success: true,
            message: 'Successfully assigned weight to exercises.',
            exercises: newExerciseArray
          });
        }
        else {
          reject({
            success: false,
            message: 'Failed to assign weight to exercises.'
          });
        }
      });
    }
  }

};

module.exports = helpers;