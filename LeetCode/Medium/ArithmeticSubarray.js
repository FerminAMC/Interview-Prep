/*
Link: https://leetcode.com/problems/arithmetic-subarrays/
A sequence of numbers is called arithmetic if it consists of at least two
elements, and the difference between every two consecutive elements is the same.
More formally, a sequence s is arithmetic if and only if 
s[i + 1] - s[i] == s[1] - s[0] for all valid i.

You are given an array of n integers, nums, and twwo arrays of m integers each,
l and r, representing the m range queries, where the ith query is the range
[l[i], r[i]]. All the arrays are 0-indexed.

Return a list of boolean elements answer, where answer[i] is true if the
subarray nums[l[i]], nums[l[i+1]], ..., nums[r[i]] can be rearranged from an
arithmetic sequence, and false otherwise.

What I noticed is that an arithmetic sequence must be in sorted order, either
ascending or descending, there is no difference. If I sort the array from the
beginning, the l[i] and r[i] indexes lose all meaning, so I have to first get a
slice of the array from l[i] to r[i] inclusive and then sort that subarray.
After that has been done, checking if the subarray is arithmetic or not is
pretty straight forward with the rule given at the start of the problem.
*/
function checkArithmeticSubarrays(nums, l, r) {
  const result = []
  for (let i = 0; i < l.length; i++) {
    const start = l[i]
    const end = r[i]
    const tempNums = nums.slice(start, end + 1)
    tempNums.sort((a, b) => a - b)
    const diff = tempNums[1] - tempNums[0]
    let isArithmetic = true
    for (let j = 1; j < tempNums.length; j++) {
      if (tempNums[j] - tempNums[j - 1] !== diff) {
        console.log(j)
        isArithmetic = false
      }
    }
    result.push(isArithmetic)
    console.log(start, end, diff, tempNums)
  }
  return result
}
