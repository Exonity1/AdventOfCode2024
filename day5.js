const fs = require("fs");
const filePath = "day5_input.txt";

function a(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");


}

a(filePath);