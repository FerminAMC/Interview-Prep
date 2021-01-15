/*
Given a social network and an individual A in the social network, return a list
of individuals that have the most mutual friends with individual A.

I assume that the input I receive is only an object Node and that every node
has a list of friends and a property name.

Example: 

    c ----- h        y
  / |       |        |
a - b - e - f - g    x
    |   |
    d - i - j

    Input: Node b
    Output: mutualFriends = {
                                h: 1,
                                i: 2,
                                f: 1
                            }
*/

// O(nm) Time | O(n) Space - where n is the number of friends of the given Node
// person and m is the number of friends of a given Node person.friend. 
const mutualFriends = person => {
    const mutualFriends = {};
    const personFriends = new Set();
    for (const friend of person.friends) {
        personFriends.add(friend.name);
    }

    while (person.friends.length) {
        const currentFriend = person.friends.pop();
        for (const friend of currentFriend.friends) {
            if (friend.name === person.name || personFriends.has(friend.name)) {
                continue;
            }
            if (friend.name in mutualFriends) {
                mutualFriends[friend.name] += 1;
            } else {
                mutualFriends[friend.name] = 1;
            }
        }
    }

    return mutualFriends;
}   

