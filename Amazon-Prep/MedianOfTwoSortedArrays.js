/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
    let i = 0;
    let j = 0;
    let k = 0;
    let auxArray = new Array(nums1.length + nums2.length).fill(0);
    if (auxArray.length == 0) return 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] < nums2[j]) {
            auxArray[k] = nums1[i];
            i++;
        } else {
            auxArray[k] = nums2[j];
            j++;
        }
        k++;
    }
    if (i < nums1.length) {
        while (i < nums1.length) {
            auxArray[k] = nums1[i];
            i++;
            k++;
        }
    } else if (j < nums2.length) {
        while (j < nums2.length) {
            auxArray[k] = nums2[j];
            j++;
            k++;
        }
    }

    let result = 0;
    if (auxArray.length % 2 == 0) {
        let mid1 = auxArray.length / 2;
        let mid2 = mid1 - 1;
        result = (auxArray[mid1] + auxArray[mid2]) / 2;
    } else {
        let mid = Math.floor(auxArray.length / 2);
        result = auxArray[mid];
    }

    return result;
};