/*
Find the kth largest element in an unsorted array. Note that it is the kth
largest element in the sorted order, not the kth distinct element.

Note: You may assume k is always valid.
*/

// O(nk) Time | O(k) Space 
const findKthLargest = (nums, k) => {
    let kNums = [];
    for (let num of nums) {
        if (kNums.length === 0) {
            kNums.push(num);
        } else {
            insertNum(kNums, num);
        }
        if (kNums.length > k) kNums.shift();
    }
    return kNums[0];
}

const insertNum = (array, num) => {
    let i = 0;
    for (; i < array.length; i++) {
        if (num <= array[i]) break;
    }
    array.splice(i, 0, num);
}
