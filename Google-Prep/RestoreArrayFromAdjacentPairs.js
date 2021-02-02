/**
 * @param {number[][]} adjacentPairs
 * @return {number[]}
 */
const restoreArray = (adjacentPairs) => {
    const graph = {};
    for (let pair of adjacentPairs) {
        let numOne = pair[0];
        let numTwo = pair[1];
        if (!(numOne in graph)) {
            graph[numOne] = [];
        }
        if (!(numTwo in graph)) {
            graph[numTwo] = [];
        }
        graph[numOne].push(numTwo);
        graph[numTwo].push(numOne);
    }
    let firstNum = 0;
    for (let key of Object.keys(graph)) {
        if (graph[key].length === 1) {
            firstNum = key;
            break;
        }
    }
    console.log(graph);
    let nums = new Set([parseInt(firstNum)]);
    dfs(firstNum, graph, nums);
    return Array.from(nums);
}

const dfs = (num, graph, nums) => {
    for (let key of graph[num]) {
        if (nums.has(key)) continue;
        nums.add(key);
        dfs(key, graph, nums);
    }
    return;
}