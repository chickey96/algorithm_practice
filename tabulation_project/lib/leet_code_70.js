// Work through this problem on https://leetcode.com/problems/climbing-stairs/ and use the specs given there.
// Feel free to use this file for scratch work.
//You are climbing a staircase. It takes n steps to reach the top.

// Each time you can either climb 1 or 2 steps.
// In how many distinct ways can you climb to the top ?

function climbStairs(n) {
    let table = new Array(n + 1).fill(0);
    table[0] = 0;
    table[1] = 1;
    table[2] = 2;

    for (let i = 3; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2]
    }

    return table[n];
};