/*
Given two non-negative integers num1 and num2 represented as strings, return the
product of num1 and num2, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to
integer directly.
*/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const multiply = (num1, num2) => {
    if (num1 === '0' || num2 === '0') return '0';

    const DEBUG = false;
    let level = 1;
    let total = 0;
    for(let i = num1.length - 1; i >= 0; i--) {
        // num1 will be the bottom part of the multiplication
        let num1Dec = num1.charCodeAt(i) - 48;
        let localTotal = 0;
        let carryOver = 0;
        let column = 1;
        for (let j = num2.length - 1; j >= 0; j--) {
            // num2 will be the top part of the multiplication
            let num2Dec = num2.charCodeAt(j) - 48;
            let currentMultiplication = num1Dec * num2Dec + carryOver;
            carryOver = 0;
            if(DEBUG){
                console.log('num2:', num2Dec);
                console.log('num1:', num1Dec);
                console.log('currentMultiplication:', currentMultiplication);
            }

            if (currentMultiplication >= 10 && j !== 0) {
                localTotal += (currentMultiplication % 10) * column;
                carryOver = Math.floor(currentMultiplication / 10);
            } else {
                localTotal += currentMultiplication * column;
            }

            if (DEBUG) {
                console.log('localTotal:', localTotal);
                console.log('carryOver:', carryOver);
                console.log('+++++++++++++++');
            }

            column *= 10;
        }

        if (DEBUG) {
            console.log('localTotal:', localTotal);
            console.log('-----------------------');
        }
    
        total += localTotal * level;
        level *= 10;
    }
    return total.toString();
}