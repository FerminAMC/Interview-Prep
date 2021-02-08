/*
Implement a MyCalendarTwo class to store your events. A new event can be added
if adding the event will not cause a triple booking.

Your class will have one method, book(int start, int end). Formally, this
represents a booking on the half open interval [start, end), the range of real
    numbers x such that start <= x < end.

A triple booking happens when three events have some non-empty intersection
(ie., there is some time that is common to all 3 events.)

For each call to the method MyCalendar.book, return true if the event can be
added to the calendar successfully without causing a triple booking. Otherwise,
return false and do not add the event to the calendar.

Your class will be called like this: MyCalendar cal = new MyCalendar();
MyCalendar.book(start, end)
*/

const MyCalendarTwo = function() {
    this.calendar = [];
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */ 
// [ [ 5, 10 ], [ 5, 15 ], [ 10, 20 ], [ 10, 40 ], [ 25, 55 ], [ 50, 60 ] ]    
//      true      false         true        true      true       true
MyCalendarTwo.prototype.book = function(start, end) {
    let left = 0;
    let right = this.calendar.length;
    while(left < right) {
        let mid = Math.floor((left + right) / 2);
        if (this.calendar[mid][0] < start) {
            left = mid + 1;
        } else if (this.calendar[mid][0] === start && 
                this.calendar[mid][1] < end){
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    let intersect = 0;
    if (this.calendar.length > 1) {
        if (left === 0) {
            if (this.calendar[left][0] < end) {
                if (this.calendar[left][2] >= 1) return false;
                this.calendar[left][2]++;
                intersect++;
            }
        } else if (left === this.calendar.length) {
            if (this.calendar[left - 1][1] > start) {
                if (this.calendar[left - 1][2] >= 1) return false;
                this.calendar[left - 1][2]++;
                intersect++;
            }
        } else {
            if (this.calendar[left][0] < end) {
                if (this.calendar[left][2] >= 1) return false;
                this.calendar[left][2]++;
                intersect++;
            }
            if (this.calendar[left - 1][1] > start) {
                if (this.calendar[left - 1][2] >= 1) return false;
                this.calendar[left - 1][2]++;
                intersect++;
            }
        }
    }
    this.calendar.splice(left, 0, [start, end, intersect]);
    return true;
};