numbers = {

  generate: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  pickOneFromList: (min, max) => {
    max = max - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  round: {
    promise: (num) => {

      return new Promise((resolve, reject) => {
        let returnNum;
        num = num + '';

        let originalNum = num.slice(0, num.length - 1);

        let roundedNum = num.slice(-1);
        if (roundedNum < 2.5) {
          roundedNum = 0;
          returnNum = originalNum + roundedNum;
        }
        else if (roundedNum >= 2.5 && roundedNum <= 7.4) {
          roundedNum = 5;
          returnNum = originalNum + roundedNum;
        }
        else  {
          let upNum = num.slice(num.length - 2, num.length - 1);
          upNum++;
          upNum = upNum + '0';
          originalNum = num.slice(0, num.length - 2);
          returnNum = originalNum + upNum;
        }
        
        returnNum = Number.parseInt(returnNum);

        resolve(returnNum);

      });
    },

    noPromise: (num) => {
     
      let returnNum;
      num = num + '';

      let originalNum = num.slice(0, num.length - 1);

      let roundedNum = num.slice(-1);
      if (roundedNum < 2.5) {
        roundedNum = 0;
        returnNum = originalNum + roundedNum;
      }
      else if (roundedNum >= 2.5 && roundedNum <= 7.4) {
        roundedNum = 5;
        returnNum = originalNum + roundedNum;
      }
      else  {
        let upNum = num.slice(num.length - 2, num.length - 1);
        upNum++;
        upNum = upNum + '0';
        originalNum = num.slice(0, num.length - 2);
        returnNum = originalNum + upNum;
      }
      
      returnNum = Number.parseInt(returnNum);
      return returnNum;
    },
  }

};

module.exports = numbers;