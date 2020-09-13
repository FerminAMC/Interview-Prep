/**
 * Given anarray of integers, nums, and an interger target, return the indices
 * of the two numbers such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may
 * not use the same element twice.
 *
 * You can return the answer in any order.
 *
 * nums = [3, 2, 4]
 * target = 6
 * result = [1, 2]
 */

/**
 * This is very similar to Two Number Sum in the Easy folder. The only
 * difference is that you have to return the position of the numbers, instead
 * of the numbers themselves. This means we can't sort the nums array, but we
 * can create a map of it, using the number in nums[i] as the key, and i as the
 * value for that key.
 */
function twoSum(nums, target) {
  const numsMap = new Map()
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (numsMap.has(complement)) {
      return [i, numsMap.get(complement)]
    }
    numsMap.set(nums[i], i)
  }
}
