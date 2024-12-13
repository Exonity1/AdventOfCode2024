const fs = require('fs');

function parseInput(input) {
    const machines = input.trim().split('\n\n').map(machine => {
        const lines = machine.split('\n');
        const [ax, ay] = lines[0].match(/-?\d+/g).map(Number);
        const [bx, by] = lines[1].match(/-?\d+/g).map(Number);
        const [px, py] = lines[2].match(/-?\d+/g).map(Number);
        return {ax, ay, bx, by, px, py};
    });
    return machines;
}

function findSolution(machine) {
    const {ax, ay, bx, by, px, py} = machine;
    
    // Try all combinations up to 100 presses
    for(let a = 0; a <= 100; a++) {
        for(let b = 0; b <= 100; b++) {
            if (a * ax + b * bx === px && 
                a * ay + b * by === py) {
                return {possible: true, tokens: 3 * a + b};
            }
        }
    }
    return {possible: false, tokens: 0};
}

function solve(input) {
    const machines = parseInput(input);
    let totalTokens = 0;
    
    for (let i = 0; i < machines.length; i++) {
        if (i === 1 || i === 3) {
            const machine = machines[i];
        const result = findSolution(machine);
        if(result.possible) {
            totalTokens += result.tokens;
        }
    }
    
    return totalTokens;
    }
}

const input = fs.readFileSync('day13_input.txt', 'utf8');
console.log(solve(input));