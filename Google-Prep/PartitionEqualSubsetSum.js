/*
Link: https://leetcode.com/problems/partition-equal-subset-sum/

Given a non-empty array nums containing only positive integers, find if the
array can be partitioned into two subsets such that the sum of elements in both
subsets is equal.

Example: 
    Input: nums = [1,5,11,5]
    Output: true
    Explanation: The array can be partitioned as [1, 5, 5] and [11]

knapsackMatrix =

        0  1  2  3  4  5  6  7  8  9  10 11
    [
0      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
1      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
5      [0, 0, 0, 0, 0, 5, 6, 6, 6, 6, 6, 6],
11     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
5      [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 11]
    ]
*/

// O(nc) Time | O(nc) Space - where n is the number of elements in nums and c is
// the total sum of all nums over two.
const canPartition = nums => {
    let totalSum = 0;
    for (const num of nums) {
        totalSum += num;
    }
    if (totalSum % 2 !== 0) return false;
    const capacity = totalSum / 2;
    const knapsackMatrix = initializeMatrix(nums, capacity);

    for (let i = 1; i <= knapsackMatrix.length; i++) {
        const currentVal = nums[i - 1];
        for (let j = 0; j <= capacity; j++) {
            if (currentVal <= j) {
                knapsackMatrix[i][j] = Math.max(knapsackMatrix[i - 1][j], 
                    knapsackMatrix[i - 1][j - currentVal] + currentVal);
            }
        }
    }

    let filledCapacity = false;
    for (let i = 1; i < knapsackMatrix.length; i++) {
        if (knapsackMatrix[i][capacity] === capacity) {
            if(filledCapacity) return true;
            filledCapacity = true;
        }
    }

    return false;
}

const initializeMatrix = (nums, capacity) => {
    const matrix = []
    for (let i = 0; i <= nums.length; i++) {
        const row = new Array(capacity + 1).fill(0);
        matrix.push(row);
    }
    return matrix;
}