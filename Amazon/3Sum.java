/**
 * Given an array nums of n integers, find three elements a, b, and c in nums
 * suchc that a + b + c = 0. Find all triplets in the array that give the sum of
 * zero.
 *
 * The solution set must not contain duplicate triplets.
 */

/**
  This one is almos the same as ThreeNumberSum in the Medium folder. The only
  difference is that this one doesn't allow duplicates in the result. In order
  to avoid that, in line 37 we check if the previous number is equal to the 
  current one, and if it is, we skip it. That gets rid of all dups. 
  O(n^2) Time - O(n) Space - where n is the number of elements in the nums
  array.
 */
class Solution {
  public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> triplets = new ArrayList();
    for(int i = 0; i < nums.length && nums[i] <= 0; ++i){
      if(i == 0 || nums[i] != nums[i-1]){
        twoNumberSum(nums, triplets, i);
      }
    }
    return triplets;
  }

  public void twoNumberSum(int[] nums, List<List<Integer>> triplets, int i){
    int left = i + 1;
    int right = nums.length - 1;
    while(left < right){
      int sum = nums[i] + nums[left] + nums[right];
      if(sum > 0){
        --right;
      }else if(sum < 0){
        ++left;
      }else{
        triplets.add(Arrays.asList(nums[i], nums[left++], nums[right--]));
        while(left < right && nums[left] == nums[left-1]){
          ++left;
        }
      }
    }
  }
}