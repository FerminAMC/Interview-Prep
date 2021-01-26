/*
There is a hidden integer array arr that consists of n non-negative integers.

It was encoded into another integer array encoded of length n - 1, such that
encoded[i] = arr[i] XOR arr[i + 1]. For example, if arr = [1,0,2,1], then
encoded = [1,2,3].

You are given the encoded array. You are also given an integer first, that is
the first element of arr, i.e. arr[0].

Return the original array arr. It can be proved that the answer exists and is
unique.

// Watch explanation:
https://www.youtube.com/watch?v=I5-uDlbwbOA&feature=emb_logo
*/

const decode = encoded => {
    let decoded = new Array(encoded.length + 1);
    let totalDecoded = 0;
    let n = encoded.length + 1;
    for (let i = 1; i <= n; i++) totalDecoded ^= i;
    let encodedX = 0;
    for (let i = 1; i < encoded.length; i += 2) {
        encodedX ^= encoded[i];
    } 
    let first = totalDecoded ^ encodedX;
    decoded[0] = first;
    for (let i = 0; i < encoded.length; i++) {
        decoded[i + 1] = encoded[i] ^ decoded[i];
    }
    return decoded;
}