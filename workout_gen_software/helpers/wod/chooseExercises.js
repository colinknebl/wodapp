const numbers = require('../../numbers');
      
    
data = {
  muscleGrp: '',
  exercises: [],
  filteredExercises: [],
  numOfExercisesRequired: 0,
  muscleGroups: ['legs', 'back', 'shoulders', 'chest']
};

chooseExercises = {

  setUp: (muscleGrp, exercises, numOfExercisesRequired) => {

    data.muscleGrp = muscleGrp;
    data.exercises = exercises;
    data.numOfExercisesRequired = numOfExercisesRequired;

    console.log('**********************');
    console.log(data.muscleGrp);
    console.log(data.exercises.length);
    console.log(data.numOfExercisesRequired);
    console.log('**********************');

    // CHOOSE MUSCLE GROUP IF THE USER SELECTED 'any'
    if (data.muscleGrp === 'any') {
      data.muscleGrp = chooseMuscleGrp();
    }

    if (numOfExercisesRequired === 1) {
      return chooseExercises.one();
    }
    else if (numOfExercisesRequired === 2) {
      return chooseExercises.two();
    }

  },

  two: () => {
    // data.exercises.forEach(ex => {
    //   console.log(ex.name, ex.category);
    // });
  },

  one: () => {

    // FILTER EXERCISES
    let filteredExercises = filterExercisesBasedOnMuscleGrp();

    // RETURN AN ARRAY WITH ONE EXERCISE
    return [filteredExercises[numbers.pickOneFromList(0, filteredExercises.length)]];
  }
};

filterExercisesBasedOnMuscleGrp = () => {
  return data.exercises.filter(ex => 
    ex.priMuscleGrpGeneral === data.muscleGrp
  );
};

chooseMuscleGrp = () => {
  return data.muscleGroups[numbers.pickOneFromList(0, data.muscleGroups.length)];
};

module.exports = chooseExercises;