/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
const minSwap = function(A, B) {
    let natural1 = 0;
    let swap1 = 1;
    for (let i = 1; i < A.length; i++) {
        let natural2 = Infinity;
        let swap2 = Infinity;
        
        if (A[i - 1] < A[i] && B[i - 1] < B[i]) {
            natural2 = Math.min(natural2, natural1);
            swap2 = Math.min(swap2, swap1 + 1);
        }
        if (A[i - 1] < B[i] && B[i - 1] < A[i]) {
            natural2 = Math.min(natural2, swap1);
            swap2 = Math.min(swap2, natural1 + 1);
        }
        
        natural1 = natural2;
        swap1 = swap2;
    }
    return Math.min(natural1, swap1);
};