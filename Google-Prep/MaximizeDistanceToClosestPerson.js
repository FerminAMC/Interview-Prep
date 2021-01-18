/*
You are given an array representing a row of seats where seats[i] = 1 represents
a person sitting in the ith seat, and seats[i] = 0 represents that the ith seat
is empty (0-indexed).

There is at least one empty seat, and at least one person sitting.

Alex wants to sit in the seat such that the distance between him and the closest
person to him is maximized. 

Return that maximum distance to the closest person.

Example:
    Input: seats = [1,0,0,0,1,0,1]
    Output: 2
    Explanation: 
    If Alex sits in the second open seat (i.e. seats[2]), then the closest
    person has distance 2.
    If Alex sits in any other open seat, the closest person has distance 1.
    Thus, the maximum distance to the closest person is 2.
*/

// O(n²) Time | O(1) Space - where n is the number of seats
const maxDistToClosest = seats => {
    let max = 0;
    for (let i = 0; i < seats.length; i++) {
        let seat = seats[i];
        if (seat === 0) {
            let left = expandLeft(seats, i);
            let right = expandRight(seats, i);
            let distance = Math.min(left, right);
            if (distance > max) {
                max = distance;
            }
        }
    }
    return max;
}

const expandLeft = (seats, idx) => {
    if (idx === 0) return Infinity;
    let distance = 0;
    while (idx >= 0) {
        let seat = seats[idx]
        if (seat === 1) break;
        distance++;
        idx--;
    }
    return distance;
}

const expandRight = (seats, idx) => {
    if (idx === seats.length - 1) return Infinity;
    let distance = 0;
    while (idx < seats.length) {
        let seat = seats[idx]
        if (seat === 1) break;
        distance++;
        idx++;
    }
    return distance;
}