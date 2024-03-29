/*
There are a total of n courses you have to take labelled from 0 to n - 1.

Some courses may have prerequisites, for example, if prerequisites[i] = [ai, bi]
this means you must take the course bi before the course ai.

Given the total number of courses numCourses and a list of the prerequisite
pairs, return the ordering of courses you should take to finish all courses.

If there are many valid answers, return any of them. If it is impossible to
finish all courses, return an empty array.

Example 1:
    Input: numCourses = 2, prerequisites = [[1,0]]
    Output: [0,1]
    Explanation: There are a total of 2 courses to take. To take course 1 you
    should have finished course 0. So the correct course order is [0,1].

Example 2:
    Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
    Output: [0,2,1,3]
    Explanation: There are a total of 4 courses to take. To take course 3 you
    should have finished both courses 1 and 2. Both courses 1 and 2 should be
    taken after you finished course 0.
    So one correct course order is [0,1,2,3]. Another correct ordering is
    [0,2,1,3].

Example 3:
    Input: numCourses = 1, prerequisites = []
    Output: [0]
*/

const findOrder = (numCourses, prerequisites) => {
    let noPrereqs = [];
    let topSort = [];
    let graph = {};
    for (let i = 0; i < numCourses; i++) {
        graph[i] = {dependencies: [], prereqs: [], prereqsNum: 0};
    }
    for (let course of prerequisites) {
        let prereq = course[1];
        let dependency = course[0];
        graph[prereq].dependencies.push(dependency);
        graph[dependency].prereqs.push(prereq);
        graph[dependency].prereqsNum++;
    }
    for (let i = 0; i < numCourses; i++) {
        if (graph[i].prereqsNum === 0) noPrereqs.push(i);
    }
    while (noPrereqs.length) {
        let course = noPrereqs.shift();
        topSort.push(course);
        for (let dependency of graph[course].dependencies) {
            graph[dependency].prereqsNum--;
            if (graph[dependency].prereqsNum === 0) noPrereqs.push(dependency);
        }
        graph[course].dependencies = [];
    }
    return topSort.length === numCourses ? topSort : [];
}