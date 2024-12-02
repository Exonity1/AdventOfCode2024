const fs = require("fs");
const filePath = "day2_input.txt"; 

function countSafeReports(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const reports = data.trim().split("\n").map(line => line.split(" ").map(Number));

    
    const isSafe = (report) => {
        const differences = [];
        for (let i = 0; i < report.length - 1; i++) {
            differences.push(report[i + 1] - report[i]);
        }

        
        if (!differences.every(diff => (diff >= -3 && diff <= -1) || (diff >= 1 && diff <= 3))) {
            return false;
        }

    
        const allPositive = differences.every(diff => diff > 0);
        const allNegative = differences.every(diff => diff < 0);

        return allPositive || allNegative;
    };

    return reports.filter(isSafe).length;
}

function countSafeReportsWithDampener(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const reports = data.trim().split("\n").map(line => line.split(" ").map(Number));

    const isSafe = (report) => {
        const differences = [];
        for (let i = 0; i < report.length - 1; i++) {
            differences.push(report[i + 1] - report[i]);
        }

        
        if (!differences.every(diff => (diff >= -3 && diff <= -1) || (diff >= 1 && diff <= 3))) {
            return false;
        }

    
        const allPositive = differences.every(diff => diff > 0);
        const allNegative = differences.every(diff => diff < 0);

        return allPositive || allNegative;
    };

    
    const isSafeWithDampener = (report) => {
        if (isSafe(report)) return true; 

        for (let i = 0; i < report.length; i++) {
            const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
            if (isSafe(modifiedReport)) {
                return true;
            }
        }

        return false; 
    };

    
    return reports.filter(isSafeWithDampener).length;
}




console.log(`Safe reports: ${countSafeReports(filePath)}`);
console.log(`Safe reports with Problem Dampener: ${countSafeReportsWithDampener(filePath)}`);