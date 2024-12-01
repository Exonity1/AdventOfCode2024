const fs = require('fs');

function a(filePath) {
    const file = fs.readFileSync(filePath, 'utf-8');
    const lines = file.trim().split('\n');


    
}