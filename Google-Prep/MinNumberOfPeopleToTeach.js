/*
On a social network consisting of m users and some friendships between users,
two users can communicate with each other if they know a common language.

You are given an integer n, an array languages, and an array friendships where:

    There are n languages numbered 1 through n,
    languages[i] is the set of languages the i​​​​​​th​​​​ user knows, and
    friendships[i] = [u​​​​​​i​​​, v​​​​​​i] denotes a friendship between the users u​​​​​​​​​​​i​​​​​ and
    vi.

You can choose one language and teach it to some users so that all friends can
communicate with each other. Return the minimum number of users you need to
teach.
Note that friendships are not transitive, meaning if x is a friend of y and y
is a friend of z, this doesn't guarantee that x is a friend of z. 
*/

const minimumTeachings = (n, languages, friendships) => {
    let mostSpoken = [0,0];
    let langDict = {};
    for (let i = 0; i < languages.length; i++) {
        for (let lang of languages[i]) {
            if (!(lang in langDict)) {
                langDict[lang] = new Set();
            } 
            langDict[lang].add(i+1);
            if (langDict[lang].size > mostSpoken[1]) {
                mostSpoken[0] = lang;
                mostSpoken[1] = langDict[lang].size;
            }
        }
    }

    let cantSpeak = new Set();
    for (let i = 0; i < friendships.length; i++) {
        let canSpeak = false;
        let friendOne = friendships[i][0];
        let langOne = languages[friendOne - 1];
        let friendTwo = friendships[i][1];
        for (let lang of langOne) {
            if (langDict[lang].has(friendTwo)) {
                canSpeak = true;
                break;
            }
        }
        if (!canSpeak) {
            cantSpeak.add(friendOne);
            cantSpeak.add(friendTwo);
        }
    }

    let minCount = Infinity;
    for (let lang of Object.keys(langDict)) {
        let count = 0;
        for (let person of cantSpeak.keys()) {
            if (!langDict[lang].has(person)) count++;
        }
        minCount = Math.min(minCount, count);
    }
    return minCount;
}