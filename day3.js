const fs = require("fs");
const filePath = "day3_input.txt";

function a(filePath) {
    
    const content = fs.readFileSync(filePath, "utf8");

    
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    let match;
    let totalSum = 0;

   
    while ((match = regex.exec(content)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);

        totalSum += x * y;
    }

    console.log(totalSum);
    return totalSum;
}

function b(filePath) {
    
    const content = fs.readFileSync(filePath, "utf8");

    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

    let doEnabled = true; 
    let totalSum = 0;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
        
        if (match[0] === "do()") {
            doEnabled = true; 
        } else if (match[0] === "don't()") {
            doEnabled = false; 
        } else if (match[0].startsWith("mul(") && doEnabled) {
            
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);
            totalSum += x * y;
        }
    }

    console.log(totalSum);
    return totalSum;
}

a(filePath);
b(filePath);
