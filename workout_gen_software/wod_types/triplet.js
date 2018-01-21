const mongodb = require('../../database/database');
const helpers = require('../helpers');
const numbers = require('../numbers');
const wodValidator = require('../../models/Wod');

module.exports = {
  generate: (user, wod) => {
    console.log('************************');
    console.log('triplet');
    console.log('************************');
    console.log('USER', user);
    console.log('************************');
    console.log('wod', wod);
    console.log('************************');

    return new Promise((resolve, reject) => {
      if (!user || !wod) {
        reject({
          success: false,
          message: 'No user/workout info provided.'
        });
      }
      else {

        // WOD SETUP STYLE & ROUNDS
        let styles = [
          'set reps',
          'varied reps'
        ];
        let style = styles[numbers.pickOneFromList(0, styles.length)];
        let roundOptions = [2, 3, 4];
        wod.rounds = roundOptions[numbers.pickOneFromList(0, roundOptions.length)];      
        // ***************************

        // ASSIGN WOD REPS
        helpers.setTripletReps.v1({
          repScheme: user.repScheme,
          style: style,
          wod: wod
        });
        // ***************************

        // ADD WOD INSTRUCTIONS
        if (style === 'set reps') {
          wod.instructions = `${wod.rounds} round(s) for time`;
        } else {
          wod.instructions = `${wod.repScheme} reps, for time`;
        }
        // ***************************

        // QUERY DATABASE - GETS ALL EXERCISES THAT ARE IN THE 'CROSSFIT' CATEGORY
        let crossfitExercisesQuery = mongodb.exerciseQuery({
          user: user,
          queryTypes: [
            'category',
            'skillLvl'
          ],
          categorySearchValues: ['crossfit'],
          skillLvlSearchValues: user.skillLvl
        });
        // *************************** 

        crossfitExercisesQuery
          .then(exercises => {
            console.log(exercises.length);

            // FILTER EXERCISES BASED ON USER'S EQUIPMENT
            let validExercises = helpers.filterExercisesBasedOnEquipment.v2(exercises, user.equipment);
            // ***************************

            return validExercises;
          })
          .then(results => {

            if (!results.success) {
              reject({
                success: false,
                message: 'Failed to filter exercises'
              });
            }
            else {
              console.log(results.filteredExercises.length);

              // CHOOSE EXERCISE(S) TO ADD TO WOD
              exercises = helpers.chooseTripletExercises.v1(user.muscleGrp, results.filteredExercises);
              // ***************************

              // ASSIGN WEIGHT TO EXERCISES
              exercises = helpers.assignRx.v1(exercises, user.max, wod.reps, wod.rounds, user.repScheme, user.gender);
              // ***************************

              return exercises;
            }
          })
          .then(exercises => {
            // console.log('wod',wod);
              console.log('exercises', exercises);
              resolve('Triplet');
          })
          .catch(err => reject(err));
      }  
    });
  }
};

























