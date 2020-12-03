/*
Link: https://leetcode.com/problems/max-number-of-k-sum-pairs/
You are given an integer array nums and an integer k.

In one operation, you can pick two numbers from the array whose sum equals k and
remove them from the array.

Return the maximum number of operations you can perform on the array.
*/

const maxOperations = (nums, k) => {
  let result = 0
  nums.sort((a, b) => a - b)

  while (nums.length >= 2) {
    const currentNum = nums[0]
    const currentTarget = k - currentNum
    nums.splice(0, 1)
    if (binarySearch(nums, currentTarget)) {
      result++
    }
  }

  return result
}

const binarySearch = (nums, target) => {
  let left = 0
  let right = nums.length - 1
  let mid = Math.floor((left + right) / 2)
  let foundTarget = false
  while (left <= right) {
    const currentNum = nums[mid]
    if (currentNum === target) {
      foundTarget = true
      nums.splice(mid, 1)
      break
    } else if (currentNum > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
    mid = Math.floor((left + right) / 2)
  }
  return foundTarget
}
