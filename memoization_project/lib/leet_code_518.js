// Work through this problem on https://leetcode.com/problems/coin-change-2/ and use the specs given there.
// Feel free to use this file for scratch work.

// Instruction from leetcode

// You are given an integer array coins representing coins of different 
// denominations and an integer amount representing a total amount of money.

// Return the number of combinations that make up that amount. If that amount 
// of money cannot be made up by any combination of the coins, return 0.

// You may assume that you have an infinite number of each kind of coin.
// The answer is guaranteed to fit into a signed 32 - bit integer.

var change = function (amount, coins, memo = {}) {
    const key = amount + '-' + coins

    if (key in memo)  { return memo[key]; }
    if (amount === 0) { return 1; }

    let curr_coin = coins[coins.length - 1];

    let num_coin = 0
    let total = 0

    while (num_coin * curr_coin <= amount) {
        total += change(amount - num_coin * curr_coin, coins.slice(0, -1), memo)
        num_coin += 1
    }

    memo[key] = total;
    return memo[key];
}