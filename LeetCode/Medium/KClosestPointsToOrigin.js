/**
 * Link: https://leetcode.com/problems/k-closest-points-to-origin/
 * We have a list of points on the plane. find the K closest poinnts to the
 * orign (0, 0).
 *
 * Here, the distance between two points is the Euclidean distance.
 *
 * You may return the answer in any order. The answer is guaranteed to be
 * unique.
 */

// Modifying the sort function is very useful in this case. Just by sorting
// by the Euclidean distance we can avoid using any extra memory.
// O(nlog(n)) Time |O(1) Space - nlog(n) time due to the sorting algorithm
// Javascript has.
const kClosest = function (points, K) {
  points.sort(function (a, b) {
    const firstDistance = getDistance(a[0], a[1])
    const secondDistance = getDistance(b[0], b[1])
    if (firstDistance < secondDistance) {
      return -1
    } else if (firstDistance > secondDistance) {
      return 1
    } else return 0
  })
  return points.slice(0, K)
}

const getDistance = function (x, y) {
  const distance = x ** 2 + y ** 2
  return distance
}
