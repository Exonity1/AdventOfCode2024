const fs = require("fs");
const filePath = "day7_input.txt";

function a(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");
    let totalCalibrationResult = 0;

    function evaluatePossibilities(numbers, target, index = 0, currentValue = numbers[0]) {
        if (index === numbers.length - 1) {
            return currentValue === target;
        }

        const nextNumber = numbers[index + 1];
        return (
            evaluatePossibilities(numbers, target, index + 1, currentValue + nextNumber) ||
            evaluatePossibilities(numbers, target, index + 1, currentValue * nextNumber)
        );
    }

    lines.forEach(line => {
        const [testValuePart, numbersPart] = line.split(":");
        const target = parseInt(testValuePart.trim(), 10);
        const numbers = numbersPart.trim().split(" ").map(Number);

        if (evaluatePossibilities(numbers, target)) {
            totalCalibrationResult += target;
        }
    });

    console.log(totalCalibrationResult);
}

function b(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");
    let totalCalibrationResult = 0;

    function evaluatePossibilities(numbers, target, index = 0, currentValue = numbers[0]) {
        if (index === numbers.length - 1) {
            return currentValue === target;
        }

        const nextNumber = numbers[index + 1];

        // Try addition
        if (evaluatePossibilities(numbers, target, index + 1, currentValue + nextNumber)) {
            return true;
        }

        // Try multiplication
        if (evaluatePossibilities(numbers, target, index + 1, currentValue * nextNumber)) {
            return true;
        }

        // Try concatenation
        const concatenatedValue = parseInt(currentValue.toString() + nextNumber.toString(), 10);
        if (evaluatePossibilities(numbers, target, index + 1, concatenatedValue)) {
            return true;
        }

        return false;
    }

    lines.forEach(line => {
        const [testValuePart, numbersPart] = line.split(":");
        const target = parseInt(testValuePart.trim(), 10);
        const numbers = numbersPart.trim().split(" ").map(Number);

        if (evaluatePossibilities(numbers, target)) {
            totalCalibrationResult += target;
        }
    });

    console.log(totalCalibrationResult);
}

a(filePath); 
b(filePath);