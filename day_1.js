const fs = require('fs');

function calculateTotalDistance(filePath) {
    const file = fs.readFileSync(filePath, 'utf-8');
    const lines = file.trim().split('\n');
    const leftList = [];
    const rightList = [];

    lines.forEach(line => {
        const [left, right] = line.split('   ').map(Number);
        leftList.push(left);
        rightList.push(right);
    });

    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    let totalDistance = 0;
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

function calculateSimilarityScore(filePath) {
    const file = fs.readFileSync(filePath, 'utf-8');
    const lines = file.trim().split('\n');
    const leftList = [];
    const rightList = [];
    lines.forEach(line => {
        const [left, right] = line.split('   ').map(Number);
        leftList.push(left);
        rightList.push(right);
    });

    const rightFrequency = new Map();
    rightList.forEach(num => {
        rightFrequency.set(num, (rightFrequency.get(num) || 0) + 1);
    });

    let similarityScore = 0;
    leftList.forEach(num => {
        const countInRight = rightFrequency.get(num) || 0;
        similarityScore += num * countInRight;
    });

    return similarityScore;
}


const filePath = './day1_input.txt'; 

const similarityScore = calculateSimilarityScore(filePath);
console.log("Similarity Score:", similarityScore);


const totalDistance = calculateTotalDistance(filePath);
console.log("Total Distance:", totalDistance);
