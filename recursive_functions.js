function calculate_factorial(n) {
    if(n < 1) { return 0 }
    if(n == 1) { return 1 }

    return (n * calculate_factorial(n - 1));
}

// factorial 5 = 5! = (5 * 4 * 3 * 2 * 1) = 120
console.log(`${calculate_factorial(5)} should be 120`)

// factorial 4 = 4! = (4 * 3 * 2 * 1) = 24
console.log(`${calculate_factorial(4)} should be 24`)