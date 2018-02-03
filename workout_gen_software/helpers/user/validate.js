const mongodb      = require('../../../database/database'),
      numbers      = require('../numbers/numbers.js');

module.exports = {

  validate: (user) => {

    // CHECK FOR A VALID FIRST NAME
    if (!user.firstName || user.firstName === undefined) {
      return {
        success: false,
        message: 'User first name is required.'
      };
    }

    // CHECK FOR A VALID LAST NAME
    if (!user.lastName || user.lastName === undefined) {
      return {
        success: false,
        message: 'User last name is required.'
      };
    }

    // CHECK FOR A VALID EMAIL
    if (!user.email || user.email === undefined) {
      return {
        success: false,
        message: 'User email is required.'
      };
    }

    // CHECK FOR VALID SKILL LEVEL, IF NOT VALID SET TO ANY
    if (!user.skillLvl || user.skillLvl === undefined) {
      user.skillLvl = 'any';
    }
    else if (user.skillLvl) {

      let x = user.skillLvl;
      if (x !== 'beginner' && x !== 'intermediate' && x !== 'advanced' && x !== 'athlete') {
        user.skillLvl = 'any';
      }
      else {
        user.skillLvl = user.skillLvl;
      }
    }
    else {
      user.skillLvl = 'any';
    }

    // CHECK FOR VALID GENDER
    if (!user.gender || user.gender === undefined) {
      return {
        success: false,
        message: 'User gender is required.'
      };
    }
    else if (user.gender !== 'male' && user.gender !== 'female') {
      return {
        success: false,
        message: 'Valid user gender is required'
      };
    }

    // CHECK FOR VALID BODYWEIGHT ONLY
    if (!user.bodyweightOnly || user.bodyweightOnly === null || user.bodyweightOnly === undefined) {
      user.bodyweightOnly = false;
    }
    else if (user.bodyweightOnly === 'idc') {
      let options = [true, false];
      user.bodyweightOnly = options[numbers.pickOneFromList(0, options.length)];
    }
    else if (user.bodyweightOnly === 'yes') {
      user.bodyweightOnly = true;
    }
    else {
      user.bodyweightOnly = false; 
    }

    // CHECK FOR VALID ENDURANCE FOCUS
    if (!user.enduranceFocus || user.enduranceFocus === null || user.enduranceFocus === undefined) {
      user.enduranceFocus = false;
    }
    else if (user.enduranceFocus === 'idc') {
      let options = [true, false];
      user.enduranceFocus = options[numbers.pickOneFromList(0, options.length)];
    }
    else if (user.enduranceFocus === 'yes') {
      user.enduranceFocus = true;
    }
    else {
      user.enduranceFocus = false; 
    }

    // CHECK FOR VALID STRONGMAN EXERCISES
    if (!user.includeStrongManExercises || user.includeStrongManExercises === null || user.includeStrongManExercises === undefined) {
      user.includeStrongManExercises = false;
    }
    else if (user.includeStrongManExercises === 'idc') {
      let options = [true, false];
      user.includeStrongManExercises = options[numbers.pickOneFromList(0, options.length)];
    }
    else if (user.includeStrongManExercises === 'yes') {
      user.includeStrongManExercises = true;
    }
    else {
      user.includeStrongManExercises = false; 
    }

    // CHECK FOR VALID WORKOUT (WOD) TYPE
    if (!user.wodType ||
         user.wodType === undefined ||
        (user.wodType !== 'any' &&
         user.wodType !== 'AMRAP' &&
         user.wodType !== 'Singlet' &&
         user.wodType !== 'Couplet' &&
         user.wodType !== 'Triplet' &&
         user.wodType !== 'Chipper' &&
         user.wodType !== 'EMOM' &&
         user.wodType !== 'Tabata'&&
         user.wodType !== 'Bodybuilding')
       ) {
      user.wodType = 'any';
    }

    // CHECK FOR VALID MUSCLE GROUP
    if (!user.muscleGrp ||
         user.muscleGrp === null ||
         user.muscleGrp === undefined ||
         user.muscleGrp === 'any') 
    {
      user.muscleGrp = 'any';
    }
    else if (user.muscleGrp === 'chest' ||
             user.muscleGrp === 'shoulders' ||
             user.muscleGrp === 'legs' ||
             user.muscleGrp === 'back') {
      // nothing happens, stays the same
    }
    else {
      user.muscleGrp = 'any';
    }

    // CHECK FOR VALID REP SCHEME
    if (!user.repScheme ||
         user.repScheme === undefined) {
      user.repScheme = 'any';
    }
    else if (user.repScheme === 'lowRepHighWeight' ||
             user.repScheme === 'highRepLowWeight' ||
             user.repScheme === 'mediumRepsAndWeight') {
      // nothing happens
    }
    else  {
      user.repScheme = 'any'; 
    }

    // CHECK FOR VALID TIMER
    if (!user.timer || user.timer === undefined) {
      user.timer = 'any';
    }
    else if (user.timer === 'noTimer') {
      user.timer = 'No Time Limit';
    }
    else if (user.timer >= 5 && user.timer <= 60) {
      user.timer = user.timer;
    }
    else {
      user.timer = 'any';
    }

    // CHECK FOR VALID MAX LIFTS
    if (!user.max || 
         user.max === undefined) {
      user.max = null;
    }
    if (!user.max.bench || user.max.bench <= 0) {
      user.max.bench = false;
    }
    if (!user.max.squat || user.max.squat <= 0) {
      user.max.squat = false;
    }
    if (!user.max.snatch || user.max.snatch <= 0) {
      user.max.snatch = false;
    }
    if (!user.max.dead || user.max.dead <= 0) {
      user.max.dead = false;
    }
    if (user.max.bench === false &&
        user.max.squat === false &&
        user.max.snatch === false &&
        user.max.dead === false) {
      user.max = null;
    }

    // CHECK FOR VALID EQUIPMENT
    if (!user.equipment || 
         user.equipment === undefined) {
      user.equipment = null;
    }
    if (user.equipment && !Array.isArray(user.equipment)) {
      user.equipment = [user.equipment];
    }
    if (user.equipment.length > 0) {
      user.equipment.forEach((piece, i) => {
        if (piece === '') {
          user.equipment.splice(i, 1);
        }
      });
    }
    if (user.equipment.length === 0) {
      user.equipment = null;
    }
    if (user.equipment.length > 0) {
      user.equipment.forEach((piece, i) => {
        if (piece === "barbell"           ||
            piece === 'dumbbells'         ||
            piece === 'plates'            ||
            piece === 'rack'              ||
            piece === 'bench'             ||
            piece === 'jumpRope'          ||
            piece === 'box'               ||
            piece === 'kBell'             ||
            piece === 'dipStation'        ||
            piece === 'pullUpBar'         ||
            piece === 'medBall'           ||
            piece === 'rings'             ||
            piece === 'climbingRope'      ||
            piece === 'conditioningRope'  ||
            piece === 'sled'              ||
            piece === 'sledgeHammer'      ||
            piece === 'abMat'             ||
            piece === 'resBands'          ||
            piece === 'tire'              ||
            piece === 'sandbag'           ||
            piece === 'chains'            ||
            piece === 'pegBoard'          ||
            piece === 'ghd'               ||
            piece === 'airBike'           ||
            piece === 'rower'             ||
            piece === 'skiErg'            ||
            piece === 'treadmill'         ||
            piece === 'outdoorRun') {
          // stays in array
        }
        else {
          user.equipment.splice(i, 1);
        }
      });
    }

    return {
      success: true,
      message: 'User passed validation.',
      user: user
    };
  },

  validatePromise: (user) => {
    console.log('validate', user);

    if (!user.firstName) {
      reject({
        success: false,
        message: 'User first name is required.'
      });
    }

    if (!user.lastName) {
      reject({
        success: false,
        message: 'User last name is required.'
      });
    }

    if (!user.email) {
      reject({
        success: false,
        message: 'User email is required.'
      });
    }

    if (!user.skillLvl || user.skillLvl === null || user.skillLvl === undefined) {
      user.skillLvl = 'any';
    }

    console.log('end user validation', user);
  }

};