/*
Given a file and assume that you can only read the file using a given method
read4, implement a method read to read n characters. Your method read may be
called multiple times.


Method read4:

The API read4 reads 4 consecutive characters from the file, then writes those
characters into the buffer array buf4.

The return value is the number of actual characters read.

Note that read4() has its own file pointer, much like FILE *fp in C.

Definition of read4:

    Parameter:  char[] buf4
    Returns:    int

Note: buf4[] is destination not source, the results from read4 will be copied
to buf4[]

*/

/**
 * Definition for read4()
 * 
 * @param {character[]} buf Destination buffer
 * @return {number} The number of characters read
 * read4 = function(buf4) {
 *     ...
 * };
 */

/**
 * @param {function} read4()
 * @return {function}
 */
const solution = read4 => {
    let readLetters = 0;
    let cache = [];
    /**
     * @param {character[]} buf Destination buffer
     * @param {number} n Number of characters to read
     * @return {number} The number of actual characters read
     */
    return function(buf, n) {
        let ans = "";
        if (readLetters === 0) {
            read4(cache);
            readLetters = cache.length;
        }
        while (readLetters > 0 && ans.length < n) {
            ans += cache.shift();
            readLetters--
            if (cache.length === 0) {
                read4(cache);
                readLetters = cache.length;
            }
        }
        buf.push(ans);
        return ans.length;
    };
};