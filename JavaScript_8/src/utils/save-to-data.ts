
// In src/database/utils.js
import fs from 'fs';

export const saveToData = (Data: any) => {
    fs.writeFileSync(
        './src/data/data.json',
        JSON.stringify(Data, null, 2),
        {
            encoding: 'utf-8',
        }
    );
};
