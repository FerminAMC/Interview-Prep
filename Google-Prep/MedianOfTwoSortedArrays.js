/*
Problem: Given two sorted arrays nums1 and nums2 of size m and n respectively,
return the median of the two sorted arrays.

Follow up: The overall run time complexity should be O(log (m+n)).

Input:
    Two arrays, nums1 and nums2
Output:
    number
Example:
    nums1 = [1,2,3,45,73,99,105]
    nums2 = [4,6,22,31,45,90]
    result = 31

Approach:
    Merge both arrays into a single one. That should take O(n+m) since both of
    them are already sorted.
    After they've been merged, just do a simple calculation of the median. That
    should take O(1) Time.
*/

const findMedianSortedArrays = (nums1, nums2) => {
    merge = mergeArrays(nums1, nums2);
    return findMedian(merge, merge.length);
}

const mergeArrays = (array1, array2) => {
    let i = 0;
    let j = 0;
    let ans = [];
    while(i < array1.length && j < array2.length) {
        if (array1[i] < array2[j]) {
            ans.push(array1[i]);
            i++;
        }else {
            ans.push(array2[j])
            j++;
        }
    }
    while (i < array1.length) {
        ans.push(array1[i]);
        i++;
    }
    while(j < array2.length) {
        ans.push(array2[j]);
        j++;
    }
return ans;
}

const findMedian = (array, len) => {
    const mid = Math.floor(len / 2);
    if (len % 2 != 0) {
        return array[mid];
    }
    return (array[mid] + array[mid-1]) / 2;
}

// -------------------------------------------------------------------------
// Efficient version. Wouldn't be able to come up with this during a real
// interview...
// O(log(min(n, m))) Time | O(1) Space - where n and m are the sizes of the 
// arrays.
// Solution: https://www.youtube.com/watch?v=q6IEA26hvXc&feature=emb_logo
const findMedianSortedArrays = (nums1, nums2) => {
    const total = nums1.length + nums2.length;
    const half = Math.floor(total / 2);
    let A = nums1.length < nums2.length ? nums1 : nums2;
    let B = nums1.length >= nums2.length ? nums1 : nums2;

    let left = 0;
    let right = A.length - 1;
    while (true) {
        i = Math.floor((left + right) / 2);
        j = half - i - 2;

        Aleft = i < 0 ? -Infinity : A[i];
        Aright = i + 1 < A.length ? A[i + 1] : Infinity;
        Bleft = j < 0 ? -Infinity : B[j];
        Bright = j + 1 < B.length ? B[j + 1] : Infinity;

        if (Aleft <= Bright && Bleft <= Aright) {
            if (total % 2 !== 0) {
                return Math.min(Aright, Bright);
            } else {
                let ans = (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
                return ans;
            }
        } else if (Aleft > Bright) {
            right = i - 1;
        } else {
            left = i + 1;
        }
    }
}
