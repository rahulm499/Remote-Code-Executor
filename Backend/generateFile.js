const fs = require('fs');
const path = require('path');

const {v4: uuid} = require('uuid');
const dirCodes = path.join();

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true})
}

const generateFile = ( format, code )=>{
    const filename=`test.${format}`;
    const filepath = path.join(__dirname, "codes", filename);

    fs.writeFileSync(filepath, code);
    return filepath;
}

module.exports.generateFile = generateFile;