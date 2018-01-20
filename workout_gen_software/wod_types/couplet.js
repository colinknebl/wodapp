const mongodb = require('../../database/database');
const helpers = require('../helpers');
const numbers = require('../numbers');
const wodValidator = require('../../models/Wod');

module.exports = {
  generate:(user, wod) => {
    // console.log('user', user);
    // console.log('wod', wod);
    return new Promise((resolve, reject) => {
      if (!user || !wod) {
        reject({
          success: false,
          message: 'No user/workout data provided.'
        });
      }
      else {

        // VARIABLE DECLARATIONS
        let firstExercise;
        let secondExercise;
        let wodExercises;
        let repScheme;
        let percentOfMax;

        // Shouldn't need the below variables.
        // let maxLifts = {
        //   squat: user.maxSquat,
        //   bench: user.maxBench,
        //   snatch: user.maxSnatch,
        //   deadlift: user.maxDead
        // };
        // ***************************


        // WOD SETUP STYLE & ROUNDS
        let styles = [
          'set reps',
          'varied reps'
        ];
        let style = styles[numbers.generate(0, styles.length)];
        let assignRounds = helpers.assignRounds.v1(wod.timer, user.skillLvl);
        // ***************************

        assignRounds
          .then(rounds => {

            wod.rounds = rounds;
            
            // ADD WOD INSTRUCTIONS
            if (style === 'set reps') {
              wod.instructions = `${rounds} round(s) for time`;
              return {skip: true};
            } else {
              let wodReps = helpers.assignVariedRepsPerRound.v1(rounds, user.repScheme);
              return wodReps;
            }
            // ***************************
          })
          .then(results => {

            if (results.skip) { return; }

            if (!results.success) {
              reject(results);
            }

            wod.instructions = `${results.reps} reps, for time`;
            wod.reps = results.reps;
            
            return;

          })
          .then(() => {
            
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

            return crossfitExercisesQuery;
          })
          .then(exercises => {

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

              exercises = results.filteredExercises;

              // CHOOSE EXERCISE(S) TO ADD TO WOD
              if (user.muscleGrp === 'any') {
                // if the user selects 'any' for muscle group focus, choose any two exercises in any order from the 'validExercises' array
                firstExercise = exercises[numbers.generate(0, exercises.length)];
                do {
                  secondExercise = exercises[numbers.generate(0, exercises.length)];  
                } while (firstExercise.name === secondExercise.name);
              }
              else {
                // if the user selects a specific muscle group to target, get one exercise in which the 'exercise.priMuscleGrpGeneral' is equal to the 'user.muscleGrp'
                let targetMuscleGrpArray = [];

                // add the exercises in which the 'exercise.priMuscleGrpGeneral' is what the user wants to focus on to the 'targetMuscleGrpArray'
                exercises.forEach((exercise) => {
                  if (exercise.priMuscleGrpGeneral === user.muscleGrp) {
                    targetMuscleGrpArray.push(exercise);
                  }
                });

                firstExercise = targetMuscleGrpArray[numbers.pickOneFromList(0, targetMuscleGrpArray.length)];
                do {
                  secondExercise = exercises[numbers.pickOneFromList(0, exercises.length)];
                } 
                while (firstExercise.name === secondExercise.name);
              }
              // ***************************


              // GENERATE REP COUNT FOR WOD EXERCISES
              exercises = [firstExercise, secondExercise];

              if (style === 'set reps') {
                // if the style is 'set reps', the rep count is a random number based on user's desired rep scheme 
                let assignRepsToExercises = helpers.assignReps.v1(user.repScheme, exercises);
                return assignRepsToExercises;
              }
              else {
                // rep count is already in instructions
                wod.exercises = exercises;
                return {skip: true};
              }
              // ***************************
              
            }
          })
          .then(results => {

            if (results.skip) {return;}
            wod.exercises = results.exercises;
            return;

          })
          .then(() => {

            // ASSIGN WEIGHT TO EXERCISES
            exercises = helpers.assignRx.v1(wod.exercises, user.max, wod.reps, wod.rounds, user.repScheme, user.gender);
            // ***************************

            return exercises;
          })
          .then(results => {

            if (!results.success) {
              reject(results);
            }
            else {
              wod.exercises = results.exercises;
            }

            // OPTIONAL: ADD RUN COMPONENT
            // let runNum = numbers.generate(0, 10);
            // // I don't like running, so only add a run if the below criteria are met. 
            // if (runNum >= 7 && wod.timer >= 15) {
            //   wod.run = true;
            //   wod = helpers.addRun(wod);
            // }
            // else {
            //   wod.run = false;
            // }
            // ************************


            let wodValidation = wodValidator.validate({
              wod: wod,
              file: 'couplet.js',
              tag: '359g#9g29v9',
              needs: {
                _id: true,
                type: true,
                instructions: true,
                timer: true,
                repScheme: false,
                rounds: true,
                reps: false,
                run: false,
                exercises: true
              }
            }); // returns success (T/F) and message
            console.log(wodValidation);

            // ADD WOD TO DATABASE
            mongodb.addWod(wod);
            // ***************************


            // SEND WOD BACK TO ROUTE TO SEND BACK TO CLIENT
            resolve({
              success: true,
              message: 'Successfully generated workout.'
            });
            // ***************************

          })
          .catch(err => reject(err));
      }
    });
  }
};


























