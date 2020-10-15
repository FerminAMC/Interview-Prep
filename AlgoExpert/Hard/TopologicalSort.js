/**
 * You're given a list of arbitrary jobs that need to be completed; these jobs
 * are represented as a pair of jobs by distinct integers. You're also given
 * a list of dependencies. A dependency is represented as a pair of jobs where
 * the first job is a prerequisite of the second one. In other words, the
 * second job depends on the first one; it can only be completed once the first
 * job is completed.
 *
 * Write a function that takes in a list of jobs and a list of dependencies and
 * returns a list containing a valid order in which the given jobs can be
 * completed. If no shuch order exists, the function should return an empty
 * array.
 *
 * deps: [[1, 2], [1, 3], [3, 2], [4, 2], [4, 3]]
 * jobs: [1, 2, 3, 4]
 * order: [1, 4, 3, 2] or [4, 1, 3, 2]
 */

/**
 * This version of topological sort only checks for nodes that do not have
 * any parent nodes, in this case represented by the prereqs array. Every one
 * of those nodes is stored in the noPrereqs array and I for me to visit it
 * later on. When I check a node in the noPrereqs array, I then check all of
 * its child nodes, deleting the parent node from their prereqs array, and
 * updating the prereqsNum. This way, the prereqs for a child node start going
 * down until there are no more prereqs, and I can store that node in the
 * noPrereqs array and repeat the cycle. The noPrereqs array will eventually
 * be empty at some point, but that doesn't mean that I added every node to the
 * visited array. If there is a cycle in the graph, the two nodes in the cycle
 * won't ever go into the noPrereqs array and never be added to the visited
 * array.
 * O(j+d) Time | O(j+d) Space - where j is the number of jobs and d is the
 * number of dependencies
 */
function topologicalSort(jobs, deps) {
  const graph = {}
  const noPrereqs = []
  const visited = []
  for (let job of jobs) {
    graph[job] = {dependencies: [], prereqs: [], prereqsNum: 0}
  }
  for (let [job1, job2] of deps) {
    graph[job1].dependencies.push(job2)
    graph[job2].prereqs.push(job1)
    graph[job1].prereqsNum = graph[job1].prereqs.length
    graph[job2].prereqsNum = graph[job2].prereqs.length
  }
  for (let job of jobs) {
    if (graph[job].prereqsNum === 0) noPrereqs.push(job)
  }
  while (noPrereqs.length) {
    let currentJob = noPrereqs.pop()
    visited.push(currentJob)
    for (let dependency of graph[currentJob].dependencies) {
      const indexOfPrereq = graph[dependency].prereqs.indexOf(currentJob)
      graph[dependency].prereqs.splice(indexOfPrereq, 1)
      graph[dependency].prereqsNum--
      if (graph[dependency].prereqsNum === 0) noPrereqs.push(dependency)
    }
    graph[currentJob].dependencies = []
  }

  return visited.length === jobs.length ? visited : []
}
