/**
 * You are given an array points, an integer angle, and your location, where
 * location = [POSx, POSy] and points[i] = [xi, yi] both denote integral
 * coordinates on the X-Y plane.
 *
 * Initially, you are facing directly east from you position. You cannot move
 * from your position, but you can rotate. In other words, POSx and POSy cannot
 * be changed. Your field of view in degrees is represented by angle,
 * determining how wide you can see from any given view direction. Let d be the
 * amount in degrees that you rotate counterclockwise. Then, your field of view
 * is the inclusive range of angles [d - angle/2, d + angle/2].
 *
 * You can see some set of points if, for each point, the angle formed by the
 * point, your position, and the immediate east direction from your position is
 * in your field of view.
 *
 * There can be multiple points at one coordinate. There may be points at your
 * location, and you can always see these points regardless of your rotation.
 * Points do not obstruct your vision to other points.
 *
 * Return the maximum number of points you can see.
 */

/**
 * Note: This solution was all taken from the discussion section of this
 * problem. All credit goes to user alanlzl in Leetcode.
 *
 * First we need to convert all coordinates to radians, inserting them in the
 * radians array. findLoc gives us the position where we need to insert the
 * value in order to keep it sorted.
 *
 * Then we duplicate the array and offset the second half by 2*pi. This is done
 * because we need to make this a circular array.
 *
 * We also need to convert the angle to radians.
 *
 * Finally, we create a sliding window that satisfies arr[r] - arr[l] <= angle.
 */
function visiblePoints(points, angle, location) {
  let extraPoints = 0 // Points in the same position as our location
  let maxPoints = 0
  let radians = []
  const posX = location[0]
  const posY = location[1]

  for (const [x, y] of points) {
    if (x === posX && y === posY) {
      extraPoints++
      continue
    }
    const xRadian = Math.atan2(y - posY, x - posX)
    let idx = findLoc(xRadian, radians)
    xRadian < radians[idx] ? idx : idx++
    radians.splice(idx, 0, xRadian)
  }
  for (let i = 0; i < points.length; i++) {
    radians.push(radians[i] + 2.0 * Math.PI)
  }

  angle = (Math.PI * angle) / 180 // Converting degrees to radians

  let l = 0
  for (let r = 0; r < radians.length; r++) {
    while (radians[r] - radians[l] > angle) {
      l++
    }
    maxPoints = Math.max(maxPoints, r - l + 1)
  }
  return maxPoints + extraPoints
}

// To insert values into an array in sorted order
function findLoc(val, arr, st, en) {
  st = st || 0
  en = en || arr.length
  var pivot = parseInt(st + (en - st) / 2, 10)
  if (en - st <= 1 || arr[pivot] === val) return pivot
  if (arr[pivot] < val) {
    return findLoc(val, arr, pivot, en)
  } else {
    return findLoc(val, arr, st, pivot)
  }
}
