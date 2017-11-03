const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      exerciseUrl = 'mongodb://localhost:27017/exercises',
      userUrl = 'mongodb://localhost:27017/users';

test = {
  exerciseQueryByPrimaryMuscleGrp: (userMuscleGrp) => {
      console.log('entered exerciseQueryByPrimaryMuscleGrp');
      MongoClient.connect(exerciseUrl, (err, db) => {
        console.log('entered mongo connect')
        assert.equal(null, err); 
        console.log(`querying exercise db by primary muscle group...${userMuscleGrp}`);

        const exerciseArray = [];
        
        let exercises = db.collection('exercises')
          .find({
            priMuscleGrp: userMuscleGrp
          },
          {
            _id: 0,
            name: 1,
            muscleGrp: 1
          }
        );

        exercises.forEach((exercise, err) => {
          // console.log(exercise);
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          console.log('closed connection to db (pri muscle)');
          console.log(exerciseArray);
          return exerciseArray;
        });

      });
      console.log('leaving exerciseQueryByPrimaryMuscleGrp');
    },

    test: (userMuscleGrp) => {
      
      console.log('entered test');

      return new Promise((resolve, reject) => {

        console.log('entered test promise');

        MongoClient.connect(exerciseUrl, (err, db) => {

          console.log('entered test connect within promise');

          const exerciseArray = [];
        
          let exercises = db.collection('exercises')
            .find({
              priMuscleGrp: userMuscleGrp
            },
            {
              _id: 0,
              name: 1,
              muscleGrp: 1
            }
          );

          exercises.forEach((exercise, err) => {
            // console.log(exercise);
            exerciseArray.push(exercise);
          }, () => {
            db.close();
            console.log('closed connection to db (pri muscle)');
            console.log(exerciseArray);
            console.log('resolving');
            resolve(exerciseArray);
          });

          console.log('finished test connect within promise');

        });

        console.log('finished test promise');

      });

    }
};


module.exports = test;
