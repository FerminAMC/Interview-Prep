/**
 * Write a function that takes in an array of integers an returns the length
 * of the longest peak in the array.
 *
 * A peak is defined as adjacent integers in the array that are strictly
 * increasing until the reach a tip (the highest value in the peak), at
 * which pint they become strictly decreasing. At least three integers are
 * requiredd to form a peak.
 *
 * For example, the integers 1, 4, 10, 2 form a peak, but the integers 4, 0, 10
 * don't and neither do the integers 1, 2, 2, 0.
 * Similarly, the integers 1, 2, 3 don't form a peak because there aren't any
 * strictly decreasing integers after the 3
 *
 * array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
 * result = 6
 */

// First solution. A first approach that tries to keep record of the direction
// that the numbers are going. By not dividing the problem into smaller problems
// the solution can become very complex and even confusing.
// O(n^2) time - O(1) space
function longestPeak(array) {
  let currentPeak = 0
  let maxPeak = 0
  for (let i = 0; i < array.length; i++) {
    currentPeak = findPeak(array, i)
    if (currentPeak > maxPeak) maxPeak = currentPeak
  }
  return maxPeak
}

function findPeak(array, idx) {
  let peak = 1
  let goesUp = false
  let goesDown = false
  for (let i = idx; i < array.length; i++) {
    if (peak === 0 && array[i] > array[i + 1]) return 0
    if (array[i] < array[i + 1]) {
      if (goesDown) break
      goesUp = true
      peak++
    } else if (array[i] > array[i + 1]) {
      goesDown = true
      peak++
    } else if (array[i] === array[i + 1]) break
  }
  return goesUp && goesDown ? peak : 0
}

// Second version. Dividing the problem into smaller sub-problems
// O(n) time - O(n) space
function longestPeak(array) {
  peaks = []
  findPeak(array, peaks)
  let maxPeak = 0
  for (peak of peaks) {
    let currentPeak = 1
    let left = peak
    let right = peak
    while (array[left] > array[left - 1] && left > 0) {
      currentPeak++
      left--
    }
    while (array[right] > array[right + 1] && right < array.length) {
      currentPeak++
      right++
    }
    if (currentPeak > maxPeak) maxPeak = currentPeak
  }
  return maxPeak
}

function findPeak(array, peaks) {
  for (let i = 1; i < array.length - 1; i++) {
    if (array[i] > array[i - 1] && array[i] > array[i + 1]) {
      peaks.push(i)
    }
  }
}

/**
 * To solve this problem, it is easier divide and conquer. Divide the problem
 * into smaller sub-problems and solve those. In the second version, the problem
 * was divided into two by first finding all the peaks, and then getting the
 * length of each of them to find the longest peak. In this third version, I mix
 * the solution to both sub-problems into one. By doing this, the need for extra
 * space is solved. The time complexity of this solution is O(n), because peaks
 * can't overlap by more than one value, and by skipping to the end of each peak
 * we can effectively only look at numbers that can be peaks.
 * O(n) time - O(1) space
 */
function longestPeak(array) {
  let maxPeak = 0
  let i = 1
  while (i < array.length - 1) {
    if (array[i] > array[i - 1] && array[i] > array[i + 1]) {
      let currentPeak = 1
      let left = i
      let right = i
      while (array[left] > array[left - 1] && left > 0) {
        currentPeak++
        left--
      }
      while (array[right] > array[right + 1] && right < array.length) {
        currentPeak++
        right++
      }
      if (currentPeak > maxPeak) maxPeak = currentPeak
      i = right // skips all numbers that cannot be peaks anyways
    }
    i++
  }
  return maxPeak
}
