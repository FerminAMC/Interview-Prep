/*
Given a set of points in the xy-plane, determine the minimum area of a rectangle
formed from these points, with sides parallel to the x and y axes.

If there isn't any rectangle, return 0.

Example 1:
    Input: [[1,1],[1,3],[3,1],[3,3],[2,2]]
    Output: 4

Example 2:
    Input: [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]
    Output: 2
*/

const minAreaRect = (points) => {
    if (points.length < 4) return 0;
    let min = Infinity;
    let cache = new Set();
    // By sorting we don't have to look at previous points.
    points.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        } else {
            return a[0] - b[0];
        }
    });
    dfs(0, null, 0, 0);
    return min === Infinity ? 0 : min;

    function dfs(level, prev, height, width) {
        if (level === 4) {
            console.log('level', level, 'prev', prev, 'height', height, 'width', width);
            min = Math.min(min, height * width);
            return;
        }

        let key = '';
        if (prev !== null) {
            key = prev[0].toString() + prev[1].toString() + level.toString() + height.toString() + width.toString();
            if (cache.has(key)) {
                return;
            }
        }

        for (let i = level; i < points.length; i++) {
            let point = points[i];
            // level 0: choosing first point indistinctively
            if (level === 0) {
                dfs(level + 1, point, height, width);
            } 
            // level 1: looking for top-left point
            else if (level === 1 && point[0] === prev[0] && point[1] > prev[1]) {
                dfs(level + 1, point, point[1] - prev[1], width);
            }
            // level 2: looking for bottom-right point
            else if (level === 2 && point[0] > prev[0] && point[1] === 
                prev[1] - height) {
                    dfs(level + 1, point, height, point[0] - prev[0]);
            } 
            // level 3: looking for top-right point
            else if (level === 3 && point[0] === prev[0] && point[1] === 
                prev[1] + height){
                    dfs(level + 1, point, height, width);
            }
        }
        cache.add(key);
        return;
    }
}