// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

function minPathSum(grid) {
    let solution_map = new Array(grid.length).fill(new Array(grid[0].length))

    // fill in solutions starting from end of grid
    for (let i = solution_map.length - 1; i >= 0; i--) {
        for (let j = solution_map[i].length - 1; j >= 0; j--) {
            // final coordinate sum is the num at final coordinate
            if (i == grid.length - 1 && j == grid[i].length - 1) {
                solution_map[i][j] = grid[i][j];
            } else {
                let options = [];

                if (j + 1 < grid[i].length) { 
                    options.push(solution_map[i][j + 1]) 
                } 

                if (i + 1 < grid.length) {
                    options.push(solution_map[i + 1][j])
                }

                solution_map[i][j] = Math.min(...options) + grid[i][j]
            }

        }
    }

    return solution_map[0][0];
    
}