const numbers = require('../numbers/numbers.js'),
      type    = require('./type'),
      timer   = require('./timer'),
      rounds   = require('./rounds'),
      exercises = require('./exercises');


/*
  FORM VALIDATION TO-DO
  
  Couplets and Triplets:
  1. DONE: all couplets and triplets are "For Time"...no timer allowed


  AMRAPs:
  1. DONE: cannot be low reps, high weight

  
  Singlets:
  1. DONE: can ONLY be low rep, high weight
  2. DONE: cannot have a timer


  Chippers:
  1. DONE: cannot be low reps, high weight
  2. DONE: no timer in chippers


  Bodyweight: 
  1. DONE: this is not a workout itself, it is a workout add-on
     the following workouts can be bodyweight only: 
      - Chipper, AMRAP, Couplet, Triplet, EMOM, Tabata


  Endurance:
  1. DONE: this is not a workout itself, it is a workout add-on
     the following workout can be endurance focused workouts:
     - Chipper, Couplet, Triplet, EMOM, Tabata


  Strongman:
  1. DONE: this is not a workout itself, it is a workout add-on
     the following workout can include strongman exercises:
     - AMRAP, Chipper, Couplet, Triplet, EMOM, Tabata

  

  Tabatas:
  1. DONE: can only be low weight, high reps
  2. DONE: no timer allowed in tabatas

*/      

module.exports = {
  setUp: (user, wod) => {

    // console.log('======== USER ========>', user);
    // console.log('***********************');
    // console.log('========  WOD  =======>', wod);
    // console.log('***********************');

    // SET WOD TYPE
    wodTypeSetup = type.setUp(user.wodType, wod);
    if (!wodTypeSetup.success) {
      return wodTypeSetup;
    }
    else {
      wod = wodTypeSetup.wod;
    }
    
    // SET WOD TIMER
    wodTimerSetup = timer.setUp(user.timer, wod);
    if (!wodTimerSetup.success) {
      return wodTimerSetup;
    }
    else {
      wod = wodTimerSetup.wod;
    }

    // SET WOD ROUNDS AND REP SCHEME
    wodRoundsSetup = rounds.setUp(user.repScheme, wod);
    if (!wodTimerSetup.success) {
      return wodTimerSetup;
    }
    else {
      wod = wodTimerSetup.wod;
    }

    /*
      ORDER OF ASSIGNING EXERCISES, WEIGHT FOR EACH EXERCISE, AND REPS BY WORKOUT TYPE:

      User has the option of choosing:
      - rep scheme
      - bodyweight exercises add on (not yet added)
      - endurance exercises add on (not yet added)
      - strongman exercises add on (not yet added)

      Exercises are chosen based on:
      1. user.muscleGrp
      2. wod.type
      3. bodyweight add on (T/F)
      4. endurance add on (T/F)
      5. strongman add on (T/F)

      - AMRAP
      1. choose exercises
      2. choose reps
      3. choose weight

      - Triplet
      1. choose exercises
      2. choose reps
      3. choose weight

      - Couplet
      1. choose exercises
      2. choose reps
      3. choose weight

      - Singlet
      1. choose exercises
      2. choose reps

      - Chipper
      1. choose exercises
      2. choose reps
      3. choose weight

      - EMOM
      1. choose exercises
      2. choose reps
      3. choose weight

      - Tabata
      1. choose exercises
      2. choose reps
      3. choose weight

      - Bodybuilding
      1. choose exercises
      2. choose reps
      3. choose weight

    */

    // GET EXERCISES
    getWodExercises = exercises.get.v1(user, wod);
    if (!getWodExercises.success) {
      return getWodExercises;
    }
    else {
      wod = getWodExercises.wod;
    }



    // INSTRUCTIONS ARE FILLED IN LATER DURING THE INDIVIDUAL WOD CREATION.

    // console.log('wod to return:', wod);
  }
};
