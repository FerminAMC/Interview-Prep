/*
There are n flights, and they are labeled from 1 to n.

We have a list of flight bookings. The i-th booking bookings[i] = [i, j, k]
means that we booked k seats from flights labeled i to j inclusive.

Return an array answer of length n, representing the number of seats booked on
each flight in order of their label.

Constraints:

    1 <= bookings.length <= 20000
    1 <= bookings[i][0] <= bookings[i][1] <= n <= 20000
    1 <= bookings[i][2] <= 10000


Example:
    Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
    Output: [10,55,45,25,25]

Approach:
    Each element of the booking array has the number of bookings from 
    i to j inclusive. This means that every time I get a booking, I will do a 
    for loop from i to j, updating values in an array.
    This will be O(bn) Time - where b is the number of bookings and n is the
    input 'n'.

    The second approach is the optimal solution. You take away the amount k to
    the j flight in the booking. You add the amount k to the i flight. This
    doesn't apply when j === n, because it goes out of bounds. 
    I take off the k amount from the position j, because in the array, that
    position is of the next flight. For example, if j === 2, that translates
    to position 1 in the array. 
    This is made so that when we pass the values from seatsBooked[i-1] to
    seatsBooked[i], extra values that should not be passed stop right at the
    next position.
*/

// O(bn) Time | O(n) Space
// This is not the optimal solution
const corpFlightBookings = (bookings, n) => {
    let seatsBooked = new Array(n).fill(0);
    for (let booking of bookings) {
        let i = booking[0];
        let j = booking[1];
        let k = booking[2];
        for (; i <= j; i++){
            seatsBooked[i-1] += k;
        }
    }
    return seatsBooked;
}

// O(n) Time | O(n) Space
const corpFlightBookings = (bookings, n) => {
    let seatsBooked = new Array(n).fill(0);
    for (let booking of bookings) {
        let i = booking[0] - 1;
        let j = booking[1]; // the actual position after the last flight
        let k = booking[2];
        seatsBooked[i] += k;
        if (j < n) seatsBooked[j] -= k;
    }
    for (let i = 1; i < n; i++) {
        seatsBooked[i] += seatsBooked[i - 1];
    }
    return seatsBooked;
}