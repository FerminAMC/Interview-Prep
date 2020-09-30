/**
 * Implement a MinHeap class that supports:
 *    - Building a Min Heap from an input array of integers.
 *    - Inserting integers in the heap.
 *    - Removing the heap's minimum / root value.
 *    - Peeking at the heap's minimum / root value.
 *    - Sifting integers up and down the heap, which is to be used when
 *      inserting and removing values.
 *
 * Note that the heap should be represented in the form of an array.
 */

/**
 * Creating the MinHeap class in a real interview doesn't seem that practical,
 * but it is good to know that this structure simulates a binary tree, where
 * the root node will always be the minimum number in the tree. If I wanted to
 * build a MaxHeap tree, all that needs to be done is change every sign "<" to
 * ">". Another useful thing to know is that you can get the index in the array
 * for every parent or child node with the following formulas:
 *    - Parent Node of array[i]: Math.floor((i - 1) / 2)
 *    - Child nodes of array[i]: leftChild = i * 2 + 1; rightChild = i * 2 + 2
 * Forgot to mention that the parent node will always be smaller than all the
 * child nodes.
 */
class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array)
  }

  // O(n) Time | O(1) Space
  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2)
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array)
    }
    return array
  }

  // O(log(n)) Time | O(1) Space
  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1
    while (currentIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1
      let idxToSwap
      if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx
      } else {
        idxToSwap = childOneIdx
      }
      if (heap[idxToSwap] < heap[currentIdx]) {
        this.swap(idxToSwap, currentIdx, heap)
        currentIdx = idxToSwap
        childOneIdx = currentIdx * 2 + 1
      } else return
    }
  }

  // O(log(n)) Time | O(1) Space
  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2)
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap)
      currentIdx = parentIdx
      parentIdx = Math.floor((currentIdx - 1) / 2)
    }
  }

  // O(1) Time | O(1) Space
  peek() {
    return this.heap[0]
  }

  // O(log(n)) Time | O(1) Space
  remove() {
    this.swap(0, this.heap.length - 1, this.heap)
    const removedVal = this.heap.pop()
    this.siftDown(0, this.heap.length - 1, this.heap)
    return removedVal
  }

  // O(log(n)) Time | O(1) Space
  insert(value) {
    this.heap.push(value)
    this.siftUp(this.heap.length - 1, this.heap)
  }

  // O(1) Time | O(1) Space
  swap(i, j, heap) {
    const tempVal = heap[i]
    heap[i] = heap[j]
    heap[j] = tempVal
  }
}
