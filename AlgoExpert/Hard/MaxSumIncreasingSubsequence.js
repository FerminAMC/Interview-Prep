/**
 * Write a function that takes in a non-empty array of integers and returns the
 * greatest sum that can be generated from a strictly-increasing subsequence
 * in the array as well as an array of the numbers in that subsequence.
 *
 * A subsequence of an array is a set of numbers that aren't necessarily
 * adjacent in the array but that are in the same order as they appear in the
 * array. For instance, the numbers [1, 3, 4]form a subsequence of the array
 * [1, 2, 3, 4], and so do the numbers [2, 4]. Note that a single number in an
 * array and the array itself are both valid subsequences of the array.
 *
 * You can assume that there will only be one increasing subsequence with the
 * greatest sum.
 *
 * Input:
 * array = [10, 70, 20, 30, 50, 11, 30]
 * output = [110, [10, 20, 30, 50]]
 */

/**
 * This problem has two problems. The first one is to find the max
 * sum of strictly increasing integers. The second problem is to keep a record
 * of the numbers that form part of that max sum. For each of the problems we
 * have an extra array of size n. The array maxSums, stores the max possible
 * sum at a particular index. The maxSums array for the example input looks as
 * follows:
 * [10, 80, 30, 60, 110, 21, 60]
 * The secon array, sequences of size n, will be filled with null values.
 * Whenever the maxSums array is updated, it means that we have found a possible
 * max sum for a particular index, so every time that happens, we also update
 * sequences[i] with the value of j. That way, at every position we store the
 * previous position in the array that got us that value. The sequences array
 * for the example input looks as follows:
 * [null, 0, 0, 2, 3, 0, 2]
 * With those two arrays we can solve the problem. Knowing that the max sum for
 * the example input is located at position 4 in the maxSums array, we can
 * start backtracking in the sequences array. We start at sequences[4], which
 * points to position 3, we store array[4] in another array and move to
 * sequences[3]. That position of sequences points to 2. We store array in
 * another array and keep repeating the process until we find a null value,
 * meaning that there are no more numbers to look for.
 *
 * O(n^2) Time | O(n) Space - where n is the number of elements in the array.
 */
function maxSumIncreasingSubsequence(array) {
  const maxSums = [...array]
  const sequences = new Array(array.length).fill(null)
  maxSums[0] = array[0]
  let maxIndex = 0
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (array[i] > array[j] && array[i] + maxSums[j] > maxSums[i]) {
        sequences[i] = j
        maxSums[i] = array[i] + maxSums[j]
      }
    }
    if (maxSums[i] >= maxSums[maxIndex]) maxIndex = i
  }
  const sumSequence = gettingSequenceNumbers(array, sequences, maxIndex)
  return [maxSums[maxIndex], sumSequence]
}

function gettingSequenceNumbers(array, sequences, startIdx) {
  const sumSequence = [array[startIdx]]
  let currentIdx = sequences[startIdx]
  while (currentIdx !== null) {
    sumSequence.splice(0, 0, array[currentIdx])
    currentIdx = sequences[currentIdx]
  }
  return sumSequence
}
