/**
 * A frog is crossing a river. The river is diivided into x units and at each
 * unit, there may or may not exist a stone. The frog can jump on a stone, but
 * it must not jump into the water.
 * Given a list of stones' positions (in units) in a sorted ascending order,
 * determine if the frog is able to cross the river by landing onn the last
 * stone. Initially, the frog is on the first stone and assume the first jump
 * must be 1 unit.
 *
 * If the frog's last jump was k units, then its next jump must be either k - 1,
 * k, or k + 1 units. Note that the frog can only jump in the forward direction.
 *
 * Input: stones = [0, 1, 3, 5, 6, 8, 12, 17]
 * Output: true
 */

/**
 * This solution implements dynamic programming. We store every possible way to
 * reach a particular jump, following the rule of the k-length jump. Starting
 * with the base case, which is 0. We can only jump k+1 (0+1) in this case, so
 * value 1 gets updated. We can now reach it with a jump of 1. Then we move
 * on to the next stone, 1, check all the possible jumps stored in that value
 * and we repeat the process, storing all possible jumps to every number,
 * ending with this map:
 * Map(8) {
 *   0 => Set(1) { 0 },
 *   1 => Set(1) { 1 },
 *   3 => Set(1) { 2 },
 *   5 => Set(1) { 2 },
 *   6 => Set(2) { 3, 1 },
 *   8 => Set(2) { 3, 2 },
 *   12 => Set(1) { 4 },
 *   17 => Set(1) { 5 }
 * }
 * Once we fill the map, we can simply check the last element of the map. If it
 * has any value stored, it means there was a jump possible at that position,
 * so the frog was able to cross the river.
 * In this case, the map and set structures are very important, otherwise,
 * the time and space complexity can go up significantly. By using a map, we
 * can ensure that every check if the map has a particular number is done in
 * constant time, and the set only allows us to store unique numbers, preventing
 * any duplcates to be stored in any position.
 * O(n^2) Time | O(n) Space - where n is the number of elements in the stones
 * array.
 */
function canCross(stones) {
  const stonesAndJumps = new Map()
  const target = stones[stones.length - 1]
  for (let i = 0; i < stones.length; i++) {
    stonesAndJumps.set(stones[i], new Set())
  }
  stonesAndJumps.get(0).add(0)
  for (let i = 0; i < stones.length; i++) {
    const currentStone = stones[i]
    for (let jump of stonesAndJumps.get(stones[i])) {
      const k = jump + currentStone
      if (stonesAndJumps.has(k) && k !== currentStone) {
        stonesAndJumps.get(k).add(jump)
      }
      const kMinusOne = jump + currentStone - 1
      if (stonesAndJumps.has(kMinusOne) && kMinusOne !== currentStone) {
        stonesAndJumps.get(kMinusOne).add(jump - 1)
      }
      const kPlusOne = jump + currentStone + 1
      if (stonesAndJumps.has(kPlusOne)) {
        stonesAndJumps.get(kPlusOne).add(jump + 1)
      }
    }
  }
  return stonesAndJumps.get(target).size > 0
}
