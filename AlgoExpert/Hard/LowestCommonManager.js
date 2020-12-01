class OrgChart {
  constructor(name) {
    this.name = name
    this.directReports = []
  }
}

let foundTarget = false

// O(n^2) Time | O(d) Space - where n is the number of nodes in the tree and d
// is the depth of the target node.
function getLowestCommonManager(topManager, reportOne, reportTwo) {
  const arrayOne = []
  const arrayTwo = []
  foundTarget = false
  getDepth(topManager, reportOne, arrayOne)
  foundTarget = false
  getDepth(topManager, reportTwo, arrayTwo)
  //console.log(arrayOne, arrayTwo)
  return compareArrays(arrayOne, arrayTwo)
}

const compareArrays = (aOne, aTwo) => {
  for (const nodeOne of aOne) {
    for (const nodeTwo of aTwo) {
      if (nodeOne.name === nodeTwo.name) return nodeOne
    }
  }
  return null
}

function getDepth(root, target, parents) {
  // lookup succeeds
  if (root.name === target.name) {
    foundTarget = true
    parents.push(root)
    return
  }
  for (const node of root.directReports) {
    getDepth(node, target, parents)
    if (foundTarget) break
  }
  if (foundTarget) {
    parents.push(root)
  }
}

// Do not edit the line below.
exports.getLowestCommonManager = getLowestCommonManager
