const numbers = require('../numbers/numbers'),
      mongodb = require('../../../database/database'),
      filterExercises = require('./filterExercises');

const amrap = require('../../wod_types/amrap'),
      singlet = require('../../wod_types/singlet'),
      couplet = require('../../wod_types/couplet'),
      triplet = require('../../wod_types/triplet'),
      chipper = require('../../wod_types/chipper'),
      bodybuilding = require('../../wod_types/bodybuilding'),
      emom = require('../../wod_types/emom'),
      tabata = require('../../wod_types/tabata');

setUp = {

  exercises: [],

  // RETRIEVE EXERCISES FROM DATABASE
  get: {
    v1: (user, wod) => {
      let exerciseQuery;

      if (wod.type === 'Singlet') {
        exerciseQuery = mongodb.exerciseQuery({
          user: user,
          queryTypes: [
            'muscleGrp',
            'category'
          ],
          categorySearchValues: ['weightlifting']
        });
      }
      else if (wod.type === 'Couplet') {
        exerciseQuery = mongodb.exerciseQuery({
          user: user,
          queryTypes: [
            'category',
            'skillLvl'
          ],
          categorySearchValues: ['crossfit', 'metabolic conditioning'],
          skillLvlSearchValues: user.skillLvl
        });
      }
      else {
        exerciseQuery = mongodb.exerciseQuery({
          user: user,
          queryTypes: [
            'category',
            'skillLvl'
          ],
          categorySearchValues: ['crossfit'],
          skillLvlSearchValues: user.skillLvl
        });
      }

      exerciseQuery
        .then(results => {
          if (!results.success) {
            return results;
          }
          else {
            setUp.exercises = results.exercises;

            // FILTER EXERCISES BASED ON USER'S EQUIPMENT
            results = filterExercises.filter(user.equipment, setUp.exercises);

            if (!results.success) {
              return results;
            }
            else {
              exercises = results.exercises;

              console.log(wod.type);

              switch(wod.type) {
                case 'AMRAP':
                  results = amrap.generate(user, wod, exercises);
                  break;
                case 'Singlet':
                  results = singlet.generate(user, wod, exercises);
                  break;
                case 'Couplet':
                  results = couplet.generate(user, wod, exercises);
                  break;
                case 'Triplet':
                  results = triplet.generate(user, wod, exercises);
                  break;
                case 'Chipper':
                  results = chipper.generate(user, wod, exercises);
                  break;
                case 'Bodybuilding':
                  results = bodybuilding.generate(user, wod, exercises);
                  break;
                case 'EMOM':
                  results = emom.generate(user, wod, exercises);
                  break;
                case 'Tabata':
                  results = tabata.generate(user, wod, exercises);
                  break;
              }

              if (wod.exercises) {
                return {
                  success: true,
                  message: 'Workout exercise(s) assigned successfully.',
                  wod: wod
                };
              }
              else {
                return {
                  success: false,
                  message: 'Failed to assign workout exercises.'
                };
              }
            }
          }
        })
        .catch(err => console.log(err));
    }
  }
};

module.exports = setUp;





















