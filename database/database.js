const MongoClient   = require('mongodb').MongoClient,
      assert        = require('assert');
      localhostUrl  = 'mongodb://localhost:27017/wodapp';
      mongoAtlasUrl = 'mongodb://colinknebl:special25@wodapp-shard-00-00-ihelb.mongodb.net:27017,wodapp-shard-00-01-ihelb.mongodb.net:27017,wodapp-shard-00-02-ihelb.mongodb.net:27017/wodapp?ssl=true&replicaSet=wodapp-shard-0&authSource=admin';

let userNum    = 0;
let contactNum = 0;

// var uri = "mongodb+srv://kay:myRealPassword@cluster0-wpeiv.mongodb.net/test";
// MongoClient.connect(uri, function(err, db) {
//   db.close();
// });


mongodb = {
  
  // CONNECT TO MONGODB DATABASE USING MONGODB
  testConnection: () => {
    MongoClient.connect(localhostUrl, (err, db) => {
      assert.equal(null, err); 
      // assert.notEqual(docs.length, 0);
      console.log('MongoDB connection works.');
      db.close();
    });
  },

  testAtlasConnection: () => {
    MongoClient.connect(mongoAtlasUrl, (err, db) => {
      assert.equal(null, err); 
      console.log('MongoDB Atlas connection works.');
      db.close();
    });
  },

  addUser: (user, date) => {
    // MongoClient.connect(mongoAtlasUrl, (err, db) => {
    MongoClient.connect(localhostUrl, (err, db) => {
      assert.equal(null, err); 
      // console.log('adding user  to user db...');

      db.collection('users')
        .insertOne({
          firstName : user.firstName,
          lastName  : user.lastName,
          email     : user.email,
          dateAdded : date,
          userNum   : userNum
        });
      db.close();      
    });
    userNum++;
  },



  addRegisteredUser: (user, today) => {
    // MongoClient.connect(mongoAtlasUrl, (err, db) => {
    MongoClient.connect(localhostUrl, (err, db) => {
      assert.equal(null, err); 
      // console.log('adding user  to user db...');

      db.collection('registeredUsers')
        .insertOne({
          firstName : user.firstName,
          lastName  : user.lastName,
          email     : user.email,
          dateAdded : today
        });
      db.close();
    });
  },

  addContactRequest: (contactData) => {
    // MongoClient.connect(mongoAtlasUrl, (err, db) => {
    MongoClient.connect(localhostUrl, (err, db) => {
      assert.equal(null, err); 
      console.log('adding contact request to contactFormRequests db...');
      db.collection('contactFormRequests')
        .insertOne({
          firstName   : contactData.firstName,
          lastName    : contactData.lastName,
          email       : contactData.email,
          requestType : contactData.requestType,
          message     : contactData.message,
          contactNum  : contactNum,
          dateAdded   : contactData.dateAdded
        });
      contactNum++;
      db.close();
    });
  },

  addWod: (wod) => {
    // MongoClient.connect(mongoAtlasUrl, (err, db) => {
    MongoClient.connect(localhostUrl, (err, db) => {
      assert.equal(null, err); 

      db.collection('wods').insertOne(wod);
      db.close();
      
    });
  },

  getWod: (_id) => {

    return new Promise((resolve, reject) => {

      // MongoClient.connect(mongoAtlasUrl, (err, db) => {
      MongoClient.connect(localhostUrl, (err, db) => {
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

  exerciseQuery: (data) => {
    /*
      exerciseQuery argument list. NOTE: if you add an argument to this method you must add the same argument to the "mongodb.queryBuilder" method.
      
      data = {
      M     user: user,
      M     queryTypes: [
              'priMuscleGrpGeneral',
              'secMuscleGrp',
              'oppMuscleGrp',
              'category'
            ],
      O     categorySearchValues: [
              'metabolic conditioning',
              'crossfit'
            ],
      O     skillLvlSearchValues: []
      }

      1. argument 1 = user object
      2. argument 2 = array of query types
          - muscleGrp
          - priMuscleGrpGeneral
          - secMuscleGrp
          - oppMuscleGrp
          - category
          - skillLvl
      3. argument 3 = array of arrays -- each query type has an associated query value array at the same array position.
          Example: if queryType[2] = skillLvl, queryTypeArrayValues[2] will be an array with the user's skill level (i.e. 'intermediate').
          - metabolic conditioning
      4. argument 4 = array of values for muscleGrp searches

    */

    // BUILD THE DATABASE QUERY
    const query = mongodb.queryBuilder.v1(data);
    // console.log('/*****************/');
    // console.log('The DB query is: ', query);
    // console.log('/*****************/');
    // ************************


    return new Promise((resolve, reject) => {

      // MongoClient.connect(mongoAtlasUrl, (err, db) => {
      MongoClient.connect(localhostUrl, (err, db) => {

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

  queryBuilder: {
    v1: (data) => {

      // console.log('==================');
      // console.log(data);
      // console.log('==================');


      let queryDetails = [];

      let query = {
        $and : queryDetails
      };
      /*
        db.exercises.find(
          $and : [{  }]
        )
      */

      data.queryTypes.forEach((queryType) => {

        // console.log('queryType: ', queryType);


        if (queryType === 'skillLvl') {

          if ('skillLvl' in data.user && data.user.skillLvl === 'beginner') {
            queryDetails.push({'skillLevel' : 'beginner'});
          }
          else if ('skillLvl' in data.user && data.user.skillLvl === 'intermediate') {
            queryDetails.push({$or : [
                {'skillLevel' : 'beginner'},
                {'skillLevel' : 'intermediate'}
              ]
            });
          }
          else if ('skillLvl' in data.user && data.user.skillLvl === 'advanced') {
            queryDetails.push({$or : [
                {'skillLevel' : 'beginner'},
                {'skillLevel' : 'intermediate'},
                {'skillLevel' : 'advanced'}
              ]
            });
          }
          else if ('skillLvl' in data.user && data.user.skillLvl === 'athlete') {
            queryDetails.push({$or : [
                {'skillLevel' : 'beginner'},
                {'skillLevel' : 'intermediate'},
                {'skillLevel' : 'advanced'},
                {'skillLevel' : 'athlete'}
              ]
            });
          }
        }


        else if (queryType === 'oppMuscleGrp') {

          let muscleGrpInstance = {};
          let oppMuscleGrp;

          switch (data.user.muscleGrp) {
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
            default:
              console.log("error in opposing muscle group db query builder. tag: asdg/486-dsagg");
          }
          muscleGrpInstance.opposingMuscleGrp = oppMuscleGrp;
          queryDetails.push(muscleGrpInstance);
        }

        else if (queryType === 'secMuscleGrp') {
          let muscleGrpInstance = {};
          
          if ('muscleGrp' in data.user && data.user.muscleGrp !== 'any') {
            muscleGrpInstance.muscleGrps = data.user.muscleGrp;
            queryDetails.push(muscleGrpInstance);
          }
        }



        else if (queryType === 'priMuscleGrpGeneral') {
          let muscleGrpInstance = {};

          if ('muscleGrp' in data.user && data.user.muscleGrp !== 'any') {
            muscleGrpInstance.priMuscleGrpGeneral = data.user.muscleGrp;
            queryDetails.push(muscleGrpInstance);
          }
        }



        else if (queryType === 'muscleGrp') {

          let muscleGrpInstance = {};

          if ('muscleGrp' in data.user && data.user.muscleGrp !== 'any') {
            muscleGrpInstance.muscleGrps = data.user.muscleGrp;
            queryDetails.push(muscleGrpInstance);
          }
          else if ('muscleGrp' in data.user && data.user.muscleGrp === 'any' && data.muscleGroupSearchValue) {
            muscleGrpInstance.muscleGrps = data.muscleGroupSearchValue;
            queryDetails.push(muscleGrpInstance);
          }
          else {
            console.log('error in muscle group query builder. tag: 3132598ykjsdbkasdg');
          }
        }



        else if (queryType === 'category') {

          let categoryInstance = {};

          if (data.categorySearchValues) {

            data.categorySearchValues.forEach((categorySearchValue) => {

              categoryInstance.category = categorySearchValue;
              queryDetails.push(categoryInstance);
              
            });
          }
          else {
            console.log("categorySearchValues in query 'data' object did not exist--category search value will be generic. tag:9f]2jfae09g");

            if (
              data.user.wodType === 'amrap'      ||
              data.user.wodType === 'bodyweight' ||
              data.user.wodType === 'chipper'    ||
              data.user.wodType === 'couplet'    ||
              data.user.wodType === 'emom'       ||
              data.user.wodType === 'hybrid'     ||
              data.user.wodType === 'singlet'    ||
              data.user.wodType === 'tabata'     ||
              data.user.wodType === 'timeCap'
            ) {
              categoryInstance.category = 'crossfit';
            }
            else if (data.user.wodType === 'endurance') {
              categoryInstance.category = 'endurance';
            }
            else if (data.user.wodType === 'strength') {
              categoryInstance.category = 'strength'; 
            }
            else if (data.user.wodType === 'strongman') {
              categoryInstance.category = 'strongman'; 
            }
            else if (data.user.wodType === 'weightlifting') {
              categoryInstance.category = 'weightlifting'; 
            }
            else if (data.user.wodType === 'bodybuilding') {
              categoryInstance.category = 'bodybuilding'; 
            }
            else {
              console.error('invalid generic search category assignment. tag: &238adgnadsgl348');
            }

            queryDetails.push(categoryInstance);
          }

        }

      });

      return query;

    }
  }

};

module.exports = mongodb;


