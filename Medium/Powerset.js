/*
Write a function that takes in an array of unique integers and returns its
powerset.

The powerset P(X) of a set X is the set of all subsets of X. For example, the
powerset of [1, 2] is [[], [1], [2], [1, 2]].

Note that the sets in the powerset do not need to be in any particular order.
*/

/*
This problem seems a bit daunting at first, but the solution makes it a lot
clearer. You start with a base case, the empty set. For every number in the
array, you add that number to the current sets stored up to that point.
For example, at i = 0 I only have an empty set, like so [[]], so for every value
in the powerset, I add a new set + array[i], so [].concat(1).
At i = 1 the powerset looks as follows: [[], [1]], so for every value in the
powerset, we create a new set + array[i], so [].concat(2) and [1].concat(2).

This solution is applicable to any array with distinct numbers.

O(n*2^n) Time | O(n*2^n) Space - where n is the number of elements in the array.
*/
function powerset(array) {
  const powerset = [[]];
  for(let i = 0; i < array.length; i++){
    const powersetLen = powerset.length;
    for(let j = 0; j < powersetLen; j++){
      const newSet = [...powerset[j]].concat(array[i]);
      powerset.push(newSet);
    }
  }
  return powerset;
}