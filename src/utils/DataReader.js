import fs from 'fs';

function readJsonFile(filePath) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}

module.exports = {
    readJsonFile
}