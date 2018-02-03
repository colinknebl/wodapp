const numbers = require('../numbers/numbers');

module.exports = {
  setUp: (wodType, wod) => {
    if (wodType === 'any') {
      wod.type = wodTypes[numbers.pickOneFromList(0, wodTypes.length)];
    }
    else {
      wod.type = wodType;
    }

    if (wod.type) {
      return {
        success: true,
        message: 'Successfully assigned wod type',
        wod: wod     
      };
    }
    else {
      return {
        success: false,
        message: 'Failed to assign wod type'
      };
    }
  }
};


wodTypes = ['AMRAP',
            'Singlet',
            'Couplet',
            'Triplet',
            'Chipper',
            'EMOM',
            'Tabata',
            'Bodybuilding'];