const numbers = require('../numbers/numbers');


filter = {

  userEquip: [],

  exercises: [],

  filter: (userEquip, exercises) => {
    filter.userEquip = userEquip;
    filter.exercises = exercises;
    let filteredExercises = filter.v1();
    if (filteredExercises) {
      return {
        success: true,
        message: 'Successfully filtered out the exercises in which the user does not have the needed equipment to perform.',
        exercises: filteredExercises
      };
    }
    else {
      return {
        success: false,
        message: 'Failed to filter out the exercises in which the user does not have the needed equipment to perform.'
      };
    }
  },

  v1: () => {

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
    filter.exercises.forEach((exercise) => {

      // if the exercise contains a "necessaryEquip" key/value pair
      if (exercise.necessaryEquip) {
        let matches = 0;

        // loop through each "necessaryEquip" of that exercise 
        exercise.necessaryEquip.forEach((necessaryEquipItem, neindex) => {


          // loop through each item in the "userEquip" array
          filter.userEquip.forEach((userEquipItem) => {

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
};

module.exports = filter;