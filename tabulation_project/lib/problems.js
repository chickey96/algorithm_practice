// Write a function, stepper(nums), that takes in an array of non negative numbers.
// Each element of the array represents the maximum number of steps you can take from that position in the array.
// The function should return a boolean indicating if it is possible to travel from the 
// first position of the array to the last position.
//
// For Example:
//
// Given [3, 1, 0, 5, 10]
//      - We begin at first position, 3. 
//      - Since the element is 3 we can take up to 3 steps from this position.
//      - This means we can step to the 1, 0, or 5
//      - Say we step to 1
//      - Since the element is 1, now the only option is to take 1 step to land on 0
//      - etc...
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
//
// stepper([3, 1, 0, 5, 10]);           // => true, because we can step through elements 3 -> 5 -> 10
// stepper([3, 4, 1, 0, 10]);           // => true, because we can step through elements 3 -> 4 -> 10
// stepper([2, 3, 1, 1, 0, 4, 7, 8])    // => false, there is no way to step to the end

// memoization
function stepper(nums) {
    
    return memoizationStepper(nums) && tabulationStepper(nums)
}

function memoizationStepper(nums, solved={}) {
    if (nums.length == 0) { return true; }
    if (nums in solved) { return solved[nums]; }

    let possible = false;

    for (let i = 1; i <= nums[0]; i++) {
        if (memoizationStepper(nums.slice(i), solved)) {
            possible = true;
            break;
        }
    }

    solved[nums] = possible;
    return solved[nums]
}

function tabulationStepper(nums) {
    let outcomes_map = new Array(nums.length)

    for(let i = nums.length - 1; i >= 0; i--) {
        let distance_to_end = nums.length - 1 - i
        if(nums[i] >= distance_to_end) {
            outcomes_map[i] = true
        } else {
            let position = i;
            let outcome = false;

            while(position - i <= nums[i]) {
                if(outcomes_map[position]) {
                    outcome = true;
                    break;
                }
                position += 1;
            }

            outcomes_map[i] = outcome;
        }
    }

    return outcomes_map[0];
}


// Write a function, maxNonAdjacentSum(nums), that takes in an array of nonnegative numbers.
// The function should return the maximum sum of elements in the array we can get if we cannot take
// adjacent elements into the sum.
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
// maxNonAdjacentSum([2, 7, 9, 3 , 4])       // => 15, because 2 + 9 + 4
// delete around max [2,7,9,3,4] => [2,X,9,X,4]
// solution length is half input length
// nums = [2,7,9,3,4] solution =[ , , ]
// always round up? what if nums = [2,9,1,1,5]
// don't need to know solution length
// nums = [2,7,9,3,4], chosen = [9] nums = [2,X,X,X,4], chosen = [9, 4] nums = [2,X,X,X,X]
// don't need to store nums can use sum var
// don't need to reiterate through nums, can have nums left var

// maxNonAdjacentSum([4, 2, 1, 6])          // => 10, because 4 + 6 
// delete around max [4,2,1,6] => [4,X,X,6]

// maxNonAdjacentSum([1, 2, 3, 1])          // => 4, because 1 + 3
// delete around max [1,2,3,1] => [1,X,3,X]

// maxNonAdjacentSum([4, 1, 1 , 10, 3, 2])   // => 16, because 4 + 10 + 2
// delete around max [4,1,1,10,3,2] => [4,X,X,10,X,2]
// maxNonAdjacentSum([])                    // => 0
function maxNonAdjacentSum(nums) {
    return recursiveMaxAdjacentSum(nums) && iterativeMaxAdjacentSum(nums);
}

function recursiveMaxAdjacentSum(nums, solved={}) {
    if(nums.length == 1) return nums[0];
    if(nums.length == 0) return 0 ;
    if(nums in solved)   return solved[nums];

    let option1 = nums[0] + recursiveMaxAdjacentSum(nums.slice(2), solved);
    let option2 = recursiveMaxAdjacentSum(nums.slice(1), solved);

    if(option1 >= option2){
        solved[nums] = option1;
    } else {
        solved[nums] = option2;
    }

    return solved[nums];
}

function iterativeMaxAdjacentSum(nums) {
    let sum = 0;
    let nums_left = nums.length;
    const length = nums.length;

    while(nums_left > 0) {
        let max = Math.max(...nums);
        let idx = nums.indexOf(max);

        sum += max
        nums[idx] = -1
        nums_left --

        // replace positive adjacent elements with a negative placeholder  
        let left_idx = idx - 1
        let right_idx = idx + 1

        if(left_idx >= 0 && nums[left_idx] >= 0) {
            nums[left_idx] = -1
            nums_left --
        }

        if(right_idx <= length - 1 && nums[right_idx] >= 0) {
            nums[right_idx] = -1
            nums_left --
        }
    }

    return sum;
}


// Write a function, minChange(coins, amount), that accepts an array of coin values
// and a target amount as arguments. The method should the minimum number of coins needed
// to make the target amount. A coin value can be used multiple times.
//
// You've seen this problem before with memoization, but now solve it using the Tabulation strategy!
//
// Examples:
//
// minChange([1, 2, 5], 11)         // => 3, because 5 + 5 + 1 = 11
// [11, 6, 3]
// minChange([1, 4, 5], 8))         // => 2, because 4 + 4 = 8
// [8, 2, 2]
// minChange([1, 5, 10, 25], 15)    // => 2, because 10 + 5 = 15
// [15, 3, 2, 2]
// minChange([1, 5, 10, 25], 100)   // => 4, because 25 + 25 + 25 + 25 = 100
// [100, 20, 10, 4]
function minChange(coins, amount) {
    // initialize array to store solution for every value from 0 - amount
    let table = new Array(amount + 1)
    table[0] = 0
    let curr_amount = 1

    // loop through every smaller amount up to and including amount
    while(curr_amount <= amount){
        // loop through every coin
        for (let i = coins.length - 1; i >= 0; i--) {
            // allow possibility of not using a coin
            let num_coins = 0

            while (num_coins * coins[i] <= curr_amount) {
                let remainder = curr_amount - num_coins * coins[i] 

                // solutions for smaller amounts are already stored in the table
                // (table filled in left to right)
                if (!table[curr_amount] || 
                    table[remainder] + num_coins < table[curr_amount]) {
                    
                    // use solution for smaller amounts to solve for curr_amount
                    table[curr_amount] = table[remainder] + num_coins
                }
                num_coins++
            }
        }
        curr_amount += 1;
    }

    return table[amount];
}


module.exports = {
    stepper,
    maxNonAdjacentSum,
    minChange
};