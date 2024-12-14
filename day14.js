const fs = require('fs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function parseInput(data) {
    return data.trim().split('\n').map(line => {
        const [pos, vel] = line.split(' ');
        const [x, y] = pos.substring(2).split(',').map(Number);
        const [vx, vy] = vel.substring(2).split(',').map(Number);
        return { x, y, vx, vy };
    });
}

function simulateStep(robots, width, height) {
    return robots.map(robot => {
        let newX = (robot.x + robot.vx) % width;
        let newY = (robot.y + robot.vy) % height;
        if (newX < 0) newX += width;
        if (newY < 0) newY += height;
        return { 
            x: newX, 
            y: newY, 
            vx: robot.vx, 
            vy: robot.vy 
        };
    });
}

function createGrid(robots, width, height) {
    const grid = Array(height).fill().map(() => Array(width).fill(false));
    robots.forEach(robot => {
        grid[robot.y][robot.x] = true;
    });
    return grid;
}

function visualizeGrid(robots, width, height, seconds) {
    const grid = Array(height).fill().map(() => Array(width).fill('.'));
    robots.forEach(robot => {
        grid[robot.y][robot.x] = '#';
    });
    
    console.clear();
    console.log(`\nSekunde: ${seconds}\n`);
    grid.forEach(row => console.log(row.join('')));
}

function isEasterEgg(robots, width, height) {
    const grid = createGrid(robots, width, height);
    
    // Weihnachtsbaum-Muster erkennen
    for (let row = 1; row < height - 1; row++) {
        for (let col = 1; col < width - 1; col++) {
            if (grid[row][col] &&
                grid[row-1][col] &&
                grid[row+1][col] &&
                grid[row][col-1] &&
                grid[row][col+1] &&
                grid[row+1][col-1] &&
                grid[row+1][col+1]) {
                    console.log(`Weihnachtsbaum-Muster gefunden bei Position ${col},${row}`);
                    return true;
            }
        }
    }
    return false;
}

async function b(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const robots = parseInput(data);
    const width = 101;
    const height = 103;
    let seconds = 0;
    let currentRobots = [...robots];

    while (seconds < 10000) {
        currentRobots = simulateStep(currentRobots, width, height);
        seconds++;
        
        
        
        if (isEasterEgg(currentRobots, width, height)) {
            console.log(`\nWeihnachtsbaum-Muster gefunden nach ${seconds} Sekunden!`);
            return seconds;
        }
    }
    return -1;
}

function a(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const robots = parseInput(data);
    const width = 101;
    const height = 103;
    const seconds = 100;
    
    let currentRobots = [...robots];
    for (let i = 0; i < seconds; i++) {
        currentRobots = simulateStep(currentRobots, width, height);
    }
    
    // Quadranten zählen
    const midX = Math.floor(width / 2);
    const midY = Math.floor(height / 2);
    const quadrants = [0, 0, 0, 0];
    
    currentRobots.forEach(robot => {
        if (robot.x !== midX && robot.y !== midY) {
            const quadrantIndex = 
                (robot.y > midY ? 2 : 0) + 
                (robot.x > midX ? 1 : 0);
            quadrants[quadrantIndex]++;
        }
    });
    
    return quadrants.reduce((acc, val) => acc * val, 1);
}

// Ausführung
(async () => {
    console.log("Teil 1:", a('day14_input.txt'));
    console.log("Teil 2:", await b('day14_input.txt'));
})();

