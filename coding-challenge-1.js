const checkDogs = function (arr1, arr2) {
  // slice extracts ranged elements from original array and returns
  // new array without changing orignal array
  const corrected = arr1.slice(1, -2);

  //   const combinedArr = [...corrected, ...arr2];
  //                OR
  const combinedArr = corrected.concat(arr2);

  // iterating over each element using callback fn which takes ele and idx
  // as parameters
  combinedArr.forEach(function (age, idx) {
    if (age >= 3) {
      console.log(`Dog number ${idx + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${idx + 1} is still a puppy`);
    }
  });
};

// Test Data 1
const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];

checkDogs(julia, kate);

// Test Data 2
// const julia = [9, 16, 6, 8, 3];
// const kate = [10, 5, 6, 1, 4];
