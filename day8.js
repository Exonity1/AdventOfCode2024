const fs = require("fs");
const filePath = "day8_input.txt";

function a(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");

    const map = lines.map(line => line.split(""));
    const rows = map.length;
    const cols = map[0].length;

    //console.log(map)
    //copy map into antinodesMap

    let antinodesMap = map.map(row => row.slice())
    //console.log(antinodesMap)

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if(map[r][c] !== "." && map[r][c] !== "#"){
                antinodesMap = createAntinodes(antinodesMap,r,c)
            }
        }
    }

    function getDistanceVector(a,b) {
        return [b[0]-a[0], b[1]-a[1]]
    }

    function createAntinodes(map,a,b){
        let currentValue = map[a][b];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (map[r][c] == currentValue) {
                    let distance = getDistanceVector([a, b], [r, c]);
                    let newR1 = r + distance[0];
                    let newC1 = c + distance[1];
                    let newR2 = r - distance[0];
                    let newC2 = c - distance[1];

                    if (newR1 >= 0 && newR1 < rows && newC1 >= 0 && newC1 < cols) {
                        map[newR1][newC1] = '#';
                    }
                    if (newR2 >= 0 && newR2 < rows && newC2 >= 0 && newC2 < cols) {
                        map[newR2][newC2] = '#';
                    }
                }
            }
        }
        return map;
    }

    let uniqueAntinodes = new Set();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (antinodesMap[r][c] == '#') {
                uniqueAntinodes.add(`${r},${c}`);
            }
        }
    }

    console.log(uniqueAntinodes.size);



}

a(filePath);