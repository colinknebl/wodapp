const mongodb      = require('../database/database'),
      wodValidator = require('../models/Wod'),
      helpers      = require('./helpers');

// V3 SPECIFIC FILES
const userClass    = require('./helpers/user/validate'),
      wodClass     = require('./helpers/wod/setUp');

// WORKOUT FILES
const amrap        = require('./wod_types/amrap'),
      singlet      = require('./wod_types/singlet'),
      couplet      = require('./wod_types/couplet'),
      triplet      = require('./wod_types/triplet');


wodGeneratorV3 = {
  generateWod: (data) => {
    console.log('********  V3  *********');
    // console.log('======== USER ========>',data.user);
    // console.log('***********************');
    // console.log('***********************');
    
    return new Promise((resolve, reject) => {

      // CHECK FOR _id -- NEEDED FOR WORKOUT ID
      if (!data._id) {
        reject({
          success: false,
          message: 'Workout ID (_id) not provided.'
        });
      }

      let wod = {
        _id: data._id,
        type: null,
        timer: null,
        rounds: null,
        repScheme: null,
        reps: null,
        run: null, // true/false if there is a run involved with the wod
        instructions: null,
        exercises: []
      };      

      // VALIDATE USER DATA
      let user = userClass.validate(data.user);

      if (!user.success) {
        reject(user);
      } else {

      user = user.user;

      // SET UP WOD DATA
      wod = wodClass.setUp(user, wod);



      


      resolve({buildingV3: true});
      }
    });
  }
};

module.exports = wodGeneratorV3;