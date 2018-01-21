const numbers = require('../numbers/numbers.js'),
      type    = require('./type'),
      timer   = require('./timer'),
      rounds   = require('./rounds');


/*
  FORM VALIDATION TO-DO
  
  Couplets and Triplets:
  1. all couplets and triplets are "For Time"...no timer allowed


  AMRAPs:
  1. cannot be low reps, high weight

  
  Singlets:
  1. can ONLY be low rep, high weight


  Chippers:
  1. cannot be low reps, high weight
  2. no timer in chippers


  Bodyweight: 
  1. this is not a workout itself, it is a workout add-on
     the following workouts can be bodyweight only: 
      - Chipper, AMRAP, Couplet, Triplet, EMOM, Tabata
  2. THIS HAS BEEN REMOVED, only NEED TO add check box to the form.


  Endurance:
  1. this is not a workout itself, it is a workout add-on
     the following workout can be endurance focused workouts:
     - Chipper, Couplet, Triplet, EMOM, Tabata
  2. THIS HAS BEEN REMOVED, only NEED TO add check box to the form.


  Strongman:
  1. this is not a workout itself, it is a workout add-on
     the following workout can include strongman exercises:
     - AMRAP, Chipper, Couplet, Triplet, EMOM, Tabata
  2. THIS HAS BEEN REMOVED, only NEED TO add check box to the form.
  

  Tabatas:
  1. can only be low weight, high reps
  2. no timer allowed in tabatas

*/      

module.exports = {
  setUp: (user, wod) => {

    console.log('======== USER ========>', user);
    console.log('***********************');
    console.log('========  WOD  =======>', wod);
    console.log('***********************');

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

      - Triplet
      1. choose exercises
      2. choose weight
      3. choose reps

      1. choose reps
      2. choose exercises
      3. choose weight 

      - Couplet

      - Singlet

      - Chipper

      - EMOM

      - Tabata

      - Bodybuilding

    */



    // INSTRUCTIONS ARE FILLED IN LATER DURING THE INDIVIDUAL WOD CREATION.

    console.log('wod to return:', wod);
  }
};
