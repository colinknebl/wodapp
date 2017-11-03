const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongodb = require('../database/database');

const request = require('request');

const test = require('../workout_gen_software/sandbox');

wodGenerator = {

  wod: {},

  generateWod: (userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip) => {

    switch (userWodType) {
      case "amrap":
        wodGenerator.amrap(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
        break;
      // case "bodyweight":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "chipper":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "couplet":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "emom":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "endurance":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "hybrid":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "singlet":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "strength":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "strongman":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "tabata":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "timeCap":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      // case "weightlifting":
      //   wodGenerator.(userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip);
      //   break;
      default:
        console.log('wod type unknown');

    }
  },

  amrap: (userSkillLvl, userWodType, userMuscleGrp, userRepScheme, userTimer, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip) => {

    // console.log(userEquip);

    // console.log('entered amrap method');

    // if no timer 

    // if timer between 5-60, generate a random number between 5-60 for timer
    if (userTimer === 'any') {
      userTimer = helpers.numGenerator(5, 60);
    }

    let priExerciseArray = mongodb.exerciseQueryByPrimaryMuscleGrp(userMuscleGrp, userEquip);
    // console.log('one');
    let secExerciseArray = mongodb.exerciseQueryBySecondaryMuscleGrp(userMuscleGrp);
    // console.log('two');
    let catExerciseArray = mongodb.exerciseQueryByCategory('metabolic conditioning');
    // console.log('three');

    // console.log('finished connection calls');

    // console.log(`priExerciseArray: ${priExerciseArray}`);
    // console.log(`secExerciseArray: ${secExerciseArray}`);
    // console.log(`catExerciseArray: ${catExerciseArray}`);


    // // retrieve exercises based on primary muscle group
    // function getPriExercises() {

      // console.log('entered getPriExercises');
      
    //   // return new Promise(function(resolve, reject) {

        // console.log('entered getPriExercises promise');
    //     console.log(priExerciseArray);
        
    //     // if (priExerciseArray) {
    //       console.log('entered if');
    //       // resolve(priExerciseArray);
    //       return priExerciseArray;
    //       // console.log('passed resolve');
    //     // } else {
    //       // reject('failed to load');
    //     // }

    //     // console.log('finished getPriExercises promise');

    //   // });
    // }

    function getPriExercises() {

      // console.log('entered getPriExercises');
      // console.log(priExerciseArray);
      // console.log('entered if');
      return priExerciseArray;

    }

    function getSecondaryExercises(priExercises) {

      // console.log('entered getSecondaryExercises');
      // console.log(priExerciseArray);
      // console.log(data);
      priExerciseArray = priExercises;
      // console.log('transfer');
      // console.log(priExerciseArray);
      // console.log(`secExerciseArray: ${secExerciseArray}`);
      // console.log(`catExerciseArray: ${catExerciseArray}`);
      return secExerciseArray;

    }

    function getConditioningExercises(secExercises) {

      // console.log('entered getConditioningExercises');
      // console.log(secExerciseArray);
      secExerciseArray = secExercises;
      return catExerciseArray;
    }

    function filterExercisesBasedOnEquipment(catExercises) {
      catExerciseArray = catExercises;
      helpers.filterExercisesBasedOnEquipment(priExerciseArray, secExerciseArray, catExerciseArray, userEquip);
    }

    // if timer 5-8 minutes.
    //   - 2 exercises
    //   - 1 pri musc
    //   - 1 meta condit

    // if (userTimer >= 5 && userTimer <= 8) {

    // }


    function display() {
      // console.log(priExerciseArray);
      // console.log(secExerciseArray);
      // console.log(catExerciseArray);
    }

    function generateAmrapWod() {
      // console.log('entered generateAmrapWod');
      getPriExercises()
        .then(priExercises => getSecondaryExercises(priExercises))
        .then(secExercises => getConditioningExercises(secExercises))
        .then(catExercises => filterExercisesBasedOnEquipment(catExercises))
        // .then(display)
        .catch(err => console.log(err));
      // console.log('finished generateAmrapWod');
    }
 
    generateAmrapWod();


    // - generate a number between 5-20 for rep count
    //    - if reps are 5-8
    //       - 50% max
    //    - if reps are 9-12
    //       - 45% max
    //    - if reps are 13-20
    //       - 40% max


  }





};

module.exports = wodGenerator;

helpers = {

  numGenerator: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  filterExercisesBasedOnEquipment: (priExerciseArray, secExerciseArray, catExerciseArray, userEquip) => {
    console.log('helpers.filterExercisesBasedOnEquipment');

    // console.log(`priExerciseArray.length: ${priExerciseArray.length}`);
    // console.log(`secExerciseArray.length: ${secExerciseArray.length}`);
    // console.log(`catExerciseArray.length: ${catExerciseArray.length}`);
    // console.log(`userEquip.length: ${userEquip.length}`);

    // secExerciseArray.forEach((exercise) => {
    //   console.log(exercise.name);
    // });

    // required: bench, dumbbells
    // has: bench, dumbbells, kettlebell

    let validPriExercises = [];

    // loop through each exercise in the priExerciseArray
    for (let i = 0; i < priExerciseArray.length; i++) {
      
      if (priExerciseArray[i].necessaryEquip !== undefined) {
        console.log(`userEquip: ${userEquip}`);
        console.log(`priExerciseArray[i].necessaryEquip: ${priExerciseArray[i].necessaryEquip}`);
        let matches = 0;
          
        // loop through each "necessaryEquip" of that exercise 
        let equipNum = priExerciseArray[i].necessaryEquip;
        console.log(`equipNum.length: ${equipNum.length}`); // 2
        for (let a = 0; a < equipNum.length; a++) {

          // loop through each item in the "userEquip" array
          for (let t = 0; t < userEquip.length; t++) {

            console.log(matches);
            console.log(`${equipNum[a]} : ${userEquip[t]}`);
            // if the iteration of necessary equipment matches the iteration of equipment the user has, add 1 to matches variable
            if (equipNum[a] === userEquip[t]) {
              matches++;
              console.log(matches);
              console.log('.....');
            }



          }

          console.log(`equipNum.length: ${equipNum.length} :: matches: ${matches}`);
          if (equipNum.length === matches) {
          
            console.log('test');
            validPriExercises.push(priExerciseArray[i]);
            console.log(validPriExercises);
          }
          
          // if the a iteration is equal to equipNum.length and the 
          // loop through each element in tempArray 
          

          // check to see how many are required for that exercise; if matches count = equipNum.length, add priExerciseArray[i] to the validPriExercises

        }
      } 
      else {
        validPriExercises.push(priExerciseArray[i]);
      }
    } 
  }

};




















