/**
  Link: https://leetcode.com/problems/sliding-window-maximum/
  Given an array nums, therre is a sliding window of size k which is moving from
  the very left of the array to the very right. You can only see the k numbers
  in the window. Each time the sliding window moves right by one position.
  Return the max sliding window.

  Extra: Solve this in linear time.

  Input: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
  Output: [3, 3, 5, 5, 6, 7]
 */

// This was my first approach tho this problem. Using the concept of dynamic 
// programming by saving variables like firstMax and secondMax. The problem
// is that there is no way for me to update the secondMax consistently without
// increasing the time complexity of the problem to O(n^2)
class Solution1 {
  public int[] maxSlidingWindow(int[] nums, int k) {
    LinkedList<Integer> window = new LinkedList();
    int firstMax = Integer.MIN_VALUE;
    int secondMax = Integer.MIN_VALUE;
    ArrayList<Integer> localMax = new ArrayList();
    
    for(int i = 0; i < k; i++){
        window.add(nums[i]);
        if(nums[i] > firstMax){
          secondMax = firstMax;
          firstMax = nums[i];
        }
    }
    localMax.add(firstMax);
    
    // Moving the sliding window
    for(int i = k; i < nums.length; i++){
      int leavingElement = window.poll();
      window.add(nums[i]);
      // This is where I should update the secondMax
      if(leavingElement == firstMax){
          if(nums[i] > secondMax){
            firstMax = nums[i];
          }else{
            firstMax = secondMax;
          }
      }else{
        if(nums[i] > firstMax){
          secondMax = firstMax;
          firstMax = nums[i];
        }else if(nums[i] > secondMax){
          secondMax = nums[i];
        }
      }
      localMax.add(firstMax);
    }
    
    int[] result = new int[localMax.size()];
    for(int i = 0; i < localMax.size(); i++){
      result[i] = localMax.get(i).intValue();
    }
    
    return result;
  }
}

/**
  For this solution, two extra arrays are created, in order to keep track of
  the max values on both extremes of the window, a left-to-right array and a
  right-to-left one.
  The array is divide into nums.length / k windows. 
  For the leftToRight array, the max in the k sized spaced will always be at the
  rightmost value, and for the rightToLeft array, it will be at the leftmost
  value.
  When the window moves, i and j move with it, and the max in that window will 
  be the max number between leftToRight[j] and rightToLeft[i].
  Example:

    window of len k |-------| 
    nums =         [1, 3, -1, -3, 5, 3, 6, 7]

                           j
                    |-------| |-------| |---|
    leftToRight =  [1, 3,  3, -3, 5, 5, 6, 7]

                    i
                    |-------| |-------| |---|
    rightToLeft =  [3, 3, -1,  5, 5, 3, 7, 7]

    result = [3, 3, 5, 5, 6, 7]

  O(n) Time | O(n) space - where n is the number of elements in the array nums
 */
class Solution2 {
  public int[] maxSlidingWindow(int[] nums, int k) {
    int[] leftToRight = new int[nums.length];
    int[] rightToLeft = new int[nums.length];
    int[] result = new int[nums.length - k + 1];
    int maxLTR = Integer.MIN_VALUE;
    int maxRTL = Integer.MIN_VALUE;
    for(int i = 0, j = nums.length-1; i < nums.length && j >= 0; i++, j--){
      // Filling array leftToRight
      if(i % k == 0){
        maxLTR = Integer.MIN_VALUE;
      }
      maxLTR = Math.max(maxLTR, nums[i]);
      leftToRight[i] = maxLTR;
      // Filling array rightToLeft
      if((j + 1) % k == 0){
        maxRTL = Integer.MIN_VALUE;
      }
      maxRTL = Math.max(maxRTL, nums[j]);
      rightToLeft[j] = maxRTL;
    }

    // i is the left side of the moving window
    // j is the right side of the moving window
    int localMax = Integer.MIN_VALUE;
    for(int i = 0, j = k - 1; j < nums.length; i++, j++){
      localMax = Math.max(leftToRight[j], rightToLeft[i]);
      result[i] = localMax;
    }

    return result;
  }
}