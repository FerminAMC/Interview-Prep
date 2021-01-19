/*
Given an array of meeting time intervals intervals where
intervals[i] = [starti, endi], return the minimum number of conference rooms
required.

Example: 
    Input: intervals = [[0,30],[5,10],[15,20]]
    Output: 2
*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */
// O(n²) Time | O(n) Space - where n is the number of intervals.
const minMeetingRooms = intervals => {
    intervals.sort((a, b) => a[0] - b[0]);
    let rooms = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        let interval = intervals[i];
        if (!freeRooms(rooms, interval)) {
            rooms.push(interval);
        }
    }
    return rooms.length;
}

const freeRooms = (rooms, newMeeting) => {
    let newMeetingStart = newMeeting[0];
    let freeRoom = false;
    for (let i = 0; i < rooms.length; i++) {
        let endOfMeeting = rooms[i][1];
        if (newMeetingStart >= endOfMeeting) {
            freeRoom = true;
            rooms[i] = newMeeting;
            break;
        }
    }
    return freeRoom;
}