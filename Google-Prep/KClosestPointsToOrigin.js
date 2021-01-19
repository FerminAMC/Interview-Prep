/*
We have a list of points on the plane.  Find the K closest points to the origin
(0, 0).

(Here, the distance between two points on a plane is the Euclidean distance.)

You may return the answer in any order.  The answer is guaranteed to be unique
(except for the order that it is in.)
*/

// O(nlog(n)) Time | O(1) Space - where n is the number of points
const kClosest = (points, K) => {
    points.sort((a, b) => {
        let distA = euclideanDist(a[0], a[1]);
        let distB = euclideanDist(b[0], b[1]);
        return distA - distB;
    });
    return points.slice(0, K);
}

const euclideanDist = (x, y) => {
    return Math.sqrt((x*x) + (y*y));
}