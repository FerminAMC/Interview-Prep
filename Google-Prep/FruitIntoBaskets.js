/*
In a row of trees, the i-th tree produces fruit with type tree[i].

You start at any tree of your choice, then repeatedly perform the following
steps:

    1. Add one piece of fruit from this tree to your baskets.  If you cannot,
        stop.
    2. Move to the next tree to the right of the current tree.  If there is no
        tree to the right, stop.

Note that you do not have any choice after the initial choice of starting tree:
you must perform step 1, then step 2, then back to step 1, then step 2, and so
on until you stop.

You have two baskets, and each basket can carry any quantity of fruit, but you
want each basket to only carry one type of fruit each.

What is the total amount of fruit you can collect with this procedure?
*/

const totalFruit = tree => {
    let maxFruit = 0;
    let x = -1; // first occurence of first element
    let y = -1; // first occurence of second element
    let l_x = -1; // last occurence of first element
    let l_y = -1; // last occurence of second element
    let i = 0; // current position in the tree array

    while (i < tree.length) {
        if (x === -1) {
            x = i; 
            l_x = i;
            // The +1 represents the new fruit that is added
            maxFruit = Math.max(maxFruit, i - x + 1);
        } else if (y === -1) {
            maxFruit = Math.max(maxFruit, i - x + 1);
            if (tree[i] === tree[x]) {
                l_x = i;
            } else {
                y = i;
                l_y = i;
            }
        } else {
            if (tree[x] === tree[i]) {
                l_x = i;
                maxFruit = Math.max(maxFruit, i - x + 1);
            } else if (tree[y] === tree[i]) {
                l_y = i;
                maxFruit = Math.max(maxFruit, i - x + 1);
            } else {
                maxFruit = Math.max(maxFruit, i - x);
                x = Math.min(l_x, l_y) + 1;
                l_x = Math.max(l_x, l_y);
                y = i;
                l_y = i;
            }
        }

        i++;
    }
    return maxFruit;
}