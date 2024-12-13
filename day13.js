const fs = require('fs');

function parseInputPart1(input) {
    const machines = input.trim().split('\n\n').map(machine => {
        const lines = machine.split('\n');
        const [ax, ay] = lines[0].match(/-?\d+/g).map(Number);
        const [bx, by] = lines[1].match(/-?\d+/g).map(Number);
        const [px, py] = lines[2].match(/-?\d+/g).map(Number);
        return {ax, ay, bx, by, px, py};
    });
    return machines;
}

function parseInputPart2(input) {
    const machines = input.trim().split('\n\n').map(machine => {
        const lines = machine.split('\n');
        const [ax, ay] = lines[0].match(/-?\d+/g).map(Number);
        const [bx, by] = lines[1].match(/-?\d+/g).map(Number);
        const [px, py] = lines[2].match(/-?\d+/g).map(Number);
        return {
            ax, ay, bx, by, 
            px: px + 10000000000000, 
            py: py + 10000000000000
        };
    });
    return machines;
}

function findSolutionPart1(machine) {
    const {ax, ay, bx, by, px, py} = machine;
    
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

function findSolutionPart2(machine) {
    const {ax, ay, bx, by, px, py} = machine;
    
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const g = gcd(ax * by - ay * bx, 0);
    
    if ((px * by - py * bx) % g !== 0) {
        return {possible: false, tokens: 0};
    }
    
    const a = Math.floor((px * by - py * bx) / (ax * by - ay * bx));
    const b = Math.floor((px - ax * a) / bx);
    
    if (a >= 0 && b >= 0 && 
        a * ax + b * bx === px && 
        a * ay + b * by === py) {
        return {possible: true, tokens: 3 * a + b};
    }
    
    return {possible: false, tokens: 0};
}

function part1(input) {
    const machines = parseInputPart1(input);
    let totalTokens = 0;
    
    for(const machine of machines) {
        const result = findSolutionPart1(machine);
        if(result.possible) {
            totalTokens += result.tokens;
        }
    }
    
    return totalTokens;
}

function part2(input) {
    const machines = parseInputPart2(input);
    let totalTokens = 0;
    
    for(const machine of machines) {
        const result = findSolutionPart2(machine);
        if(result.possible) {
            totalTokens += result.tokens;
        }
    }
    
    return totalTokens;
}

const input = fs.readFileSync('day13_input.txt', 'utf8');
console.log(part1(input));
console.log(part2(input));