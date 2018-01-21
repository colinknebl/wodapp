const numbers = require('../numbers/numbers');

module.exports = {
  setUp: (timer, wod) => {
    if (timer === 'any') {
      let timer = numbers.generate(5, 60);
      if (timer > 20) {
        wod.timer = numbers.round.noPromise(timer);
      }
      else {
        wod.timer = timer;
      }
    }
    else if (timer === 'No Time Limit') {
      wod.timer = 'For Time';
    }
    else {
      if (timer > 20) {
        let sTimer = timer.toString();
        if (sTimer[sTimer.length - 1] !== '0' && sTimer[sTimer.length - 1] !== '5') {
          wod.timer = numbers.round.noPromise(timer); 
        }
        else {
          wod.timer = timer;
        }
      }
      else {
        wod.timer = timer;
      }
    }

    if (wod.timer) {
      return {
        success: true,
        message: 'Successfully assigned wod timer',
        wod: wod
      };
    }
    else {
      return {
        success: false,
        message: 'Failed to assign wod timer'
      };
    }
  }
};