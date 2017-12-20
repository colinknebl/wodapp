const MongoClient = require('mongodb').MongoClient,
      assert      = require('assert'),
      exerciseUrl = 'mongodb://localhost:27017/exercises',
      userUrl     = 'mongodb://localhost:27017/users',
      wodsUrl     = 'mongodb://localhost:27017/wods',
      wodAppUrl   = 'mongodb://localhost:27017/wodapp';

mongodb = {
  
  // CONNECT TO MONGODB DATABASE USING MONGODB
  testConnection: () => {
    MongoClient.connect(wodAppUrl, (err, db) => {
      assert.equal(null, err); 
      // assert.notEqual(docs.length, 0);
      console.log('MongoDB connection works.');
      db.close();
    });
  },

  addUser: (userFirstName, userLastName, userEmail) => {
    MongoClient.connect(wodAppUrl, (err, db) => {
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

  addWod: (wod) => {
    MongoClient.connect(wodAppUrl, (err, db) => {
      assert.equal(null, err); 

      db.collection('wods').insertOne(wod);
      db.close();
      
    });
  },

  getWod: (_id) => {

    return new Promise((resolve, reject) => {

      MongoClient.connect(wodAppUrl, (err, db) => {
        assert.equal(null, err); 

        let wodArray = [];
        let wod = db.collection('wods').find({'_id': _id});

        wod.forEach((wod, err) => {
          wodArray.push(wod);
        }, () => {
          db.close();
          if (wodArray) {
            resolve(wodArray);
          } else {
            reject(err);
          }
        });
      });
    });
  },

  exerciseQuery: (user, queryType, categorySearchValue) => {

    // exerciseQuery argument list. NOTE: if you add an argument to this method you must add the same argument to the "mongodb.queryBuilder" method.
      // argument 1 = user object
      // argument 2 = array of query types
      //    - priMuscleGrp
      //    - secMuscleGrp
      //    - oppMuscleGrp
      //    - category
      //    - muscleGrp
      // argument 3 = array of values for category type searches
      //    - metabolic conditioning
    
    // BUILD THE DATABASE QUERY
    const query = mongodb.queryBuilder(user, queryType, categorySearchValue);
    console.log('/*****************/');
    console.log('The DB query is:');
    console.log(query);
    console.log('/*****************/');
    // ************************

    return new Promise((resolve, reject) => {

      MongoClient.connect(wodAppUrl, (err, db) => {

        assert.equal(null, err);

        const exerciseArray = [];
        const projection = {
          _id:0,
          "primaryMuscleTarget":0,
          "secondaryMuscleTarget":0
        };
      
        const cursor = db.collection('exercises').find(query, projection);

        cursor.forEach((exercise, err) => {
          exerciseArray.push(exercise);
        }, () => {
          db.close();
          if (exerciseArray) {
            resolve(exerciseArray);
          } else {
            reject('failed to load');
          }
        });
      });
    });
  },

  queryBuilder: (user, queryType, categorySearchValue) => {

    // console.log('start queryBuilder');
    // console.log(`categorySearchValue: ${categorySearchValue}`);

    console.log(user);

    let queryDetails = {};

    let query = {
      $and : [queryDetails]
    };

    for (var i = 0; i < queryType.length; i++) {

      // console.log(`queryType: ${queryType[i]}`);

      if (queryType[i] === 'muscleGrp') {

        if ('muscleGrp' in user && user.muscleGrp !== 'any') {
          console.log('test1');
          queryDetails.muscleGrps = user.muscleGrp;
        } 
      }

      if (queryType[i] === 'priMuscleGrp') {

        if ('muscleGrp' in user && user.muscleGrp !== 'any') {
          queryDetails.priMuscleGrp = user.muscleGrp;
        } 
      }

      else if (queryType[i] === 'secMuscleGrp') {

        if ('muscleGrp' in user && user.muscleGrp !== 'any') {
          queryDetails.muscleGrps = user.muscleGrp;
        } 
      }

      else if (queryType[i] === 'oppMuscleGrp') {

        let oppMuscleGrp;

        switch (user.muscleGrp) {
          case "chest":
            oppMuscleGrp = "back";
            break;
          case "back":
            oppMuscleGrp = "chest";
            break;
          case "quads":
            oppMuscleGrp = "hamstrings";
            break;
          case "hamstrings":
            oppMuscleGrp = "quads";
            break;
          case "anterior deltoids":
            oppMuscleGrp = "posterior deltoids";
            break;
          case "posterior deltoids":
            oppMuscleGrp = "anterior deltoids";
            break;
          case "biceps":
            oppMuscleGrp = "triceps";
            break;
          case "triceps":
            oppMuscleGrp = "biceps";
            break;
        }

        queryDetails.opposingMuscleGrp = oppMuscleGrp;
      }

      else if (queryType[i] === 'skillLevel') {
        // skillLevel values in db
        //  - beginner
        //  - intermediate
        //  - advanced

        if ('skillLvl' in user) {
          queryDetails.skillLevel = user.skillLvl;
        }
      }

      else if (queryType[i] === 'category') {
        // category values in db
        //  - weightlifting
        //  - gymnastics
        //  - plyometric
        //  - crossfit
        //  - metabolic conditioning
        //  - body building


        if (categorySearchValue) {

          // console.log(`categorySearchValue: ${categorySearchValue}`);
          // console.log(`categorySearchValue.length: ${categorySearchValue.length}`);

          if (categorySearchValue.length === 1) {

            queryDetails.category = categorySearchValue[0];

          }

          else if (categorySearchValue > 1) {

            let categories = [];

            queryDetails.category = {
              $or : categories
            };
            
            for (let i = 0; i < categorySearchValue.length; i++) {
              let categoryInstance = {};
              categoryInstance.category = categorySearchValue[i];
              categories.push(categoryInstance);

            }
          }
        }

        else if (!categorySearchValue) {

          if (
            user.wodType === 'amrap'      ||
            user.wodType === 'bodyweight' ||
            user.wodType === 'chipper'    ||
            user.wodType === 'couplet'    ||
            user.wodType === 'emom'       ||
            user.wodType === 'hybrid'     ||
            user.wodType === 'singlet'    ||
            user.wodType === 'tabata'     ||
            user.wodType === 'timeCap'
          ) {
            queryDetails.category = 'crossfit';
          }
          else if (user.wodType === 'endurance') {
            queryDetails.category = 'endurance';
          }
          else if (user.wodType === 'strength') {
            queryDetails.category = 'strength'; 
          }
          else if (user.wodType === 'strongman') {
            queryDetails.category = 'strongman'; 
          }
          else if (user.wodType === 'weightlifting') {
            queryDetails.category = 'weightlifting'; 
          }
          else if (user.wodType === 'bodybuilding') {
            queryDetails.category = 'bodybuilding'; 
          }
          else {
            console.error('invalid search category');
          }
        }

        else {
          console.error('error with search category');
        }
      }
    }

    // console.log(query);

    return query;
  }

};

module.exports = mongodb;


