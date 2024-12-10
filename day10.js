const fs = require("fs");
const filePath = "day10_input.txt";

function a(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");
    const grid = lines.map(line => line.split('').map(Number));
    
    // Find trailheads (height 0)
    const trailheads = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 0) {
                trailheads.push([r, c]);
            }
        }
    }

    function getValidNeighbors(r, c, height) {
        const dirs = [[0,1], [1,0], [0,-1], [-1,0]]; // right, down, left, up
        return dirs
            .map(([dr, dc]) => [r + dr, c + dc])
            .filter(([nr, nc]) => 
                nr >= 0 && nr < grid.length && 
                nc >= 0 && nc < grid[0].length &&
                grid[nr][nc] === height + 1);
    }

    function countReachableNines(startR, startC) {
        const visited = new Set();
        const reachableNines = new Set();
        
        function dfs(r, c, height) {
            const key = `${r},${c}`;
            if (visited.has(key)) return;
            visited.add(key);
            
            if (grid[r][c] === 9) {
                reachableNines.add(key);
                return;
            }
            
            for (const [nr, nc] of getValidNeighbors(r, c, height)) {
                dfs(nr, nc, height + 1);
            }
        }
        
        dfs(startR, startC, 0);
        return reachableNines.size;
    }

    const scores = trailheads.map(([r, c]) => countReachableNines(r, c));
    let result =  scores.reduce((sum, score) => sum + score, 0);
    console.log(result);
}


function b(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");
    const grid = lines.map(line => line.split('').map(Number));
    
    const trailheads = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 0) {
                trailheads.push([r, c]);
            }
        }
    }

    function getValidNeighbors(r, c, height) {
        const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
        return dirs
            .map(([dr, dc]) => [r + dr, c + dc])
            .filter(([nr, nc]) => 
                nr >= 0 && nr < grid.length && 
                nc >= 0 && nc < grid[0].length &&
                grid[nr][nc] === height + 1);
    }

    function countUniquePaths(startR, startC) {
        const paths = new Set();
        
        function dfs(r, c, height, currentPath) {
            if (grid[r][c] === 9) {
                paths.add(currentPath);
                return;
            }
            
            for (const [nr, nc] of getValidNeighbors(r, c, height)) {
                dfs(nr, nc, height + 1, currentPath + `${nr},${nc}|`);
            }
        }
        
        dfs(startR, startC, 0, `${startR},${startC}|`);
        return paths.size;
    }

    const ratings = trailheads.map(([r, c]) => countUniquePaths(r, c));
    const result = ratings.reduce((sum, rating) => sum + rating, 0);
    console.log(result);
}


a(filePath); 
b(filePath)