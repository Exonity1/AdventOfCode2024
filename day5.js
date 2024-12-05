const fs = require("fs");
const filePath = "day5_input.txt";

function a(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const rules = [];
    const updates = [];
    let parsingRules = true;

    for (const line of lines) {
        if (line.trim() === "") {
            parsingRules = false;
            continue;
        }

        if (parsingRules) {
            rules.push(line.trim());
        } else {
            updates.push(line.split(",").map(Number));
        }
    }

    //console.log(updates);

    const graph = new Map();
    for (const rule of rules) {
        const [x, y] = rule.split("|").map(Number);
        if (!graph.has(x)) graph.set(x, new Set());
        graph.get(x).add(y);
    }

    function isValidOrder(update, graph) {
        const relevantGraph = new Map();
        const inDegree = new Map();
        
        for (const node of update) {
            if (!inDegree.has(node)) inDegree.set(node, 0);
            if (graph.has(node)) {
                for (const neighbor of graph.get(node)) {
                    if (update.includes(neighbor)) {
                        if (!relevantGraph.has(node)) relevantGraph.set(node, new Set());
                        relevantGraph.get(node).add(neighbor);
                        inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
                    }
                }
            }
        }

        const zeroInDegree = [];
        for (const node of update) {
            if ((inDegree.get(node) || 0) === 0) {
                zeroInDegree.push(node);
            }
        }

        const topoSorted = [];
        while (zeroInDegree.length > 0) {
            const node = zeroInDegree.shift();
            topoSorted.push(node);
            if (relevantGraph.has(node)) {
                for (const neighbor of relevantGraph.get(node)) {
                    inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                    if (inDegree.get(neighbor) === 0) {
                        zeroInDegree.push(neighbor);
                    }
                }
            }
        }

        return JSON.stringify(topoSorted) === JSON.stringify(update);
    }

    let middleSum = 0;
    for (const update of updates) {
        if (isValidOrder(update, graph)) {
            const middleIndex = Math.floor(update.length / 2);
            middleSum += update[middleIndex];
        }
    }

    console.log(middleSum);
}

function b(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const orderingRules = [];
    const updates = [];
    let inUpdatesSection = false;

    for (const line of lines) {
        if (line.trim() === "") continue;
        if (!line.includes("|") && line.includes(",")) {
            inUpdatesSection = true;
        }
        if (!inUpdatesSection) {
            orderingRules.push(line.trim());
        } else {
            updates.push(line.trim().split(",").map(Number));
        }
    }

    const graph = {};
    for (const rule of orderingRules) {
        const [x, y] = rule.split("|").map(Number);
        if (!graph[x]) graph[x] = new Set();
        graph[x].add(y);
    }

    function topologicalSort(update) {
        const relevantGraph = {};
        const inDegree = {};

        for (const node of update) {
            if (graph[node]) {
                relevantGraph[node] = new Set();
                for (const neighbor of graph[node]) {
                    if (update.includes(neighbor)) {
                        relevantGraph[node].add(neighbor);
                        inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
                    }
                }
            }
            if (!(node in inDegree)) inDegree[node] = 0;
        }

        const sorted = [];
        const zeroInDegree = [];
        for (const node of update) {
            if (inDegree[node] === 0) zeroInDegree.push(node);
        }

        while (zeroInDegree.length > 0) {
            const node = zeroInDegree.shift();
            sorted.push(node);
            if (relevantGraph[node]) {
                for (const neighbor of relevantGraph[node]) {
                    inDegree[neighbor]--;
                    if (inDegree[neighbor] === 0) zeroInDegree.push(neighbor);
                }
            }
        }

        return sorted;
    }

    function isValidOrder(update) {
        const sorted = topologicalSort(update);
        return sorted.length === update.length && sorted.every((val, idx) => val === update[idx]);
    }

    let middleSum = 0;
    for (const update of updates) {
        if (!isValidOrder(update)) {
            const correctedOrder = topologicalSort(update);
            const middleIndex = Math.floor(correctedOrder.length / 2);
            middleSum += correctedOrder[middleIndex];
        }
    }

    console.log(middleSum);
}

a(filePath);
b(filePath);

