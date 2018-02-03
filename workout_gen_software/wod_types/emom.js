const numbers = require('../numbers');

module.exports = {
  generate: (user, wod, exercises) => {
    console.log('emom', wod);   
    /*
      1. choose exercises
        - how many exercises should be chosen?
          - what should the number of exercises chosen be based on?
        - rounds are: "N/A - Every minute is a round."
        - wod.exercises
      2. choose reps based on repScheme. 
        - can be any of the three options: low reps, med reps, high reps
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