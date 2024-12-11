const fs = require("fs");
const filePath = "day12_input.txt";

function a(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");
    const grid = lines.map(line => line.split('').map(Number));


}