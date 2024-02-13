
// In src/database/utils.js
const fs = require('fs');

const saveToData = (Data) => {
    fs.writeFileSync(
        './src/data/data.json',
        JSON.stringify(Data, null, 2),
        {
            encoding: 'utf-8',
        }
    );
};

module.exports = { saveToData };