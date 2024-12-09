const fs = require("fs");
const filePath = "day9_input.txt";

function a(filePath) {

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");

    function parseDiskMap(diskMap) {
        // Split into alternating file and space lengths
        const fileLengths = [];
        const spaceLengths = [];
        
        for (let i = 0; i < diskMap.length; i++) {
            if (i % 2 === 0) {
                fileLengths.push(parseInt(diskMap[i]));
            } else {
                spaceLengths.push(parseInt(diskMap[i]));
            }
        }
        
        if (spaceLengths.length < fileLengths.length) {
            spaceLengths.push(0); // Handle case where map ends with file
        }
        
        return [fileLengths, spaceLengths];
    }

    function createDiskState(fileLengths, spaceLengths) {
        const state = [];
        let fileId = 0;
        
        for (let i = 0; i < fileLengths.length; i++) {
            const fileLen = fileLengths[i];
            const spaceLen = spaceLengths[i];
            
            // Add file blocks
            state.push(...Array(fileLen).fill(fileId));
            
            // Add free space
            state.push(...Array(spaceLen).fill('.'));
            
            fileId++;
        }
        
        return state;
    }

    function findRightmostFile(state) {
        for (let i = state.length - 1; i >= 0; i--) {
            if (state[i] !== '.') {
                return i;
            }
        }
        return -1;
    }

    function findLeftmostSpace(state) {
        for (let i = 0; i < state.length; i++) {
            if (state[i] === '.') {
                return i;
            }
        }
        return -1;
    }

    function compactDisk(state) {
        while (true) {
            const rightFile = findRightmostFile(state);
            const leftSpace = findLeftmostSpace(state);
            
            if (leftSpace === -1 || leftSpace > rightFile) {
                break;
            }
            
            // Move one block from right to left
            state[leftSpace] = state[rightFile];
            state[rightFile] = '.';
        }
    }

    function calculateChecksum(state) {
        let checksum = 0;
        
        state.forEach((value, pos) => {
            if (value !== '.') {
                checksum += pos * value;
            }
        });
        
        return checksum;
    }

    function solve(diskMap) {
        // Parse input
        const [fileLengths, spaceLengths] = parseDiskMap(diskMap);
        
        // Create initial state
        const state = createDiskState(fileLengths, spaceLengths);
        
        // Compact the disk
        compactDisk(state);
        
        // Calculate and return checksum
        return calculateChecksum(state);
    }

    const testInput = lines[0];
    console.log(solve(testInput));
}

function b(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");
    function parseDiskMap(diskMap) {
        const fileLengths = [];
        const spaceLengths = [];
    
        for (let i = 0; i < diskMap.length; i += 2) {
            fileLengths.push(parseInt(diskMap[i], 10));
            if (i + 1 < diskMap.length) {
                spaceLengths.push(parseInt(diskMap[i + 1], 10));
            }
        }
    
        if (spaceLengths.length < fileLengths.length) {
            spaceLengths.push(0);
        }
    
        return { fileLengths, spaceLengths };
    }
    
    function createDiskState(fileLengths, spaceLengths) {
        const state = [];
        let fileId = 0;
    
        for (let i = 0; i < fileLengths.length; i++) {
            state.push(...Array(fileLengths[i]).fill(fileId));
            state.push(...Array(spaceLengths[i]).fill('.'));
            fileId++;
        }
    
        return state;
    }
    
    function findFileBlocks(state, fileId) {
        return state.reduce((indices, value, index) => {
            if (value === fileId) indices.push(index);
            return indices;
        }, []);
    }
    
    function findFreeSpaceSpans(state) {
        const spans = [];
        let start = null;
    
        state.forEach((value, index) => {
            if (value === '.' && start === null) {
                start = index;
            } else if (value !== '.' && start !== null) {
                spans.push([start, index - start]);
                start = null;
            }
        });
    
        if (start !== null) {
            spans.push([start, state.length - start]);
        }
    
        return spans;
    }
    
    function moveFile(state, fileBlocks, targetPos) {
        const fileId = state[fileBlocks[0]];
        const fileSize = fileBlocks.length;
    
        // Clear original positions
        fileBlocks.forEach(pos => {
            state[pos] = '.';
        });
    
        // Place file in new position
        for (let i = 0; i < fileSize; i++) {
            state[targetPos + i] = fileId;
        }
    }
    
    function compactDisk(state) {
        const maxFileId = Math.max(...state.filter(x => x !== '.'));
    
        for (let fileId = maxFileId; fileId >= 0; fileId--) {
            const fileBlocks = findFileBlocks(state, fileId);
            if (fileBlocks.length === 0) continue;
    
            const fileSize = fileBlocks.length;
            const leftmostPos = Math.min(...fileBlocks);
    
            const spans = findFreeSpaceSpans(state);
            let suitableSpan = null;
    
            for (const [start, size] of spans) {
                if (start < leftmostPos && size >= fileSize) {
                    suitableSpan = start;
                    break;
                }
            }
    
            if (suitableSpan !== null) {
                moveFile(state, fileBlocks, suitableSpan);
            }
        }
    }
    
    function calculateChecksum(state) {
        return state.reduce((checksum, value, pos) => {
            if (value !== '.') {
                checksum += pos * value;
            }
            return checksum;
        }, 0);
    }
    
    function solve(diskMap) {
        const { fileLengths, spaceLengths } = parseDiskMap(diskMap);
        const state = createDiskState(fileLengths, spaceLengths);
        compactDisk(state);
        return calculateChecksum(state);
    }
    
    // Test with example
    const testInput = lines[0];
    console.log(solve(testInput));
}






a(filePath); 
b(filePath);


