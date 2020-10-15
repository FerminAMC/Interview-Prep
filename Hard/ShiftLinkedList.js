/*
Write a function that takes in the head of a Singly Linked List and an integer
k, shifts the list in place (i.e., doesn't create a brand new list) by k
positions, and returns its new head.

Shifting a Linked List  means moving its nodes forward or backward and wrapping
them around the list where appropriate. For example, shifting a Linked List 
forward by one position would make its tail become the new head of the list.

Whether nodes are moved forward or backward is determined by whether k is
positive or negative.

Each LinkedList node has an integer value as well as a next node pointing to 
the next node in the list or to null if it's the tail of the list.

You can assume that the input Linked List will always have at least one node.

Sample input 1:
head = 0 -> 1 -> 2 -> 3 -> 4 -> 5
k = 2
result = 4 -> 5 -> 0 -> 1 -> 2 -> 3

Sample input 2:
head = 0 -> 1 -> 2 -> 3 -> 4 -> 5
k = -1
result = 1 -> 2 -> 3 -> 4 -> 5 -> 0
*/

/*
The tricky part to this question is to know where to "cut" the Linked List.
First I needed the size of the list. I just needed to find the new head and link
the new tail to null. From the first pass I do to the list to get its size I can
get the tail of the list. Then I do k % listSize in case k is bigger than the
listSize. This will give me the position where my new head is located. I connect
the tail to the original head and just find the new tail to make its next value
null.

O(n) Time | O(1) Space - where n is the number of nodes in the list.
*/
function shiftLinkedList(head, k) {
  let listSize = 1;
  let tail = head;
  while(tail.next !== null){
    listSize++;
    tail = tail.next;
  }
  k = k % listSize;
  if(k === 0) return head;
  k = k > 0 ? listSize - k : Math.abs(k);
  tail.next = head;
  let newTail = null;
  for(let i = 1; i <= k; i++){
    newTail = head;
    head = head.next;
  }
  newTail.next = null;
  return head;
}