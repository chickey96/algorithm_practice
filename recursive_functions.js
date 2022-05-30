function calculate_factorial(n) {
    if(n < 1) { return 0 }
    if(n == 1) { return 1 }

    return (n * calculate_factorial(n - 1));
}

console.log("basic tests for calculate_factorial")
// factorial 5 = 5! = (5 * 4 * 3 * 2 * 1) = 120
console.log(`${calculate_factorial(5)} should be 120`)
// factorial 4 = 4! = (4 * 3 * 2 * 1) = 24
console.log(`${calculate_factorial(4)} should be 24`)

function find_fibonacci(n) {
    if(n <= 2) { return 1; }

    return (find_fibonacci(n-1) + find_fibonacci(n-2));
}

console.log("basic tests for find_fibonacci")
// fibonacci 5 => [1, 1, 2, 3, 5] = 5
console.log(`${find_fibonacci(5)} should be 5`)
// fibonacci 5 => [1, 1, 2, 3, 5, 8, 13] = 5
console.log(`${find_fibonacci(7)} should be 13`)
