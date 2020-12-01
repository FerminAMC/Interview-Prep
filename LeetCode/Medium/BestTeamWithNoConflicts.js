/*
Link: https://leetcode.com/problems/best-team-with-no-conflicts/
You are the manager of a basketball team. For the upcoming tournament, you want
to choose the team with the highest overall score. The score of the team is the
sum of scores of all the players in the team.

However, the basketball team is not allowed to have conflicts. A conflict exists
if a youger player has a strictly higher score than an older player. A conflict
does not occur between players of the same age.

Given two lists, scores and ages, where each score[i] and ages[i] represents the
score and age of the ith player, respectively, return the highest overall score
of all possible basketball teams.
*/
function bestTeamScore(scores, ages) {
  let scoreAndAges = []
  let max = -Infinity
  for (let i = 0; i < ages.length; i++) {
    scoreAndAges.push([ages[i], scores[i]])
  }
  scoreAndAges.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1]
    } else {
      return b[0] - a[0]
    }
  })
  const dp = new Array(ages.length).fill(0)
  for (let i = 0; i < scoreAndAges.length; i++) {
    dp[i] = scoreAndAges[i][1]
    for (let j = 0; j < i; j++) {
      if (scoreAndAges[j][1] >= scoreAndAges[i][1]) {
        dp[i] = Math.max(dp[i], dp[j] + scoreAndAges[i][1])
      }
    }
    max = Math.max(max, dp[i])
  }
  return max
}
