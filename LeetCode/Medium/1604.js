/**
 * Link: https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/
 * Leetcode company workers use key-cards to unlock office doors. Each time a
 * worker uses their key-card, the security system saves the worker's name and
 * the time when it was used. The system emits an alert if any worker uses the
 * key-card three or more times in a one-hour period.
 *
 * you are given a list of strings keyName and keyTime where
 * [keyName[i], keyTime[i]] corresponds to a person's name and the time when
 * their key-card was used in a single day.
 *
 * Access times are given in the 24-hour time format "HH:MM" such as '23:10' and
 * '09:40'.
 *
 * Return a list of unique worker names who received an alert for frequent
 * key-card use. Sort the names in ascending order alphabetically.
 *
 * Notice that '10:00' and '11:00' is considered to be within a one-hour period,
 * while '23:59' and '00:10' is not.
 */

/**
 * The solution to this problem is very straight forward if you think of it as a
 * sliding window of size 3. We only care if the times in both edges are within
 * a one-hour period or not. Times in the middle will be within that period of
 * time, so if the right edge is inside that time, it means the rest of the
 * times are as well.
 */
function alertNames(keyName, keyTime) {
  const result = new Set()
  let startTime = new Date('01/01/2020 ' + keyTime[0])
  let alertCounter = 1
  const people = {}
  for (let i = 0; i < keyName.length; i++) {
    const name = keyName[i]
    if (!(name in people)) {
      people[name] = [keyTime[i]]
    } else {
      people[name].push(keyTime[i])
    }
  }
  for (const key of Object.keys(people)) {
    people[key].sort()
    for (let i = 2, j = 0; i < people[key].length; i++, j++) {
      let startTime = new Date('01/01/2020 ' + people[key][j])
      let currentTime = new Date('01/01/2020 ' + people[key][i])
      if (currentTime.getHours() - startTime.getHours() === 0) {
        result.add(key)
        break
      } else if (currentTime.getHours() - startTime.getHours() > 0) {
        if (currentTime.getHours() - startTime.getHours() > 1) {
          continue
        } else if (currentTime.getMinutes() - startTime.getMinutes() <= 0) {
          result.add(key)
          break
        }
      }
    }
  }
  return Array.from(result).sort()
}
