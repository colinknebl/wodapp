const numbers = require('../numbers/numbers');

const repSchemes = [
  'lowRepHighWeight',
  'mediumRepsAndWeight',
  'highRepLowWeight'
];

module.exports = {
  setUp: (repScheme, wod) => {

    let type = wod.type;
    

    if (type === 'AMRAP') {
      // no rounds specification for AMRAP workouts
      if (repScheme === 'mediumRepsAndWeight' || repScheme === 'highRepLowWeight') {
        wod.repScheme = repScheme;
      }
      else {
        wod.repScheme = repSchemes[numbers.pickOneFromList(1, repSchemes.length)];
      }
      wod.rounds = 'N/A  - As many rounds as possible in the specified time.';
      if (wod.repScheme) {
        return {
          success: true,
          message: 'Successfully assigned workout rounds and rep scheme.',
          wod: wod
        };
      }
      else {
        return {
          success: false,
          message: 'Failed to assign number of rounds and a rep scheme to the workout.',
        };
      }
    }



    if (type === 'Singlet') {
      wod.repScheme = 'lowRepHighWeight';
      wod.rounds = numbers.generate(7, 10);

      if (wod.repScheme && wod.rounds) {
        return {
          success: true,
          message: 'Successfully assigned workout rounds and rep scheme.',
          wod: wod
        };
      }
      else {
        return {
          success: false,
          message: 'Failed to assign number of rounds and a rep scheme to the workout.',
        };
      }
    }




    if (type === 'Chipper') {
      if (repScheme === 'mediumRepsAndWeight' || repScheme === 'highRepLowWeight') {
        wod.repScheme = repScheme;
      }
      else {
        wod.repScheme = repSchemes[numbers.pickOneFromList(1, repSchemes.length)];
      }

      if (wod.repScheme === 'mediumRepsAndWeight') {
        wod.repScheme = 'mediumRepsAndWeight';
        wod.rounds = numbers.generate(5, 8);
      }
      else if (wod.repScheme === 'highRepLowWeight') {
        wod.repScheme = 'highRepLowWeight';
        wod.rounds = numbers.generate(9, 12);
      }
      wod.timer = 'For time';
      if (wod.repScheme && wod.rounds) {
        return {
          success: true,
          message: 'Successfully assigned workout rounds and rep scheme.',
          wod: wod
        };
      }
      else {
        return {
          success: false,
          message: 'Failed to assign number of rounds and a rep scheme to the workout.',
        };
      }
    }


    if (type === 'EMOM') {
      if (!repScheme || repScheme === 'any') {
        wod.repScheme = repSchemes[numbers.pickOneFromList(0, repSchemes.length)];
      }
      else {
        wod.repScheme = repScheme;
      }
      wod.rounds = 'N/A - Every minute is a round.';

      if (wod.repScheme) {
        return {
          success: true,
          message: 'Successfully assigned the rep scheme to the workout.',
          wod: wod
        };
      }
      else {
        return {
          success: false,
          message: 'Failed to assign the rep scheme to the workout.'
        };
      }
    }



    if (type === 'Tabata') {
      wod.rounds = 8;
      wod.timer = 'N/A - 8 rounds of 20 seconds on, 10 seconds off.';
      wod.repScheme = 'lowRepHighWeight';

      if (wod.rounds && wod.repScheme) {
        return {
          success: true,
          message: 'Successfully assigned rounds and rep scheme to workout.',
          wod: wod
        };
      }
      else {
        return {
          success: false,
          message: 'Failed to assign rounds and rep scheme to workout.'
        };
      }
    }


    if (type === 'Bodybuilding') {
      wod.rounds = 'N/A - bodybuilding workout.';
      if (!repScheme || repScheme === 'any') {
        wod.repScheme = repSchemes[numbers.pickOneFromList(0, repSchemes.length)];
      }
      else {
        wod.repScheme = repScheme;
      }

      if (wod.repScheme) {
        return {
          success: true,
          message: 'Successfully assigned rep scheme to workout.',
          wod: wod
        };
      }
      else {
        return {
          success: false,
          message: 'Failed to assign rep scheme to workout.'
        };
      }
    }




    if (repScheme === 'any') {
      repScheme = repSchemes[numbers.pickOneFromList(0, repSchemes.length)];
    }

    if (repScheme === 'lowRepHighWeight') {
      wod.repScheme = 'lowRepHighWeight';
      wod.timer = 'For Time';


      switch (type) {
        case 'Triplet':
          wod.rounds = numbers.generate(4, 5);
          break;
        case 'Couplet':
          wod.rounds = numbers.generate(5, 6);
          break;
        default:
          return {success: false};
      }
    }
    else if (repScheme === 'mediumRepsAndWeight') {
      wod.repScheme = 'mediumRepsAndWeight';
      wod.timer = 'For Time';

      switch (type) {
        case 'Triplet':
          wod.rounds = numbers.generate(3, 4);
          break;
        case 'Couplet':
          wod.rounds = numbers.generate(4, 5);
          break;
      }
    }
    else if (repScheme === 'highRepLowWeight') {
      wod.repScheme = 'highRepLowWeight';
      wod.timer = 'For Time';

      switch (type) {
        case 'Triplet':
          wod.rounds = numbers.generate(2, 3);
          break;
        case 'Couplet':
          wod.rounds = numbers.generate(3, 4);
          break;
      }
    }
    else  {
      return {
        success: false,
        message: 'Error assigning rounds and rep scheme.'
      };
    }




    if (wod.rounds && wod.repScheme) {
      return {
        success: true,
        message: 'Successfully assigned rounds and rep scheme to the workout.',
        wod: wod
      };
    }
    else {
      return {
        success: false,
        message: 'Failed to assign number of rounds and a rep scheme to the workout.'
      };
    }
  }
};