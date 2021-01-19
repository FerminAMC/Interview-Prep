/*
There are N workers.  The i-th worker has a quality[i] and a minimum wage
expectation wage[i].

Now we want to hire exactly K workers to form a paid group. When hiring a
group of K workers, we must pay them according to the following rules:

    * Every worker in the paid group should be paid in the ratio of their
        quality compared to other workers in the paid group.
    * Every worker in the paid group must be paid at least their minimum wage
        expectation.

Return the least amount of money needed to form a paid group satisfying the
above conditions.

Example: 
    Input: quality = [10,20,5], wage = [70,50,30], K = 2
    Output: 105.00000
    Explanation: We pay 70 to 0-th worker and 35 to 2-th worker.
*/

/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} K
 * @return {number}
 */
// O(n²log(n)) Timme | O(n) Space - where n is the number of applicants.
const mincostToHireWorkers = (quality, wage, K) => {
    let totalCost = 0;
    let minCost = Infinity;
    for (let i = 0; i < wage.length; i++) {
        let hires = [];
        let dollarsPerHr = wage[i] / quality[i];
        totalCost = wage[i];
        for (let j = 0; j < wage.length; j++) {
            if (j === i) continue;
            let possibleSalary = dollarsPerHr * quality[j];
            if (possibleSalary >= wage[j]){
                hires.push(possibleSalary);
            }
        }
        if (hires.length >= K - 1) {
            hires.sort((a, b) => a - b);
            for (let j = 0; j < K - 1; j++) {
                totalCost += hires[j];
            }
            minCost = Math.min(minCost, totalCost);
        }
    }    
    return minCost;
}