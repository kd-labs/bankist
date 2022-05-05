'use strict';

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

/***************** Task 1 ********************/

dogs.forEach(dog => {
  dog.recommended = dog.weight * 0.75 * 28;
  dog.dietLevel =
    dog.curFood < 0.9 * dog.recommended
      ? 'too little'
      : dog.curFood > 1.1 * dog.curFood
      ? 'too much'
      : 'exact';
});

console.log(dogs);

/*********************************************/

/***************** Task 2 ********************/

const sarahDog = dogs.find(function (dog) {
  return dog.owners.includes('Sarah');
});

console.log(sarahDog.dietLevel);

/*********************************************/

/***************** Task 3 ********************/

const summary = dogs.reduce(
  (summary, currValue) => {
    const key =
      currValue.dietLevel === 'too much'
        ? 'ownersEatTooMuch'
        : currValue.dietLevel === 'too little'
        ? 'ownersEatTooLittle'
        : null;

    key && summary[key].push(...currValue.owners);
    return summary;
  },
  { ownersEatTooMuch: [], ownersEatTooLittle: [] }
);

console.log(summary);

/*********************************************/
