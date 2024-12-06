const fs = require("fs");
const filePath = "day6_input.txt";

function a(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const map = lines.map(line => line.split(""));
    const rows = map.length;
    const cols = map[0].length;

    const directions = [
        { dx: -1, dy: 0 }, 
        { dx: 0, dy: 1 },  
        { dx: 1, dy: 0 },  
        { dx: 0, dy: -1 } 
    ];

    // find guard
    let guard = { x: 0, y: 0, dir: 0 };
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if ("^>v<".includes(map[r][c])) {
                guard.x = r;
                guard.y = c;
                guard.dir = "^>v<".indexOf(map[r][c]);
                map[r][c] = "X"; 
            }
        }
    }

    //move guard
    while (true) {
        const { dx, dy } = directions[guard.dir];
        const nx = guard.x + dx;
        const ny = guard.y + dy;

        if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) {
            break; //check for out of bounds
        }

        if (map[nx][ny] === "#") {
            guard.dir = (guard.dir + 1) % 4;
        } else {
            guard.x = nx;
            guard.y = ny;
            if (map[nx][ny] === ".") {
                map[nx][ny] = "X";
            }
        }
    }

    const visitedCount = map.flat().filter(cell => cell === "X").length;

    console.log(visitedCount);
}

function b(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const map = lines.map(line => line.split(""));
    const rows = map.length;
    const cols = map[0].length;

    
    const directions = [
        { dx: -1, dy: 0 }, 
        { dx: 0, dy: 1 },  
        { dx: 1, dy: 0 },  
        { dx: 0, dy: -1 }  
    ];

    // find guard
    let guard = { x: 0, y: 0, dir: 0 };
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if ("^>v<".includes(map[r][c])) {
                guard.x = r;
                guard.y = c;
                guard.dir = "^>v<".indexOf(map[r][c]);
                map[r][c] = "."; 
            }
        }
    }



    const start = { x: guard.x, y: guard.y };

    function doesCreateLoop(testMap) {
        const visited = new Set();
        let { x, y, dir } = guard;

        while (true) {
            const key = `${x},${y},${dir}`;
            if (visited.has(key)) {
                return true; // Loop detected
            }
            visited.add(key);

            const { dx, dy } = directions[dir];
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) {
                return false; //check for out of bounds
            }

            if (testMap[nx][ny] === "#") {
                dir = (dir + 1) % 4;
            } else {
                x = nx;
                y = ny; 
            }
        }
    }

    let validPositions = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (map[r][c] === "." && (r !== start.x || c !== start.y)) {
                const testMap = map.map(row => row.slice());
                testMap[r][c] = "#";

                if (doesCreateLoop(testMap)) {
                    validPositions++;
                }
            }
        }
    }

    console.log(validPositions);
}



a(filePath);
b(filePath)