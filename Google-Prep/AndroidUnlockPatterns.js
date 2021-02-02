/*
Android devices have a special lock screen with a 3 x 3 grid of dots. Users can
set an "unlock pattern" by connecting the dots in a specific sequence, forming
a series of joined line segments where each segment's endpoints are two
consecutive dots in the sequence. A sequence of k dots is a valid unlock
pattern if both of the following are true:

    All the dots in the sequence are distinct.
    If the line segment connecting two consecutive dots in the sequence passes
       through any other dot, the other dot must have previously appeared in the
       sequence. No jumps through non-selected dots are allowed.

    0   1   2   
    3   4   5   
    6   7   8   
*/

let used = new Array(9).fill(false);

const numberOfPatterns = (m, n) => {
    let res = 0;
    for (let len = m; len <= n; len++) {
        res += calcPatterns(-1, len);
        for (let i = 0; i < 9; i++) {	                
            used[i] = false;
        }
    }
    return res
}

const isValid = (index, last) => {
    if (used[index])
        return false;
    // first digit of the pattern    
    if (last == -1)
        return true;
    // knight moves or adjacent cells (in a row or in a column)	       
    if ((index + last) % 2 == 1)
        return true;
    // indexes are at both end of the diagonals    
    let mid = (index + last)/2;
    if (mid == 4)
        return used[mid];
    // adjacent cells on diagonal
    if ((index%3 != last%3) && (index/3 != last/3)) {
        return true;
    }
    // all other cells which are not adjacent
    return used[mid];
}

const calcPatterns = (last, len) => {
    if (len == 0)
        return 1;    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        if (isValid(i, last)) {
            used[i] = true;
            sum += calcPatterns(i, len - 1);
            used[i] = false;                    
        }
    }
    return sum;
}

