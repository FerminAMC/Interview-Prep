
const canEat = (candiesCount, queries) => {
    let n = candiesCount.length;
    let candySum = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        candySum[i] = candySum[i - 1] + candiesCount[i - 1];
    }
    const ans = [];
    for (let query of queries) {
        let day = query[1] + 1;
        let i = query[0];
        if (candySum[i+1] >= day && candySum[i] + 1 <= (day * query[2])) {
            ans.push(true);
        } else {
            ans.push(false);
        }
    }
    return ans;
}