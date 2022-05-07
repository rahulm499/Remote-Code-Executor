const fs = require('fs');
const {exec} = require("child_process");
const path = require('path');

const outputPath = path.join(__dirname, "output");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true})
}

const executeCpp = (filepath, input)=>{
    return new Promise((resolve, reject)=>{
        const jobId = path.basename(filepath).split(".")[0];
        const outPath = path.join(outputPath, `${jobId}.out`)
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && echo ${input} | ./${jobId}.out`,
        //exec(`python3 ${filepath}`,
        (error, stdout, stderr)=>{
            
            error && reject({error, stderr});
            stderr && reject(stderr);
            resolve(stdout);
        });
    });
}

module.exports.executeCpp = executeCpp;