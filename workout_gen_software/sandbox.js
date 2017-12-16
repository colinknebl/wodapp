const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      exerciseUrl = 'mongodb://localhost:27017/exercises',
      userUrl = 'mongodb://localhost:27017/users';

test = {
  exerciseQueryByPrimaryMuscleGrp: (userMuscleGrp) => {
      console.log('entered exerciseQueryByPrimaryMuscleGrp');
      MongoClient.connect(exerciseUrl, (err, db) => {
        console.log('entered mongo connect')
        assert.equal(null, err); 
        console.log(`querying exercise db by primary muscle group...${userMuscleGrp}`);

        const exerciseArray = [];
        
        let exercises = db.collection('exercises')
          .find({
            priMuscleGrp: userMuscleGrp
          },
          {
            _id: 0,
            name: 1,
            muscleGrp: 1
          }
        );

        exercises.forEach((exercise, err) => {
          // console.log(exercise);
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          console.log('closed connection to db (pri muscle)');
          console.log(exerciseArray);
          return exerciseArray;
        });

      });
      console.log('leaving exerciseQueryByPrimaryMuscleGrp');
    },

    test: (userMuscleGrp) => {
      
      console.log('entered test');

      return new Promise((resolve, reject) => {

        console.log('entered test promise');

        MongoClient.connect(exerciseUrl, (err, db) => {

          console.log('entered test connect within promise');

          const exerciseArray = [];
        
          let exercises = db.collection('exercises')
            .find({
              priMuscleGrp: userMuscleGrp
            },
            {
              _id: 0,
              name: 1,
              muscleGrp: 1
            }
          );

          exercises.forEach((exercise, err) => {
            // console.log(exercise);
            exerciseArray.push(exercise);
          }, () => {
            db.close();
            console.log('closed connection to db (pri muscle)');
            console.log(exerciseArray);
            console.log('resolving');
            resolve(exerciseArray);
          });

          console.log('finished test connect within promise');

        });

        console.log('finished test promise');

      });

    }
};


module.exports = test;






    function getPrimaryExercises() {
      // console.log('entered getPriExercises');
      console.log(priExerciseQuery);
      // return priExerciseQuery;
      Promise.resolve(priExerciseQuery);
    }

    function getSecondaryExercises(priExercises) {
      // console.log('entered getSecondaryExercises');
      priExerciseArray = priExercises;
      return secExerciseArray;
    }

    function getConditioningExercises(secExercises) {
      // console.log('entered getConditioningExercises');
      secExerciseArray = secExercises;
      return catExerciseArray;
    }


    function getOpposingMuscleGrpExercises(catExercises) {
      catExerciseArray = catExercises;

      if (userTimer >= 16) {
        return oppExerciseQuery;
      } else {
        return "opposing muscle group exercises not required";
      }
    }

    function filterPriExercisesBasedOnEquipment(oppExercises) {
      oppExerciseArray = oppExercises;
      priExerciseArray = helpers.filterExercisesBasedOnEquipment(priExerciseArray, userEquip);
    }

    function filterSecExercisesBasedOnEquipment() {
      secExerciseArray = helpers.filterSecExercisesBasedOnEquipment(secExerciseArray, userEquip);
    }

    function filterCatExercisesBasedOnEquipment() {
      catExerciseArray = helpers.filterExercisesBasedOnEquipment(catExerciseArray, userEquip);
    }


function chooseExercises() {
      // if timer 5-8 minutes.
      //   - 2 exercises
      //   - 1 pri musc
      //   - 1 meta condit

      let priWodExercises;
      let secWodExercises;
      let conWodExercises;
      let oppWodExercises;

      if (userTimer >= 5 && userTimer <= 8) {
        priWodExercises = helpers.chooseExercises(priExerciseArray, 1);
        conWodExercises = helpers.chooseExercises(catExerciseArray, 1);
      }

      else if (userTimer >= 9 && userTimer <= 15) {
        nbrOfExercises = helpers.numGenerator(2, 3);
        console.log(`total WOD exercises: ${nbrOfExercises}`);
        if (nbrOfExercises === 2) {
          priWodExercises = helpers.chooseExercises(priExerciseArray, 1);
          conWodExercises = helpers.chooseExercises(catExerciseArray, 1);
        }
        else {
          priWodExercises = helpers.chooseExercises(priExerciseArray, 1);
          secWodExercises = helpers.chooseExercises(secExerciseArray, 1);
          conWodExercises = helpers.chooseExercises(catExerciseArray, 1);
        }
        
      }

      else if (userTimer >= 16 && userTimer <= 60) {
        nbrOfExercises = helpers.numGenerator(3, 6);
        nbrOfExercises = 6;
        if (nbrOfExercises === 3) {
          priWodExercises = helpers.chooseExercises(priExerciseArray, 1);
          secWodExercises = helpers.chooseExercises(secExerciseArray, 1);
          conWodExercises = helpers.chooseExercises(catExerciseArray, 1);
        }
        else if (nbrOfExercises === 4) {
          priWodExercises = helpers.chooseExercises(priExerciseArray, 1);
          secWodExercises = helpers.chooseExercises(secExerciseArray, 1);
          conWodExercises = helpers.chooseExercises(catExerciseArray, 2);
        }
        else if (nbrOfExercises === 5) {
          priWodExercises = helpers.chooseExercises(priExerciseArray, 1);
          secWodExercises = helpers.chooseExercises(secExerciseArray, 1);
          oppWodExercises = helpers.chooseExercises(oppExerciseArray, 1);
          conWodExercises = helpers.chooseExercises(catExerciseArray, 2);
        }
        else if (nbrOfExercises === 6) {
          priWodExercises = helpers.chooseExercises(priExerciseArray, 1);
          secWodExercises = helpers.chooseExercises(secExerciseArray, 2);
          oppWodExercises = helpers.chooseExercises(oppExerciseArray, 1);
          conWodExercises = helpers.chooseExercises(catExerciseArray, 2);
        }
      }

      else {

      }

      console.log(`priWodExercises: ${priWodExercises[0].name}`);
      console.log(`secWodExercises: ${secWodExercises[0].name}`);
      console.log(`oppWodExercises: ${oppWodExercises[0].name}`);
      console.log(`conWodExercises: ${conWodExercises[0].name}`);

    }


    function generateRepScheme() {
      

      if (userTimer >= 5 && userTimer <= 8) {
        let x = helpers.numGenerator(0, priExerciseArray.length - 1);
        let firstExercise = priExerciseArray[x];
        console.log(`firstExercise: ${firstExercise.name}`);

        let a = helpers.numGenerator(0, catExerciseArray.length - 1);
        let secondExercise = catExerciseArray[a];
        console.log(`secondExercise: ${secondExercise.name}`);
      }
      else if (userTimer >= 9 && userTimer <= 15) {
        let x = helpers.numGenerator(0, priExerciseArray.length - 1);
        let firstExercise = priExerciseArray[x];
        console.log(`firstExercise: ${firstExercise.name}`);

        let a = helpers.numGenerator(0, secExerciseArray.length - 1);
        let secondExercise = secExerciseArray[a];
        console.log(`secondExercise: ${secondExercise.name}`);

        let e = helpers.numGenerator(0, catExerciseArray.length - 1);
        let thirdExercise = catExerciseArray[e];
        console.log(`thirdExercise: ${thirdExercise.name}`);

      }




    function filterDuplicateExercises() {
      // console.log(`priExerciseArray: ${priExerciseArray}`);
      // console.log(`secExerciseArray: ${secExerciseArray}`);

      secExerciseArray = helpers.filterDuplicateExercises(priExerciseArray, secExerciseArray);
    }


      // - generate a number between 5-20 for rep count
      //    - if reps are 5-8
      //       - 50% max
      //    - if reps are 9-12
      //       - 45% max
      //    - if reps are 13-20
      //       - 40% max

    }
    function display() {
      // console.log('display');

      priExerciseArray.forEach((exercise) => {
        console.log(`priExercise name: ${exercise.name}`);
      });

      secExerciseArray.forEach((exercise) => {
        console.log(`secExercise name: ${exercise.name}`);
      });

      catExerciseArray.forEach((exercise) => {
        console.log(`catExercise name: ${exercise.name}`);
      });
    }

    function generateAmrapWod() {
      console.log('entered generateAmrapWod');
      getPrimaryExercises()
      //   .then((priExercisesQueryResults) => {
      //     console.log(priExercisesQueryResults);
      //     priExercises = priExercisesQueryResults;
      //     console.log(priExercises);
      //     getSecondaryExercises(priExercises);
      //     console.log(priExercises);
      //   })
        // .then((secExercises) => getConditioningExercises(secExercises))
        // .then((catExercises) => getOpposingMuscleGrpExercises(catExercises))
        // .then((oppExercises) => filterPriExercisesBasedOnEquipment(oppExercises))
        // .then(filterSecExercisesBasedOnEquipment)
        // .then(filterCatExercisesBasedOnEquipment)
        .then(generateRepScheme)
        .then(chooseExercises)
        .then(show)
        .then(filterDuplicateExercises)
        .then(display)
        .catch(err => console.log(err));
      console.log('finished generateAmrapWod');
    }


helpers = {

  filterDuplicateExercises(priExerciseArray, secExerciseArray) {
    console.log(`priExerciseArray: ${priExerciseArray}`);
    console.log(`secExerciseArray: ${secExerciseArray}`);

    let validSecExercises = [];

    for (let i = 0; i < priExerciseArray.length; i++) {

      for (let a = 0; a < secExerciseArray.length; a++) {
        
        console.log(`${priExerciseArray[i].name} :: ${secExerciseArray[a].name}`);

        if (priExerciseArray[i].name !== secExerciseArray[a].name) {
          
          console.log('length: ' + validSecExercises.length);
          if (validSecExercises.length > 0) {

            let count = 0;
            for (var x = 0; x < validSecExercises.length; x++) {

              console.log('count ' + count);
              console.log(`compare: ${secExerciseArray[a].name} :: ${validSecExercises[x].name}`);
              if (secExerciseArray[a].name !== validSecExercises[x].name) {  
                count++;
              } else {
                console.log('match');
              }
              if (count === validSecExercises.length) {
                console.log(`${count} :: ${validSecExercises.length}`);
                validSecExercises.push(secExerciseArray[a]);
                console.log('added');
                console.log(validSecExercises);
              }
            }
          } else {
            validSecExercises.push(secExerciseArray[a]);
            console.log('added');
            console.log(validSecExercises);
          }
        } else {
          console.log('filtered');
        }
      }
    }
    // console.log('check array');
    // for (let x = 0; x < validSecExercises.length; x++) {

    //   for (let a = 0; a < validSecExercises.length; a++) {

    //     console.log(`${validSecExercises[x].name} :: ${validSecExercises[a].name}`);
    //     if (validSecExercises[x].name === validSecExercises[a].name) {
    //       validSecExercises.splice(a, 1);
    //       console.log('spliced');
    //     }
    //     else {
    //       console.log('kept');
    //     }
    //   }
    // }
    console.log(`validSecExercises: ${validSecExercises}`);
    return validSecExercises;
  },

};

mongodbDegraded = {
  filterSecExercisesBasedOnEquipment: (exerciseArray, userEquip) => {
        // console.log('helpers.filterExercisesBasedOnEquipment');

        let validExercises = [];

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

      exerciseQueryX: (userSkillLvl, userRepScheme, userWodType, userMuscleGrp, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip) => {

    MongoClient.connect(exerciseUrl, (err, db) => {
      assert.equal(null, err); 
      // console.log('querying exercise db...');

      let level = 'gold';
      
      let exercises = db.collection('exercises')
        .find({
          muscleGrps: userMuscleGrp
        },
        {
          name: 1, 
          _id: 0
        }
      );
      
      exercises.forEach((exercise, err) => {
        // console.log(exercise);
      }, () => {
        db.close();
        // console.log('closing connection to db');
      });
    });
  },

  exerciseQueryByPrimaryMuscleGrp: (userMuscleGrp, userEquip) => {

    // console.log('entered exerciseQueryByPrimaryMuscleGrp');

    // const exerciseArray = [];

    return new Promise((resolve, reject) => {
      // console.log('entered exerciseQueryByPrimaryMuscleGrp promise');

      MongoClient.connect(exerciseUrl, (err, db) => {

        // console.log('entered exerciseQueryByPrimaryMuscleGrp db connect');

        assert.equal(null, err);
        const exerciseArray = [];

        let exercises = db.collection('exercises')
          .find({
            priMuscleGrp: userMuscleGrp
          },
          {
            _id: 0
          }
        );

        exercises.forEach((exercise, err) => {
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          if (exerciseArray) {
            // console.log('exerciseQueryByPrimaryMuscleGrp resolved');
            // console.log(userEquip);
            // console.log(exerciseArray);
            resolve(exerciseArray); 
          } else {
            reject('failed to load');
          }          

        });
        // console.log('finished exerciseQueryByPrimaryMuscleGrp db connect');
      });
      // console.log('finished exerciseQueryByPrimaryMuscleGrp promise');
    });
  },

  exerciseQueryBySecondaryMuscleGrp: (userMuscleGrp) => {

    // console.log('entered exerciseQueryBySecondaryMuscleGrp');

    return new Promise((resolve, reject) => {

      // console.log('entered exerciseQueryBySecondaryMuscleGrp promise');

      MongoClient.connect(exerciseUrl, (err, db) => {

        // console.log('entered exerciseQueryBySecondaryMuscleGrp db connect');

        assert.equal(null, err);
        const exerciseArray = [];
      
        let exercises = db.collection('exercises')
          .find({
            muscleGrps: userMuscleGrp
          },
          {
            _id: 0
          }
        );

        exercises.forEach((exercise, err) => {
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          if (exerciseArray) {
            // console.log('exerciseQueryBySecondaryMuscleGrp resolved');
            resolve(exerciseArray);
          } else {
            reject('failed to load');
          }
        });

        // console.log('finished exerciseQueryBySecondaryMuscleGrp db connect');
      });

      // console.log('finished exerciseQueryBySecondaryMuscleGrp promise');
    });
  },

  exerciseQueryByCategory: (userMuscleGrp) => {

    // console.log('entered exerciseQueryByCategory');

    return new Promise((resolve, reject) => {

      // console.log('entered exerciseQueryByCategory promise');

      MongoClient.connect(exerciseUrl, (err, db) => {

        // console.log('entered exerciseQueryByCategory db connect');

        assert.equal(null, err);
        const exerciseArray = [];
      
        let exercises = db.collection('exercises')
          .find({
            category: userMuscleGrp
          },
          {
            _id: 0
          }
        );

        exercises.forEach((exercise, err) => {
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          if (exerciseArray) {
            // console.log('exerciseQueryByCategory resolved');
            resolve(exerciseArray);
          } else {
            reject('failed to load');
          }
        });
        // console.log('finished exerciseQueryByCategory db connect');
      });
      // console.log('finished exerciseQueryByCategory promise');
    });
  },

  exerciseQueryByOpposingMuscleGrp: (userMuscleGrp) => {

    let oppMuscleGrp;

    switch (userMuscleGrp) {
      case "chest":
        oppMuscleGrp = "back";
        break;
      case "back":
        oppMuscleGrp = "chest";
        break;
      case "quads":
        oppMuscleGrp = "hamstrings";
        break;
      case "hamstrings":
        oppMuscleGrp = "quads";
        break;
      case "anterior deltoids":
        oppMuscleGrp = "posterior deltoids";
        break;
      case "posterior deltoids":
        oppMuscleGrp = "anterior deltoids";
        break;
      case "biceps":
        oppMuscleGrp = "triceps";
        break;
      case "triceps":
        oppMuscleGrp = "biceps";
        break;
    }

    console.log(`oppMuscleGrp: ${oppMuscleGrp}`); 

    // console.log('entered exerciseQueryByOpposingMuscleGrp');

    return new Promise((resolve, reject) => {

      // console.log('entered exerciseQueryByOpposingMuscleGrp promise');

      MongoClient.connect(exerciseUrl, (err, db) => {

        // console.log('entered exerciseQueryByOpposingMuscleGrp db connect');

        assert.equal(null, err);
        const exerciseArray = [];
      
        let exercises = db.collection('exercises')
          .find({
            priMuscleGrp: oppMuscleGrp
          },
          {
            _id: 0
          }
        );

        exercises.forEach((exercise, err) => {
          // console.log(`exercise.name: ${exercise.name}`);
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          if (exerciseArray) {
            // console.log('exerciseQueryByOpposingMuscleGrp resolved');
            // console.log(exerciseArray);
            resolve(exerciseArray);
          } else {
            reject('failed to load');
          }
        });
        // console.log('finished exerciseQueryByOpposingMuscleGrp db connect');
      });
      // console.log('finished exerciseQueryByOpposingMuscleGrp promise');
    });
  },
};






  
    