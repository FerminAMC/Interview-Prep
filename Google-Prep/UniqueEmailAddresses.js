/*
Every email consists of a local name and a domain name, separated by the @ sign.

For example, in alice@leetcode.com, alice is the local name, and leetcode.com is
the domain name.

Besides lowercase letters, these emails may contain '.'s or '+'s.

If you add periods ('.') between some characters in the local name part of an
email address, mail sent there will be forwarded to the same address without
dots in the local name.  For example, "alice.z@leetcode.com" and
"alicez@leetcode.com" forward to the same email address.  (Note that this rule
does not apply for domain names.)

If you add a plus ('+') in the local name, everything after the first plus sign
will be ignored. This allows certain emails to be filtered, for example
m.y+name@email.com will be forwarded to my@email.com.  (Again, this rule does
not apply for domain names.)

It is possible to use both of these rules at the same time.

Given a list of emails, we send one email to each address in the list.  How many
different addresses actually receive mails? 

Example: 
    Input: ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com",
            "testemail+david@lee.tcode.com"]
    Output: 2
    Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually
    receive mails
*/

/**
 * @param {string[]} emails
 * @return {number}
 */
// O(nm) Time | O(m) Space - where n is the number of emails and m is the max
// number of words separated by dots in an email.
const numUniqueEmails = emails => {
    const uniqueEmails = new Set();
    for (const email of emails) {
        let [name, domain] = email.split(/[@]/);
        name = name.split(/\+(.*)/)[0].split(/[.]/);
        let nameWithoutDots = '';
        for (let subName of name) {
            nameWithoutDots += subName;
        }
        uniqueEmails.add(nameWithoutDots + '@' + domain);
    }

    return uniqueEmails.size;
}