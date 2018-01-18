const mongodb = require('../../database/database');
const helpers = require('../helpers');
const numbers = require('../numbers');
const wodValidator = require('../../models/Wod');

module.exports = {
  generate: (user, wod) => {

    return new Promise((resolve, reject) => {

      // VARIABLE DECLARATIONS
      let priExercises;
      let wodExercise;
      let repScheme;

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
        .then(queryResults => { 

          // queryResults.forEach(exercise => console.log(exercise.name));

          // RETRIEVE PRIMARY MUSCLE GROUP EXERCISES
          priExercises = queryResults;

          // FILTER EXERCISES BASED ON USER'S EQUIPMENT
          filterPriExercises = helpers.filterExercisesBasedOnEquipment.v2(priExercises, user.equipment);

          filterPriExercises
            .then(filterResults => {

            // CHOOSE EXERCISE(S) TO ADD TO WOD
            wodExercise = filterResults.filteredExercises[numbers.pickOneFromList(0, filterResults.filteredExercises.length)];

            // GENERATE REP COUNT FOR WOD EXERCISES
                // between 7 and 10 reps if singles
                // 5x5, 5x3, 5*10, 7*3
                // 10-5-3-1-1-1-3-5-10 = 9 sets
                // 5-5-3-3-3-1-1-1-1-1 = 10 sets

                // 7-5-3-1-1-1-1-3-5-7
                // 5-5-5-3-3-3-1-1-1-10
                // 
            let isConsistentReps = numbers.generate(0, 1);

            if (isConsistentReps === 1) {
              let sets;
              let reps = numbers.generate(1, 10);
              if (reps >= 1 && reps <= 3) {
                sets = numbers.generate(7, 10);
                wod.rounds = sets;
              }
              else {
                sets = numbers.generate(5, 10);
                wod.rounds = sets;
              }
              // Add the dashes
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
              repScheme = repSchemePossibilities[numbers.pickOneFromList(0, repSchemePossibilities.length)];
              // Get the number of rounds
              let dashes = 1;
              for (let i = 0; i < repScheme.length; i++) {
                if (repScheme[i] === '-') {
                  dashes++;
                }
              }
              wod.rounds = dashes;
            }
            wod.repScheme = repScheme;

            // ASSIGN WEIGHT TO EXERCISES
            wodExercise.weightAmount = 'n/a';

            // ADD EXERCISES TO WOD OBJECT
            if (Array.isArray(wodExercise) === false) {
              wod.exercises = [wodExercise];
            }
            else {
              wod.exercises = wodExercise;
            }

            let results = wodValidator.validate({
              wod: wod,
              file: 'wodGeneratorV2',
              tag: '590go48g$8g@sf4',
              needs: {
                _id: true,
                type: true,
                instructions: true,
                timer: false,
                repScheme: true,
                rounds: true,
                reps: false,
                run: false,
                exercises: true
              }
            }); // returns success (T/F) and message

            if (results.success) {

              // ADD WOD TO DATABASE
              let addToDb = mongodb.addWod(wod);

              addToDb
                .then(results => {

                  if (results.success) {
                    resolve({
                      success: true,
                      message: 'Workout generated successfully.'
                    }); 
                  }
                })
                .catch(err => reject({
                  success: false,
                  message: `Workout generation failed: ${err.message}`
                }));
            }
            else {
              reject({
                success: false,
                message: `Workout failed final validation: ${results.message}.`
              });
            }
          })
          .catch(err => reject({
            success: false,
            message: `Workout generation failed: ${err.message}`
          }));
        })
        .catch(err => reject({
          success: false,
          message: `Workout generation failed: ${err.message}`
        }));

    });
  }
};