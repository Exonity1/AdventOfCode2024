const fs = require("fs");
const filePath = "day11_input.txt";

function a(filePath) {
    function processStone(num) {
        if (typeof num !== 'number') {
            throw new Error('Input must be a number');
        }
    
        if (num === 0) return [1];
        
        const numStr = num.toString();
        if (numStr.length % 2 === 0) {
            const mid = numStr.length / 2;
            const left = parseInt(numStr.slice(0, mid));
            const right = parseInt(numStr.slice(mid));
            return [left, right];
        }
        
        return [num * 2024];
    }
    
    function processBlink(stones) {
        if (!Array.isArray(stones)) {
            throw new Error('Input must be an array');
        }
        
        let newStones = [];
        for (const stone of stones) {
            newStones.push(...processStone(stone));
        }
        return newStones;
    }
    
    function solve(filePath) {
        try {
            const data = fs.readFileSync(filePath, "utf8");
            let stones = data.trim().split(/\s+/).map(Number);
            
            if (stones.some(isNaN)) {
                throw new Error('Invalid input: all values must be numbers');
            }
    
            // Changed from 25 to 75 blinks
            for (let i = 0; i < 25; i++) {
                stones = processBlink(stones);
            }
            
            return stones.length;
        } catch (error) {
            console.error('Error:', error.message);
            return -1;
        }
    }
    
    console.log(solve(filePath));
}

function b(filePath) {
    function f(c, i, cache) {
        // Base case
        if (i === 0) {
            return 1;
        }

        // Check cache
        const cacheKey = `${c},${i}`;
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        let result;
        if (c === 0) {
            result = f(1, i - 1, cache);
        } else {
            const numStr = c.toString();
            if (numStr.length % 2 === 0) {
                const mid = numStr.length / 2;
                const left = parseInt(numStr.slice(0, mid)) || 0;
                const right = parseInt(numStr.slice(mid)) || 0;
                result = f(left, i - 1, cache) + f(right, i - 1, cache);
            } else {
                result = f(c * 2024, i - 1, cache);
            }
        }

        cache.set(cacheKey, result);
        return result;
    }

    function solve(filepath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }

                const numbers = data.trim().split(/\s+/).map(Number);
                const cache = new Map();
                const result = numbers.reduce((sum, num) => sum + f(num, 75, cache), 0);

                resolve(result);
            });
        });
    }

    solve(filePath).then(console.log).catch(console.error);
}

a(filePath);
b(filePath);