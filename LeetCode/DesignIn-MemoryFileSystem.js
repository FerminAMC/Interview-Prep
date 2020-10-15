/**
 * Design an in-memory file sytem to simulate the following functions:
 *
 * ls: Given a path in string format, if its a file path, return a list that
 * only contains this file's name. If it is a directory path, return a list
 * the list of file and directory names in this directory. Your output (file
 * and drectry names together) shold be in lexicographical order.
 *
 * mkdir: Given a directory path that does not exist, you should make a new
 * directory according to the path. If the middle directories in the path
 * don't exist either, you should create them as well. This function has a
 * void return type.
 *
 * addContentToFile: Given a file path and file content in string format, if
 * the file doesn't exist, you need to create that file containing the given
 * content. This function has void return type.
 *
 * readContentFromFile: Given a file path, return its content in string format.
 *
 * Note:
 * 1. You can assume all file or directory paths are absolute paths which begin
 * with / and do not end with / except that the path is just "/"
 * 2. You can assme that all operations will be passed valid parameters and
 * users will not attempt to retrieve file content or list a directory or
 * file that doesn't exist.
 * 3. You can assume that all directory names and file names only contain
 * lower-case letters, and same names won't exist in the same directory.
 */

/**
 * This File System uses a tree structure. I was thinking of a JSON at first,
 * but that is basically a tree. The File System starts with a head node that
 * will store in its children all files and directories. One way this can be
 * improved is by creating an insertion function that uses binary sort. This
 * would make the time complexity of the mkdir function go down, but in the
 * interest of time I decided not to implement this and just use the sort
 * function in Javascript. In a real interview I doubt I would have the time to
 * create that function anyways.
 */
class Node {
  constructor(value, type) {
    this.name = value // File or directory name
    this.type = type // 'File' or 'Directory'
    this.children = this.type === 'File' ? '' : []
  }
}

var FileSystem = function () {
  this.head = new Node('/', 'Directory')
}

/**
 * @param {string} path
 * @return {string[]}
 */
FileSystem.prototype.ls = function (path) {
  const splitPath = path === '/' ? [] : path.split('/')
  splitPath.shift() // Removes empty string at the start of array
  const result = []
  let currentNode = this.head
  for (let dir of splitPath) {
    for (let child of currentNode.children) {
      if (dir === child.name) {
        currentNode = child
        break
      }
    }
  }
  if (currentNode.type === 'File') {
    result.push(currentNode.name)
  } else {
    for (let child of currentNode.children) {
      result.push(child.name)
    }
  }
  return result.sort()
}

/**
 * @param {string} path
 * @return {void}
 */
FileSystem.prototype.mkdir = function (path) {
  const splitPath = path.split('/')
  splitPath.shift() // Removes empty string at the start of array
  let currentNode = this.head
  for (let dir of splitPath) {
    let foundDir = false
    let prevNode = currentNode
    for (let child of currentNode.children) {
      if (child.name === dir) {
        foundDir = true
        currentNode = child
        break
      }
    }
    if (!foundDir) {
      currentNode = new Node(dir, 'Directory')
      prevNode.children.push(currentNode)
    }
  }
}

/**
 * @param {string} filePath
 * @param {string} content
 * @return {void}
 */
FileSystem.prototype.addContentToFile = function (filePath, content) {
  const splitPath = filePath.split('/')
  splitPath.shift() // Removes empty string at the start of array
  let currentNode = this.head
  for (let i = 0; i < splitPath.length - 1; i++) {
    let foundDir = false
    let prevNode = currentNode
    for (let child of currentNode.children) {
      if (child.name === splitPath[i]) {
        foundDir = true
        currentNode = child
        break
      }
    }
    if (!foundDir) {
      currentNode = new Node(splitPath[i], 'Directory')
      prevNode.children.push(currentNode)
    }
  }
  let foundFile = false
  const fileName = splitPath[splitPath.length - 1]
  for (let child of currentNode.children) {
    if (child.name === fileName) {
      child.children += content
      foundFile = true
      break
    }
  }
  if (!foundFile) {
    let child = new Node(fileName, 'File')
    child.children = content
    currentNode.children.push(child)
  }
}

/**
 * @param {string} filePath
 * @return {string}
 */
FileSystem.prototype.readContentFromFile = function (filePath) {
  const splitPath = filePath.split('/')
  splitPath.shift() // Removes empty string at the start of array
  const result = []
  let currentNode = this.head
  for (let dir of splitPath) {
    for (let child of currentNode.children) {
      if (dir === child.name) {
        currentNode = child
        break
      }
    }
  }
  return currentNode.children
}

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.ls(path)
 * obj.mkdir(path)
 * obj.addContentToFile(filePath,content)
 * var param_4 = obj.readContentFromFile(filePath)
 */
