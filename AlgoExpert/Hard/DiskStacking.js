/*
You're given a non-empty array of arrays where each subarray holds three
integers and represents a disk. These integers denote each disk's width, depth,
and height, respectively. Your goal is to stack up the disks and to maximize the
total height of the stack. A disk must have a strictly smaller width, depth, and
height than any other disks below it.

Write a function that returns an array of the disks in the final stack, starting
with the top disk and ending with the bottom disk. Note that you can't rotate
disks; in other words, the integers in each subarray must represent
[width, depth, height] at all times.

You can assume that there will only be one stack with the greatest total height.
*/

/*
disks = [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]]

widthSorted = [1, 3, 1], [2, 1, 2], [2, 2, 8], [2, 3, 4], [3, 2, 3], [4, 4, 5]
depthSorted = [2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]
heightSorted= [1, 3, 1], [2, 1, 2], [3, 2, 3], [2, 3, 4], [4, 4, 5], [2, 2, 8]
*/

/*
The solution to this problem is very similar to other dynamic programming 
problems. I store the maximum possible height in a position of the array. I then
use that local max to get the max of the following position of the array, i + 1.
This ensures that only the max possible stack of disks is created. There is a
lot of noise in the array, so we might stack two disks that prevent us from 
getting the highest stack possible.
The heights array stores the max height at a given index and the position of the
previous disk that needs to be stacked to get that height. Like a trail of 
breadcrums. In the makeStack function we follow that trail to create the max
height stack.

O(n^2) Time | O(n) Space - where n is the number of disks in the array.
*/
function diskStacking(disks){
  disks.sort((a, b) => a[2] - b[2]);
  const heights = new Array(disks.length);
  heights[0] = [disks[0][2], null];
  const max = [disks[0][2], 0];
  for(let i = 1; i < disks.length; i++){
    const currHeight = [disks[i][2], null];
    let localMax = currHeight[0];
    for(let j = 0; j < i; j++){
      if(isStackable(disks[j], disks[i])){
        if(currHeight[0] + heights[j][0] > localMax){
          localMax = currHeight[0] + heights[j][0];
          currHeight[1] = j;
        }
      }
    }
    currHeight[0] = localMax;
    heights[i] = currHeight;
    if(localMax > max[0]){
      max[0] = localMax;
      max[1] = i;
    }
  }
  return makeStack(max[1], disks, heights);
}

// O(1) Time | O(1) Space
function isStackable(disk1, disk2){
  if(disk1[0] < disk2[0] && disk1[1] < disk2[1] && disk1[2] < disk2[2]){
    return true;
  }
  return false
}

// O(n) Time | O(n) Space - where n is the number of disks in the array.
function makeStack(idx, disks, heights){
  const stack = [disks[idx]];
  idx = heights[idx][1];
  while(idx !== null){
    stack.unshift(disks[idx]);
    idx = heights[idx][1];
  }
  return stack;
}