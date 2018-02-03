const numbers = require('../numbers');

module.exports = {
  generate: (user, wod, exercises) => {
    console.log('chipper', wod);
    /*
      1. choose exercises
        - number of exercises = number of rounds
        - wod.exercises
      2. choose reps based repScheme. 
        - will be mediumRepsAndWeight, or highRepLowWeight
        - wod.reps
      3. choose if a run component should be added.
        - how to choose if a run component should be added?
        - if the number of rounds is over a certain time?
        - if the enduranceFocus is true?
        - wod.run
      4. assign instructions
        - wod.instructions
    */

  }
};