const path         = require('path'),
      http         = require('http'),
      bodyParser   = require('body-parser'),
      mongodb      = require('../database/database'),
      wodValidator = require('../models/Wod'),
      helpers      = require('./helpers');

const amrap        = require('./wod_types/amrap'),
      singlet      = require('./wod_types/singlet');




// let results = wodValidator.validate({
//   wod: wod,
//   file: 'wodGeneratorV2',
//   tag: '235^vasodi494f348v',
//   needs: {
//     _id: true,
//     type: false,
//     instructions: false,
//     timer: false,
//     repScheme: false,
//     rounds: false,
//     reps: false,
//     run: false,
//     exercises: false
//   }
// }); // returns success (T/F) and message
// console.log(results);




wodGeneratorV2 = {

  generateWod: (data) => {

    return new Promise((resolve, reject) => {
      let wod = {
        _id: data._id,
        type: null,
        instructions: null,
        timer: null,
        repScheme: null,
        rounds: null,
        reps: null,
        run: null, // true/false if there is a run involved with the wod
        exercises: []
      };

      // Validate user data
      let user = helpers.verifyUserData.v1(data.user);

      user
        .then(results => {
          user = results.user;

          // Fill in the holes in the wod constructor
          wod = helpers.assignWodInfo.v1(wod, user);
          return wod;
        })
        .then(results => {

          wod = results.wod;

          switch (results.wod.type) {
            case "AMRAP":
              resolve({type: 'amrap'});
              // wod = amrap.generate(user, wod);
              // wod.then((wod) => {
              //   console.log('thw wod:',wod);
              // });
              break;
            case "Singlet":
              wod = singlet.generate(user, wod);
              wod
                .then(results => {
                  resolve(results);
                })
                .catch(err => reject(err));
              break;
            case "Couplet":
              resolve({type: 'couplet'});
              // wod = wodGenerator.couplet(user, wodConst);
              // return Promise.resolve(wod);
              break;
            default:
              resolve({
                success: false,
                message: `There seems to be an issue generating a workout for the ${user.wodType} type. Please choose a different workout type from the dropdown.`
              });

          }

        })
        .catch(err => console.log(err));
      
    });
  }
};

module.exports = wodGeneratorV2;