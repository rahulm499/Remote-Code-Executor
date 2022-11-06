const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require("child_process").exec);
var hat = require('hat')
const dirCodes = path.join();

if(!fs.existsSync(dirCodes)){
     fs.mkdirSync(dirCodes, {recursive: true})
}


const generateFile = ( format, code, contId )=>{
    var jobId = hat()
    jobId = jobId.substr(0, 7)
    console.log(jobId)
    const filename=`${jobId}.${format}`;
    const filepath = path.join(__dirname, "codes", filename);
    fs.writeFileSync(filepath, code);
    // return filepath;
    return new Promise(async (resolve, reject)=>{
      await exec(`sudo docker cp ./codes/${jobId}.cpp ${contId}:/usr/src/app/${jobId}.cpp`).then(()=>{
        console.log("File Generated");
        resolve(jobId);
    })
    })
}

module.exports.generateFile = generateFile;