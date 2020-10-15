/**
 * A kingdom consists of a king, his children, his grandchildren, and so on.
 * Every once in a while, someone in the family dies or a child is born.
 *
 * The kingdom has a well-defined order of inheritance that consists of the
 * king as the first member.
 *
 * Implement the ThroneInheritance class:
 *    -ThroneInheritance(string kingName) Initializes an object of the
 *     ThroneInheritance class. The name of the king is given as part of the
 *     constructor.
 *    -birth(string parentName, string childName) Indicates that parentName
 *     gave birth to childName.
 *    -death(string name) Indicates the death of name. The death of the person
 *     doesn't affect the Successor function nor the current inheritance order.
 *     You can treat it as just marking the person as dead.
 *    -getInheritanceOrder() Returns a list representing the current order of
 *     inheritance excluding dead people.
 *
 * Input:
 * ["ThroneInheritance", "birth", "birth", "birth", "birth", "birth", "birth",
 * "getInheritanceOrder", "death", "getInheritanceOrder"]
 *
 * [["king"], ["king", "andy"], ["king", "bob"], ["king", "catherine"],
 * ["andy", "matthew"], ["bob", "alex"], ["bob", "asha"], [null], ["bob"],
 * [null]]
 *
 * Output:
 * [null, null, null, null, null, null, null, ["king", "andy", "matthew", "bob",
 * "alex", "asha", "catherine"], null, ["king", "andy", "matthew", "alex",
 * "asha", "catherine"]]
 *
 * Explanation:
 * ThroneInheritance t= new ThroneInheritance("king"); // order: king
 * t.birth("king", "andy"); // order: king > andy
 * t.birth("king", "bob"); // order: king > andy > bob
 * t.birth("king", "catherine"); // order: king > andy > bob > catherine
 * t.birth("andy", "matthew"); // order: king > andy > matthew > bob > catherine
 * t.birth("bob", "alex"); // order: king > andy > matthew > bob > alex >
 *   catherine
 * t.birth("bob", "asha"); // order: king > andy > matthew > bob > alex > asha >
 *   catherine
 * t.getInheritanceOrder(); // return ["king", "andy", "matthew", "bob", "alex",
 *   "asha", "catherine"]
 * t.death("bob"); // order: king > andy > matthew > bob > alex > asha >
 *   catherine
 * t.getInheritanceOrder(); // return ["king", "andy", "matthew", "alex",
 *   "asha", "catherine"]
 */

/**
 * @param {string} kingName
 */
var ThroneInheritance = function (kingName) {
  this.kingName = kingName
  this.tree = {}
  this.tree[kingName] = []
  this.deceasedMap = new Map()
}

/**
 * @param {string} parentName
 * @param {string} childName
 * @return {void}
 */
ThroneInheritance.prototype.birth = function (parentName, childName) {
  if (this.tree[parentName] === undefined) {
    this.tree[parentName] = [childName]
    this.tree[childName] = []
  } else {
    this.tree[parentName].push(childName)
    this.tree[childName] = []
  }
}

/**
 * @param {string} name
 * @return {void}
 */
ThroneInheritance.prototype.death = function (name) {
  this.deceasedMap.set(name)
}

/**
 * @return {string[]}
 */
ThroneInheritance.prototype.getInheritanceOrder = function () {
  const familyTree = []
  dfs(this.kingName, this.tree, familyTree, this.deceasedMap)
  return familyTree
}

function dfs(currentNode, tree, familyTree, deceasedMap) {
  if (!deceasedMap.has(currentNode)) familyTree.push(currentNode)
  if (tree[currentNode].length === 0) return
  for (let child of tree[currentNode]) {
    dfs(child, tree, familyTree, deceasedMap)
  }
  return
}

/**
 * Your ThroneInheritance object will be instantiated and called as such:
 * var obj = new ThroneInheritance(kingName)
 * obj.birth(parentName,childName)
 * obj.death(name)
 * var param_3 = obj.getInheritanceOrder()
 */
