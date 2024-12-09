const fs = require("fs");
const filePath = "day8_input.txt";

// Read the input map from the file
const input = fs.readFileSync(filePath, "utf-8").trim().split("\n");

// Map dimensions
const rows = input.length;
const cols = input[0].length;

// Step 1: Parse the input map
const grid = new Map();
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const char = input[i][j];
    if (char !== '.') {
      grid.set([i, j], char);
    }
  }
}

// Helper function to generate combinations of pairs from an array
function combinations(arr, r) {
  const results = [];
  const data = Array(r);
  function _combinations(start, index) {
    if (index === r) {
      results.push(data.slice());
      return;
    }
    for (let i = start; i < arr.length; i++) {
      data[index] = arr[i];
      _combinations(i + 1, index + 1);
    }
  }
  _combinations(0, 0);
  return results;
}

// Step 2 & 3: Find antennae positions and calculate antinodes for part 1
function part1() {
  const antennae = new Map();
  grid.forEach((c, p) => {
    if (c !== '.') {
      if (!antennae.has(c)) {
        antennae.set(c, []);
      }
      antennae.get(c).push(p);
    }
  });

  const pos = new Set();

  for (const [_, ps] of antennae.entries()) {
    const pairs = combinations(ps, 2);
    for (const [a, b] of pairs) {
      const antinode1 = [b[0] + (b[0] - a[0]), b[1]];
      const antinode2 = [a[0] + (a[0] - b[0]), a[1]];
      pos.add(antinode1.join(','));
      pos.add(antinode2.join(','));
    }
  }

  return Array.from(pos).filter(p => grid.has(p.split(',').map(Number))).length;
}

// Step 4 & 5: Find antennae positions and calculate antinodes for part 2
function part2() {
  const antennae = new Map();
  grid.forEach((c, p) => {
    if (c !== '.') {
      if (!antennae.has(c)) {
        antennae.set(c, []);
      }
      antennae.get(c).push(p);
    }
  });

  const pos = new Set();

  for (const [_, ps] of antennae.entries()) {
    const pairs = combinations(ps, 2);
    for (const [a, b] of pairs) {
      const diff = [b[0] - a[0], b[1] - a[1]];
      const divisor = gcd(diff[0], diff[1]);
      let step = [diff[0] / divisor, diff[1] / divisor];

      while (grid.has(b.join(','))) {
        pos.add(b.join(','));
        b = [b[0] + step[0], b[1] + step[1]];
      }

      while (grid.has(a.join(','))) {
        pos.add(a.join(','));
        a = [a[0] - step[0], a[1] - step[1]];
      }
    }
  }

  return pos.size;
}

// GCD function for differences in positions
function gcd(a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
