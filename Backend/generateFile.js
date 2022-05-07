const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require("child_process").exec);
const {v4: uuid} = require('uuid');
const dirCodes = path.join();

if(!fs.existsSync(dirCodes)){
     fs.mkdirSync(dirCodes, {recursive: true})
}


const generateFile = ( format, code, contId )=>{
    const filename=`test.${format}`;
    const filepath = path.join(__dirname, "codes", filename);

    fs.writeFileSync(filepath, code);
    // return filepath;
    return new Promise((resolve, reject)=>{
    exec(`docker cp ./codes/test.cpp ${contId}:/usr/src/app/test.cpp`).then(()=>{
        console.log("File Generated");
        resolve();
    })
    })
}

module.exports.generateFile = generateFile;