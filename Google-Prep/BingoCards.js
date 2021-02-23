/**
 * @param {number} n
 * @return {number[][]}
 */
const makeBingoCards = function(n) {
    let set = new Set();
    let visited = new Array(15).fill(false);
    dfs([]);
    return [];

    // O(n!) Time | O(n!) Space
    function dfs(sequence) {
        if (sequence.length == 5) {
            set.add([...sequence]);
            return;
        }
        for (let i = 0; i < 15; i++) {
            if (visited[i%15]) {
                continue;
            }
            visited[i%15] = true;
            sequence.push(i);
            dfs(sequence);
            sequence.pop();
            visited[i%15] = false;
        }

        return;
    }
}