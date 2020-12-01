/*
Link: https://leetcode.com/problems/design-parking-system/
Design a parking system for a parking lot. The parking lot has three kinds of
parking spaces: big, medium, and small, with a fixed number of slots for each
size.

Implement the ParkingSystme class: 
  * ParkingSystem(int big, int medium, int small) initializes object of the
    ParkingSystem class. The number of slots for each parking space are given as
    part of the constructor.

  * bool addCar(int carType) checks whether there is a parking space of carType
    for the car that wants to get into the parking lot. carType can be of three
    kinds: big, medium, or small, which are represented by 1, 2, and 3
    respectively. A car can only park in a parking space of its carType. If
    there is no space available, return false, else park the car in that size
    space and return true.
*/
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
