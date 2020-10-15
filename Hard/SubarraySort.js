/*
Write a function that takes in an array of at least two integers and that
returns an array of the starting and ending indices of the smallest subarray in
the input array that needs to be sorted in place in order for the entire input
array to be sorted (in ascending order).

If the input array is already sorted, the function should return [-1, -1].

Sample input: 
array = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]
result = [3, 9]
*/

/*
In order to get both limits for the result I do one pass through the array from
both sides. 
From left to right I check that every current number is higher than
the previous one. Always updating the currentMax and comparing it to the current
position. If the currentMax is higher than the current position it means that
the current position is out of order, so the right boudary of the result is 
updated.
From right to left I check that every current number is lower than the previous
one, copying the process from left to right.

O(n) Time | O(1) Space - where n is the number of elements in the array.
*/
function subarraySort(array) {
  let currentMax = array[0];
  let currentMin = array[array.length - 1];
  const result = [-1, -1];
  for(let i = 1, j = array.length - 2; i < array.length && j >= 0; i++, j--) {
    currentMax = Math.max(array[i], currentMax);
    currentMin = Math.min(array[j], currentMin);
    if(array[i] < currentMax){
      result[1] = i;
    }
    if(array[j] > currentMin){
      result[0] = j;
    }
  }
  return result;
}