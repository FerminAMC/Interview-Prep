/* 
Link: https://leetcode.com/problems/single-element-in-a-sorted-array/
You're given a sorted array consisting of only integers where every element
appears exactly twice, except for one element which appears exactly once. Find
the single element that appears only once.

Follow up: Your solution should run in O(log(n)) Time and O(1) Space
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
// O(n) Time | O(1) Space
const singleNonDuplicate = (nums) => {
  for (let i = 1; i < nums.length; i += 2) {
    const curr = nums[i]
    if (nums[i - 1] === curr && nums[i + 1] !== curr) {
      continue
    } else return nums[i - 1]
  }
  return nums[nums.length - 1]
}

// O(log(n)) Time | O(1) Space
// Since the follow up problem asks us to achieve O(log(n)) Time and O(1) Space,
// the solution that comes to mind is to use binary search.
const singleNonDuplicate = (nums) => {
  let left = 0
  let right = nums.length - 1
  let mid = Math.floor((right + left) / 2)
  while (left <= right) {
    if (nums[mid] === nums[mid - 1]) {
      const leftSize = mid - 1
      const rightSize = right - mid
      if (leftSize % 2 === 0) {
        left = mid + 1
      } else {
        right = mid - 2
      }
    } else if (nums[mid] === nums[mid + 1]) {
      const leftSize = mid
      const rightSize = right - mid - 1
      if (leftSize % 2 === 0) {
        left = mid + 2
      } else {
        right = mid - 1
      }
    } else return nums[mid]

    mid = Math.floor((right + left) / 2)
  }
}
