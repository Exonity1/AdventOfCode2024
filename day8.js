const fs = require('fs');
const filePath = 'day8_input.txt';

class Tuple extends Array {
    add(other) {
        return new Tuple(...this.map((x, i) => x + other[i]));
    }
    
    subtract(other) {
        return new Tuple(...this.map((x, i) => x - other[i]));
    }
    
    floorDiv(n) {
        return new Tuple(...this.map(x => Math.floor(x / n)));
    }
    
    toString() {
        return `${this[0]},${this[1]}`;
    }
}


function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function* combinations(arr, r) {
    if (r === 1) {
        for (const item of arr) {
            yield [item];
        }
        return;
    }
    for (let i = 0; i < arr.length - r + 1; i++) {
        for (const combo of combinations(arr.slice(i + 1), r - 1)) {
            yield [arr[i], ...combo];
        }
    }
}

function part1(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.trim().split('\n');
    
    const grid = new Map();
    const antennae = new Map();
    
    lines.forEach((row, i) => {
        [...row].forEach((c, j) => {
            const pos = new Tuple(i, j);
            grid.set(pos.toString(), c);
            if (c !== '.') {
                if (!antennae.has(c)) antennae.set(c, []);
                antennae.get(c).push(pos);
            }
        });
    });
    
    const pos = new Set();
    
    for (const [_, ps] of antennae) {
        for (const [a, b] of combinations(ps, 2)) {
            const diff = b.subtract(a);
            pos.add(b.add(diff).toString());
            pos.add(a.subtract(diff).toString());
        }
    }
    console.log([...pos].filter(p => grid.has(p)).length);
}

function part2(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.trim().split('\n');
    
    const grid = new Map();
    const antennae = new Map();
    
    lines.forEach((row, i) => {
        [...row].forEach((c, j) => {
            const pos = new Tuple(i, j);
            grid.set(pos.toString(), c);
            if (c !== '.') {
                if (!antennae.has(c)) antennae.set(c, []);
                antennae.get(c).push(pos);
            }
        });
    });
    
    const pos = new Set();
    
    for (const [_, ps] of antennae) {
        for (const [a, b] of combinations(ps, 2)) {
            let diff = b.subtract(a);
            const gcdVal = gcd(...diff);
            diff = diff.floorDiv(gcdVal);
            
            let currentB = new Tuple(...b);
            while (grid.has(currentB.toString())) {
                pos.add(currentB.toString());
                currentB = currentB.add(diff);
            }
            
            let currentA = new Tuple(...a);
            while (grid.has(currentA.toString())) {
                pos.add(currentA.toString());
                currentA = currentA.subtract(diff);
            }
        }
    }
    
    console.log(pos.size);
}

part1(filePath);
part2(filePath);