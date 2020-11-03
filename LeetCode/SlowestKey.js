function slowestKey(releaseTimes, keysPressed) {
  let maxTime = releaseTimes[0]
  let maxChar = keysPressed[0]
  for (let i = 1; i < releaseTimes.length; i++) {
    const currTime = releaseTimes[i] - releaseTimes[i - 1]
    if (currTime > maxTime) {
      maxTime = currTime
      maxChar = keysPressed[i]
    } else if (currTime === maxTime) {
      maxChar =
        maxChar.charCodeAt() < keysPressed[i].charCodeAt()
          ? keysPressed[i]
          : maxChar
    }
  }
  return maxChar
}
