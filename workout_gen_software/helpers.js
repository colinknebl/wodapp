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
    timer = numbers.round(timer);
    return timer;
  },

  verifyUserData: {
    v1: (user) => {

      return new Promise((resolve, reject) => {
        if (!user) {
          reject({
            success: false,
            message: 'No user data provided.'
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

    assignType: (type) => {
      return new Promise((resolve, reject) => {
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

  



};

module.exports = helpers;