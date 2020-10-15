/**
 * You are given an array nums of non-negative integers. nums is considered
 * special if there exists a number x such that there are exactly x numbers in
 * nums that are greater than or equal to x.
 *
 * Notice that x does not have to be an element in nums.
 *
 * Return x if the array is special, otherwise, return -1. It can be proven that
 * if nums is special, the value for x is unique.
 */

function specialArray(nums) {
  let specialNum = nums.length
  if (specialNum === 0) return 0
  for (let i = nums.length; i >= 0; i--) {
    let counter = i
    for (let j = 0; j < nums.length; j++) {
      if (specialNum <= nums[j]) {
        counter--
      }
    }
    if (counter === 0) return specialNum
    else specialNum--
  }

  return specialNum
}
