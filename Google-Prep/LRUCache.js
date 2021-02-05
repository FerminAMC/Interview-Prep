/*
Design a data structure that follows the constraints of a Least Recently Used
(LRU) cache.

Implement the LRUCache class:

    *   LRUCache(int capacity) Initialize the LRU cache with positive size
        capacity.
    *   int get(int key) Return the value of the key if the key exists,
        otherwise return -1.
    *   void put(int key, int value) Update the value of the key if the key
        exists. Otherwise, add the key-value pair to the cache. If the number
        of keys exceeds the capacity from this operation, evict the least
        recently used key.

Follow up:
Could you do get and put in O(1) time complexity?

Example:
    ["LRUCache","put","put","get","put","put","get"]
    [[2],       [2,1],[2,2],[2],  [1,1],[4,1], [2]]
*/


/**
 * LRUCache uses both a map and a doubly-linked list (DLL) to achieve constant time
 * lookups, insertions and deletions. When the user asks for an element, that
 * element's position in the DLL is updated to the head (returns -1 if it's not
 * found). When the user wants to insert an element, if the cache is full, we
 * remove the last element of the DLL and insert the new one in the front, 
 * moving the rest one position back.
 * Lookups are constant, because we store every node in a hash map, so we have
 * constant access to any element in the DLL.
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    // head and tail won't hold any values. All key/values will be between the
    // two. So most recently used element will be head.next and least recently
    // used will be tail.prev
    this.head = new Node(null, null); 
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.map.has(key)) {
        let element = this.map.get(key);
        element.next.prev = element.prev;
        element.prev.next = element.next;
        this.head.next.prev = element;
        element.next = this.head.next;
        element.prev = this.head;
        this.head.next = element;
        this.map.set(key, element);
        return element.val;
    } else {
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.get(key) !== -1) {
        let element = this.map.get(key);
        element.val = value;
        element.next.prev = element.prev;
        element.prev.next = element.next;
        this.head.next.prev = element;
        element.next = this.head.next;
        element.prev = this.head;
        this.head.next = element;
        this.map.set(key, element);
    } else {
        let newNode = new Node(key, value);
        if (this.map.size === this.capacity) {
            let lastElement = this.tail.prev;
            this.map.delete(lastElement.key);
            lastElement.prev.next = this.tail;
            this.tail.prev = lastElement.prev; 
        }
        newNode.next = this.head.next;
        newNode.prev = this.head;
        this.head.next = newNode;
        newNode.next.prev = newNode;
        this.map.set(key, newNode);
    }
};

class Node {
    constructor(key, value) {
        this.key = key;
        this.val = value;
        this.next = null;
        this.prev = null;
    }
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */