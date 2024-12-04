const fs = require("fs");
const filePath = "day4_input.txt";

function a(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");
    const array2D = lines.map(line => line.split(""));
    //console.log(array2D[0].length);


    let cntXMAS = 0;
    const rows = array2D.length;
    const cols = array2D[0].length;
    const word = "XMAS";
    const wordLength = word.length;
    

    const directions = [
        [0, 1],   
        [0, -1],  
        [1, 0],   
        [-1, 0],  
        [1, 1],   
        [1, -1],  
        [-1, 1],  
        [-1, -1]  
    ];


    function isWordAt(row, col, direction) {
        for (let i = 0; i < wordLength; i++) {
            const newRow = row + direction[0] * i;
            const newCol = col + direction[1] * i;
            
            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
                return false;
            }

            if (array2D[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            for (const direction of directions) {
                if (isWordAt(i, j, direction)) {
                    cntXMAS++;
                }
            }
        }
    }

    console.log(cntXMAS);

}


function b(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n").filter(line => line.trim() !== "");
    const array2D = lines.map(line => line.split(""));

    const rows = array2D.length;
    const cols = array2D[0].length;
    let cntXMAS = 0;

    const wordMAS = "MAS";
    const wordSAM = "SAM";

    function isXMASAt(row, col) {
        if (array2D[row][col] !== "A") return false;

        if (row - 1 < 0 || row + 1 >= rows || col - 1 < 0 || col + 1 >= cols) {
            return false;
        }

        const diag1 = array2D[row - 1][col - 1] + array2D[row][col] + array2D[row + 1][col + 1];
        const diag2 = array2D[row + 1][col - 1] + array2D[row][col] + array2D[row - 1][col + 1];

        return (
            (diag1 === wordMAS && diag2 === wordMAS) ||
            (diag1 === wordSAM && diag2 === wordSAM) ||
            (diag1 === wordMAS && diag2 === wordSAM) ||
            (diag1 === wordSAM && diag2 === wordMAS)
        );
    }

    for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
            if (isXMASAt(i, j)) {
                cntXMAS++;
            }
        }
    }

    console.log(cntXMAS);
}


a(filePath);
b(filePath);