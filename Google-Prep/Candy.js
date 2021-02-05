/*
There are N children standing in a line. Each child is assigned a rating value.

You are giving candies to these children subjected to the following
requirements:

    Each child must have at least one candy.
    Children with a higher rating get more candies than their neighbors.

What is the minimum candies you must give?
*/

const candy = (ratings) => {
    let candy = new Array(ratings.length).fill(1);
    for (let i = 0; i < ratings.length - 1; i++) {
        let current = ratings[i];
        let next = ratings[i + 1];
        if (current < next) { // going up the mountain
            candy[i + 1] = candy[i] + 1;
        } else { // Means we found a peak and we must go down.
            downTheMountain(i + 1, ratings, candy);
            candy[i] = Math.max(candy[i], candy[i + 1] + 1);
            i += candy[i + 1];
        }
    }
    let ans = 0;
    for (let i = 0; i < candy.length; i++) {
        ans += candy[i];
    }

    return ans;
}

const downTheMountain = (idx, ratings, candy) => {
    if (idx === ratings.length - 1) {
        return;
    }
    let current = ratings[idx];
    let next = ratings[idx + 1];
    if (current > next) {
        downTheMountain(idx + 1, ratings, candy);
        candy[idx] = candy[idx + 1] + 1;
    } else {
        candy[idx + 1]++; 
    }
    return;
}