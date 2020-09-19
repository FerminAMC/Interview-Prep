/**
  Say you have an array for which the i-th element is the price of a given stock
  on day i.

  If you were only permitted to complete at most one transaction (i.e., buy one
  and sell one share of the stock), design an algorithm to find the maximum 
  profit. 
  
  Note that you cannot sell stock before you buy one.
 */

/**
  This problem is only considering that you can buy and sell once, so it becomes
  much simpler.
  O(n) Time | O(1) Space
 */
class Solution {
  public int maxProfit(int[] prices) {
    int minBuy = Integer.MAX_VALUE;
    int maxProfit = 0;
    for(int i = 0; i < prices.length; i++){
      if(minBuy > prices[i]){
        minBuy = prices[i];
      }else if(prices[i] - minBuy > maxProfit){
        maxProfit =  prices[i] - minBuy;
      }
    }
    return maxProfit;
  }
}