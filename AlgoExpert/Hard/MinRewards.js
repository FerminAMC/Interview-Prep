/*
Imagine that you're a teacher who's just graded the final exam in class. You
have a list of student scores on the final exam in a particular order (not
necessarily sorted), and you want to reward your students. You decide to do so
fairly by giving them arbitrary rewards following two rules:
  1) All students must receive at least one reward.
  2) Any given student must receive strictly more rewards than an adjacent
     student (a student immediately to the left or to the right) with a lower
     score and must receive strictly fewer rewards than an adjacent student with
     a higher score.

Write a function that takes in a list of scores and returns the minimum number
of rewards that you must give out to students to satisfy the two rules.

You can assume that all students have different scores; in other words, the
scores are all unique.
*/

function minRewards(scores) {
  let minScore = 0
  const rewards = new Array(scores.length).fill(1)
  const localMins = findLocalMins(scores)
  for (const min of localMins) {
    goLeft(min, scores, rewards)
    goRight(min, scores, rewards)
  }
  let totalRewards = 0
  for (const reward of rewards) {
    totalRewards += reward
  }
  console.log(rewards)
  return totalRewards
}

function findLocalMins(scores) {
  const localMins = []
  for (let i = 0; i < scores.length; i++) {
    if (i === 0 && scores[i] < scores[i + 1]) localMins.push(i)
    if (i === scores.length - 1 && scores[i] < scores[i - 1]) localMins.push(i)
    if (i === 0 || i === scores.length - 1) continue
    if (scores[i] < scores[i + 1] && scores[i] < scores[i - 1])
      localMins.push(i)
  }
  return localMins
}

function goLeft(idx, scores, rewards) {
  for (let i = idx - 1; i >= 0; i--) {
    if (scores[i] > scores[i + 1]) {
      if (rewards[i] > rewards[i + 1] + 1) {
        break
      } else {
        rewards[i] = rewards[i + 1] + 1
      }
    } else break
  }
}

function goRight(idx, scores, rewards) {
  for (let i = idx + 1; i < scores.length; i++) {
    if (scores[i - 1] < scores[i]) {
      rewards[i] = rewards[i - 1] + 1
    } else break
  }
}
