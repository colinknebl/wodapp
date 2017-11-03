const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      exerciseUrl = 'mongodb://localhost:27017/exercises',
      userUrl = 'mongodb://localhost:27017/users';

// const wodGenerator = require('../workout_gen_software/wodGenerator');




mongodb = {
  
  // CONNECT TO MONGODB DATABASE USING MONGODB
  exerciseConnect: () => {
    MongoClient.connect(exerciseUrl, (err, db) => {
      assert.equal(null, err); 
      console.log('MongoDB exercise connection works.');
      db.close();
    });
  },

  userConnect: () => {
    MongoClient.connect(userUrl, (err, db) => {
      assert.equal(null, err); 
      console.log('MongoDB user connection works.');
      db.close();
    });
  },

  addUser: (userFirstName, userLastName, userEmail) => {
    MongoClient.connect(userUrl, (err, db) => {
      assert.equal(null, err); 
      console.log('adding user to user db...');

      db.collection('users')
        .insertOne({
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail
        });
      db.close();
      console.log('user added');
      
    });
  },

  exerciseQueryX: (userSkillLvl, userRepScheme, userWodType, userMuscleGrp, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip) => {

    MongoClient.connect(exerciseUrl, (err, db) => {
      assert.equal(null, err); 
      console.log('querying exercise db...');

      let level = 'gold';
      
      let exercises = db.collection('exercises')
        .find({
          muscleGrps: userMuscleGrp
        },
        {
          name: 1, 
          _id: 0
        }
      );
      
      exercises.forEach((exercise, err) => {
        console.log(exercise);
      }, () => {
        db.close();
        console.log('closing connection to db');
      });
    });
  },

  exerciseQuery: (userSkillLvl, userRepScheme, userWodType, userMuscleGrp, userMaxBench, userMaxSquat, userMaxSnatch, userMaxDead, userEquip) => {
    
    mongodb.exercises = [];

    if (userMuscleGrp !== "any") {
      mongodb.exerciseQueryByMuscleGrp(userMuscleGrp);
    } else {
      console.log('no muscle group selected');
    }
    
  },

  exerciseQueryByPrimaryMuscleGrp: (userMuscleGrp, userEquip) => {

    console.log('entered exerciseQueryByPrimaryMuscleGrp');

    // const exerciseArray = [];

    return new Promise((resolve, reject) => {
      console.log('entered exerciseQueryByPrimaryMuscleGrp promise');

      MongoClient.connect(exerciseUrl, (err, db) => {

        console.log('entered exerciseQueryByPrimaryMuscleGrp db connect');

        assert.equal(null, err);
        const exerciseArray = [];

        let exercises = db.collection('exercises')
          .find({
            priMuscleGrp: userMuscleGrp
          },
          {
            _id: 0
          }
        );

        exercises.forEach((exercise, err) => {
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          if (exerciseArray) {
            console.log('exerciseQueryByPrimaryMuscleGrp resolved');
            console.log(userEquip);
            console.log(exerciseArray);
            resolve(exerciseArray); 
          } else {
            reject('failed to load');
          }          

        });
        console.log('finished exerciseQueryByPrimaryMuscleGrp db connect');
      });
      console.log('finished exerciseQueryByPrimaryMuscleGrp promise');
    });
  },

  exerciseQueryBySecondaryMuscleGrp: (userMuscleGrp) => {

    console.log('entered exerciseQueryBySecondaryMuscleGrp');

    return new Promise((resolve, reject) => {

      console.log('entered exerciseQueryBySecondaryMuscleGrp promise');

      MongoClient.connect(exerciseUrl, (err, db) => {

        console.log('entered exerciseQueryBySecondaryMuscleGrp db connect');

        assert.equal(null, err);
        const exerciseArray = [];
      
        let exercises = db.collection('exercises')
          .find({
            muscleGrps: userMuscleGrp
          },
          {
            _id: 0
          }
        );

        exercises.forEach((exercise, err) => {
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          if (exerciseArray) {
            console.log('exerciseQueryBySecondaryMuscleGrp resolved');
            resolve(exerciseArray);
          } else {
            reject('failed to load');
          }
        });

        console.log('finished exerciseQueryBySecondaryMuscleGrp db connect');
      });

      console.log('finished exerciseQueryBySecondaryMuscleGrp promise');
    });
  },

  exerciseQueryByCategory: (userMuscleGrp) => {

    console.log('entered exerciseQueryByCategory');

    return new Promise((resolve, reject) => {

      console.log('entered exerciseQueryByCategory promise');

      MongoClient.connect(exerciseUrl, (err, db) => {

        console.log('entered exerciseQueryByCategory db connect');

        assert.equal(null, err);
        const exerciseArray = [];
      
        let exercises = db.collection('exercises')
          .find({
            category: userMuscleGrp
          },
          {
            _id: 0
          }
        );

        exercises.forEach((exercise, err) => {
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          if (exerciseArray) {
            console.log('exerciseQueryByCategory resolved');
            resolve(exerciseArray);
          } else {
            reject('failed to load');
          }
        });
        console.log('finished exerciseQueryByCategory db connect');
      });
      console.log('finished exerciseQueryByCategory promise');
    });
  }

};

module.exports = mongodb;


