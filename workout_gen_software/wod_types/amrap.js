const numbers = require('../numbers');

module.exports = {
  generate: (user, wod, exercises) => {
    console.log('amrap', wod);
    /*
      1. choose exercises
        - how many exercises should be chosen?
        - what is the number of exercises chosen based on? timer?
        - wod.exercises
      2. choose reps based repScheme. 
        - will be mediumRepsAndWeight, or highRepLowWeight
        - wod.reps
      3. choose if a run component should be added.
        - how to choose if a run component should be added?
        - if the enduranceFocus is true?
        - if the timer is over a certain time?
        - wod.run
      4. assign instructions
        - wod.instructions
    */
  }
};