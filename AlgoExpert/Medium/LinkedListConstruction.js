/*
Write a DoublyLinkedList class that has a head and a tail, both of which point
to either a linked list Node or null.
The class should support:
  - Setting the head and tail of the linked list.
  - Inserting nodes before and after other nodes as well as at given positions
    (the position of the head node is 1).
  - Removing given nodes and removing nodes with given values.
  - Searching for nodes with given values.
Note that setHead, setTail, insertBefore, insertAfter, insertAtPosition, and
remove methods all take in actual Nodes as input parameters--not integers
(except for insertAtPosition, which also takes in an integer representing the
position); this means that you don't need to create any new Nodes in these
methods. The input nodes can be either stand-alone nodes or nodes that are
already in the linked list. You won't be told if the input nodes are already in
the linked list, so your code will have to defensively handle this scenario.

Each Node has an integer value as well as a prev node and a next node, both of
which can point to either another node or null.
*/

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHead(node) {
    if(this.head !== null) {
      this.insertBefore(this.head, node);
    } else {
      this.head = node;
      this.tail = node;
    }
  }

  setTail(node) {
    if(this.tail === null){
      this.setHead(node);
      return;
    } else{
      this.insertAfter(this.tail, node);
    }
  }

  insertBefore(node, nodeToInsert) {
    if(nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.prev = node.prev;
    nodeToInsert.next = node;
    if(node === this.head){
      this.head = nodeToInsert;
    } else{
      node.prev.next = nodeToInsert;
    }
    node.prev = nodeToInsert;
  }

  insertAfter(node, nodeToInsert) {
    if(nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.prev = node;
    nodeToInsert.next = node.next;
    if(node === this.tail){
      this.tail = nodeToInsert;
    } else{
      node.next.prev = nodeToInsert;
    }
    node.next = nodeToInsert;
  }

  insertAtPosition(position, nodeToInsert) {
    if(position === 1){
      this.setHead(nodeToInsert);
      return;
    }
    let currNode = this.head;
    let currPos = 1;
    while(currNode !== null && currPos++ !== position){
      currNode = currNode.next;
    }
    if(currNode !== null){
      this.insertBefore(currNode, nodeToInsert);
    } else {
      this.setTail(nodeToInsert);
    }
  }

  removeNodesWithValue(value) {
    let currNode = this.head;
    while(currNode !== null){
      const nodeToRemove = currNode;
      currNode = currNode.next;
      if(nodeToRemove.value === value) this.remove(nodeToRemove);
    }
  }

  remove(node) {
    if(node === this.head) this.head = this.head.next;
    if(node === this.tail) this.tail = this.tail.prev;
    if(node.prev !== null) node.prev.next = node.next;
    if(node.next !== null) node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
  }

  containsNodeWithValue(value) {
    let currNode = this.head;
    while(currNode !== null && currNode.value !== value){
      currNode = currNode.next;
    }
    return currNode !== null;
  }
}