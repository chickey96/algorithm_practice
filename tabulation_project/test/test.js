const chai = require("chai");
const { expect } = chai;

const { stepper, maxNonAdjacentSum, minChange } = require('../lib/problems');
const { climbStairs } = require('../lib/leet_code_70');
const { minPathSum } = require('../lib/leet_code_64');

describe("stepper(nums)", () => {
    it("should return a boolean indicating whether it is possible to travel from the start of the array to the end", () => {
        expect(stepper([3, 1, 0, 5, 10])).to.equal(true);
        expect(stepper([3, 4, 1, 0, 10])).to.equal(true);
        expect(stepper([2, 3, 1, 1, 0, 4, 7, 8])).to.equal(false);
    });

    context("when the input is large", () => {
        it("runtime should not grow exponentially", () => {
            let arr = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 5];
            expect(stepper(arr)).to.equal(false);
        });
    });
});

describe("maxNonAdjacentSum(nums)", () => {
  it("should return the maximum sum of non-neighboring elements", () => {
    expect(maxNonAdjacentSum([2, 7, 9, 3, 4])).to.equal(15);
    expect(maxNonAdjacentSum([4, 2, 1, 6])).to.equal(10);
    expect(maxNonAdjacentSum([1, 2, 3, 1])).to.equal(4);
    expect(maxNonAdjacentSum([4, 1, 1, 10, 3, 2])).to.equal(16);
    expect(maxNonAdjacentSum([])).to.equal(0);
  });

  context("when the input is large", () => {
    it("runtime should not grow exponentially", () => {
        let arr = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        expect(maxNonAdjacentSum(arr)).to.equal(19);
    });
  });
});

describe("minChange(coins, amount)", () => {
    it("should return the minimum number of coins needed to make the amount", () => {
        expect(minChange([1, 2, 5], 11)).to.equal(3);
        expect(minChange([1, 4, 5], 8)).to.equal(2);
        expect(minChange([1, 5, 10, 25], 15)).to.equal(2);
        expect(minChange([1, 2, 5], 0)).to.equal(0);
    });

    context("when the input is large", () => {
        it("runtime should not grow exponentially", () => {
            expect(minChange([1, 5, 10, 25], 100)).to.equal(4);
            expect(minChange([411, 377, 14, 456, 434], 6892)).to.equal(16);
        });
    });
});

describe("Leet Code #70 - Climbing Stairs", () => {
    it("should return the number of distinct ways to climb n stairs", () => {
        expect(climbStairs(1)).to.equal(1);
        expect(climbStairs(3)).to.equal(3);
        expect(climbStairs(4)).to.equal(5);
        expect(climbStairs(6)).to.equal(13);
    });
});

describe("Leet Code #64 - Minimum Path Sum", () => {
    it("should return the min sum on a path through the grid", () => {
        expect(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])).to.equal(7);
        expect(minPathSum([[1, 2, 3], [4, 5, 6]])).to.equal(12);
        expect(minPathSum([[1, 1, 1], [1, 1, 1]])).to.equal(4);
        expect(minPathSum([[1, 0, 0], [4, 5, 0]])).to.equal(1);
        expect(minPathSum([[1]])).to.equal(1);
    });
});