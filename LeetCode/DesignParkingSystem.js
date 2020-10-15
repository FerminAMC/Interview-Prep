function ParkingSystem(big, medium, small) {
  this.parkingSpaces = [big, medium, small]
}

ParkingSystem.prototype.addCar = function (carType) {
  if (this.parkingSpaces[carType - 1] > 0) {
    this.parkingSpaces[carType - 1]--
    return true
  }
  return false
}
