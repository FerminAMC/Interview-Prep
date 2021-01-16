/*
Implement next permutation, which rearranges numbers into the lexicographically
next greater permutation of numbers.

If such an arrangement is not possible, it must rearrange it as the lowest
possible order (i.e., sorted in ascending order).

The replacement must be in place and use only constant extra memory.
*/

// O(n) Time | O(1) Space - where n is the number of numbers in nums.
const nextPermutation = nums => {
    let swapped = false;
    let firstDecreasingIdx = 0;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            firstDecreasingIdx = i;
            swapped = true;
            break;
        }
    }
    if(swapped) {
        let firstDecreasingNum = nums[firstDecreasingIdx];
        let swapIdx = firstDecreasingIdx + 1;
        for (let i = firstDecreasingIdx + 1; i < nums.length; i++) {
            if (firstDecreasingNum < nums[i]) {
                swapIdx = i;
            } else break;
        }
        nums[firstDecreasingIdx] = nums[swapIdx];
        nums[swapIdx] = firstDecreasingNum;
        reverseArr(nums, firstDecreasingIdx + 1, nums.length - 1);
    }

    if (!swapped) nums = nums.reverse();
    return nums;
}

const reverseArr = (nums, start, end) => {
    while (start < end) {
        let aux = nums[start];
        nums[start] = nums[end];
        nums[end] = aux;
        start++;
        end--;
    }
}