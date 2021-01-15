/*
You are given an integer array A. From some starting index, you can make a
series of jumps. The (1st, 3rd, 5th, ...) jumps in the series are called
odd-numbered jumps, and the (2nd, 4th, 6th, ...) jumps in the series are called
even-numbered jumps. Note that the jumps are numbered, not the indices.

You may jump forward from index i to index j (with i < j) in the following way:

    During odd-numbered jumps (i.e., jumps 1, 3, 5, ...), you jump to the index
        j such that A[i] <= A[j] and A[j] is the smallest possible value. If
        there are multiple such indices j, you can only jump to the smallest
        such index j.
    During even-numbered jumps (i.e., jumps 2, 4, 6, ...), you jump to the index
        j such that A[i] >= A[j] and A[j] is the largest possible value. If
        there are multiple such indices j, you can only jump to the smallest
        such index j.
    It may be the case that for some index i, there are no legal jumps.

A starting index is good if, starting from that index, you can reach the end of
the array (index A.length - 1) by jumping some number of times (possibly 0 or
more than once).

Return the number of good starting indices.
*/

const DEBUG = false;
/**
 * @param {number[]} A
 * @return {number}
 */
// O(n²) Time | O(n) Space - where n is the number of elements in the array A
const oddEvenJumps = A => {
    let answer = 0;
    for (let i = 0; i < A.length; i++) {
        if(DEBUG) console.log(i, '-----------------------');
        const reachedEnd = canReachEnd(A, i, false);
        if (reachedEnd) answer++;
    }
    return answer;
}

const canReachEnd = (A, idx, isEvenJump) => {
    if (idx === A.length - 1) return true;
    let possibleJump = 0;
    if (isEvenJump) {
        possibleJump = getEvenJump(A, idx);
    } else {
        possibleJump = getOddJump(A, idx);
    }
    if (DEBUG) console.log(possibleJump);
    let reachedEnd = false;
    if (possibleJump !== 0) {
        reachedEnd = canReachEnd(A, possibleJump, !isEvenJump);
    }
    
    return reachedEnd;
}

const getEvenJump = (A, idx) => {
    let jump = 0;
    for (let i = idx + 1; i < A.length; i++) {
        if (A[i] <= A[idx]) {
            if (jump !== 0) {
                if (A[i] > A[jump]) jump = i;
            } else {
                jump = i;
            }
        }
    }
    return jump;
}

const getOddJump = (A, idx) => {
    let jump = 0;
    for (let i = idx + 1; i < A.length; i++) {
        if (A[i] >= A[idx]) {
            if (jump !== 0) {
                if (A[i] < A[jump]) jump = i;
            } else {
                jump = i;
            }
        }
    }
    return jump;
}