const calcAverageHumanAge = function (ages) {
  // Using map fn to return new array of human dog ages
  // and storing in humanDogAge ref.
  const humanDogAge = ages.map(age => {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
    }
  });

  console.log(humanDogAge);

  // Filter Fn to filter for dogs having ages>=18
  const filteredAges = humanDogAge.filter(humanAge => humanAge >= 18);

  console.log(filteredAges);

  // Reduce Fn to get the sum of all ages
  const agesSum = filteredAges.reduce((prevVal, currVal) => {
    return prevVal + currVal;
  }, 0);

  // Return the average age
  return agesSum / filteredAges.length;
};

// Test Data 1
const ages1 = [5, 2, 4, 1, 15, 8, 3];
console.log(`Average human age of dogs : ${calcAverageHumanAge(ages1)}`);

// Test Data 2
const ages2 = [16, 6, 10, 5, 6, 1, 4];
console.log(`Average human age of dogs : ${calcAverageHumanAge(ages2)}`);
