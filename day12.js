const fs = require("fs");
const filePath = 'day12_input.txt';


function a(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const grid = data.trim().split("\n").map(line => line.split(''));
    
    function calculatePerimeter(grid, region) {
        let perimeter = 0;
        const plantType = grid[region[0][0]][region[0][1]];
        
        for (const [row, col] of region) {
            // Check all 4 sides
            if (row === 0 || grid[row-1][col] !== plantType) perimeter++; // up
            if (row === grid.length-1 || grid[row+1][col] !== plantType) perimeter++; // down
            if (col === 0 || grid[row][col-1] !== plantType) perimeter++; // left
            if (col === grid[0].length-1 || grid[row][col+1] !== plantType) perimeter++; // right
        }
        
        return perimeter;
    }

    function findRegions(grid, plantType) {
        const visited = Array(grid.length).fill().map(() => Array(grid[0].length).fill(false));
        const regions = [];
        
        function floodFill(row, col, region) {
            if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return;
            if (visited[row][col] || grid[row][col] !== plantType) return;
            
            visited[row][col] = true;
            region.push([row, col]);
            
            floodFill(row - 1, col, region); // up
            floodFill(row + 1, col, region); // down
            floodFill(row, col - 1, region); // left
            floodFill(row, col + 1, region); // right
        }
        
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                if (!visited[row][col] && grid[row][col] === plantType) {
                    const region = [];
                    floodFill(row, col, region);
                    regions.push(region);
                }
            }
        }
        
        return regions;
    }

    // Find unique plant types
    const plantTypes = new Set(grid.flat());
    let totalPrice = 0;
    
    for (const plantType of plantTypes) {
        const regions = findRegions(grid, plantType);
        for (const region of regions) {
            const area = region.length;
            const perimeter = calculatePerimeter(grid, region);
            const price = area * perimeter;
            totalPrice += price;
        }
    }
    
    console.log(totalPrice);
}

function countDistinctSides(grid, region) {
    const plantType = grid[region[0][0]][region[0][1]];
    const segments = new Set();
    
    // Helper to add a segment in canonical form
    const addSegment = (x1, y1, x2, y2) => {
        segments.add(`${Math.min(x1,x2)},${Math.min(y1,y2)}-${Math.max(x1,x2)},${Math.max(y1,y2)}`);
    };
    
    for (const [row, col] of region) {
        // Check all 4 adjacent cells
        if (row <= 0 || (row > 0 && grid[row-1][col] !== plantType)) {
            addSegment(col, row, col+1, row); // top edge
        }
        if (row >= grid.length-1 || (row < grid.length-1 && grid[row+1][col] !== plantType)) {
            addSegment(col, row+1, col+1, row+1); // bottom edge
        }
        if (col <= 0 || (col > 0 && grid[row][col-1] !== plantType)) {
            addSegment(col, row, col, row+1); // left edge
        }
        if (col >= grid[0].length-1 || (col < grid[0].length-1 && grid[row][col+1] !== plantType)) {
            addSegment(col+1, row, col+1, row+1); // right edge
        }
    }
    
    return segments.size;
}

function b(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const grid = data.trim().split("\n").map(line => line.split(''));
    const height = grid.length;
    const width = grid[0].length;
    const visited = new Set();
    let p2 = 0;

    function bfs(startR, startC) {
        const queue = [[startR, startC]];
        const char = grid[startR][startC];
        const points = [];

        while (queue.length) {
            const [r, c] = queue.shift();
            const key = `${r},${c}`;
            if (visited.has(key)) continue;

            visited.add(key);
            points.push([r, c]);

            // Check 4 neighbors
            const neighbors = [
                [r-1, c], [r+1, c],
                [r, c-1], [r, c+1]
            ];

            for (const [nr, nc] of neighbors) {
                if (nr >= 0 && nr < height && nc >= 0 && nc < width &&
                    grid[nr][nc] === char && !visited.has(`${nr},${nc}`)) {
                    queue.push([nr, nc]);
                }
            }
        }
        return points;
    }

    function calculatePerimeter(points) {
        let perimeter = 0;
        const sides = new Map();

        for (const [r, c] of points) {
            const neighbors = [
                [r-1, c], [r+1, c],
                [r, c-1], [r, c+1]
            ];

            for (const [nr, nc] of neighbors) {
                if (nr < 0 || nr >= height || nc < 0 || nc >= width || grid[nr][nc] !== grid[r][c]) {
                    perimeter++;
                    const dir = `${r-nr},${c-nc}`;
                    if (!sides.has(dir)) sides.set(dir, []);
                    sides.get(dir).push([r, c]);
                }
            }
        }
        return { perimeter, sides };
    }

    function calculateSides(sides, area) {
        let sideSum = 0;
        for (const [dir, positions] of sides) {
            const [dr, dc] = dir.split(',').map(Number);
            const posSet = new Set(positions.map(([r, c]) => `${r},${c}`));
            let sideCount = 0;

            for (const [r, c] of positions) {
                const prevKey = `${r-dc},${c+dr}`;
                if (!posSet.has(prevKey)) {
                    sideCount++;
                }
            }
            sideSum += area * sideCount;
        }
        return sideSum;
    }

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const key = `${i},${j}`;
            if (visited.has(key)) continue;

            const points = bfs(i, j);
            const area = points.length;
            const { perimeter, sides } = calculatePerimeter(points);
            p2 += calculateSides(sides, area);
        }
    }

    console.log(p2);
}




a(filePath);
b(filePath);