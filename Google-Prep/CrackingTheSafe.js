/*
There is a box protected by a password. The password is a sequence of n digits
where each digit can be one of the first k digits 0, 1, ..., k-1.

While entering a password, the last n digits entered will automatically be
matched against the correct password.

For example, assuming the correct password is "345", if you type "012345", the
box will open because the correct password matches the suffix of the entered
password.

Return any password of minimum length that is guaranteed to open the box at
some point of entering it.

Example:
    Input: n = 1, k = 2
    Output: "01"
    Note: "10" will be accepted too.
*/

// This problem sucks. If it comes up in an interview, I'm screwed...
let ans;
let seen;
const crackSafe = (n, k) => {
    if (k === 1 && n === 1) return "0";
    seen = new Set();
    ans = "";

    let start = "";
    for (let i = 0; i < n - 1; i++) {
        start += "0";
    }
    dfs(start, k);
    ans += start;
    return ans;
}

const dfs = (node, k) => {
    for (let x = 0; x < k; x++) {
        let aux = node + x.toString();
        if (!seen.has(aux)) {
            seen.add(aux);
            dfs(aux.slice(1), k);
            ans = ans + x.toString();
        }
    }
    return;
}

