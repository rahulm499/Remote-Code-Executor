const fs = require('fs');
const util = require('util');
const exec = util.promisify(require("child_process").exec);
const path = require('path');

const outputPath = path.join(__dirname, "output");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true})
}

const executeCpp = (input, contId, jobId, language)=>{
    return new Promise(async (resolve, reject)=>{
        //const jobId = path.basename(filepath).split(".")[0];
       // const outPath = path.join(outputPath, `${jobId}.out`)
    
        return await exec(`sudo docker exec ${contId} bash -c "g++ ${jobId}.cpp -o ${jobId}.out && echo ${input} | ./${jobId}.out"`).then((resp)=>{
            console.log("Execute Cpp");
            resolve(resp.stdout);
        }).catch(err => {
            console.log("Error Found", err);
            reject(err)
        }).finally(()=>{
            exec(`sudo docker stop ${contId}`).then(()=>{
                exec(`sudo docker rm ${contId}`)
                console.log("Docker Removed");
            });
        });
        //exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && echo ${input} | ./${jobId}.out`,
        //exec(`python3 ${filepath}`,
    })
}

module.exports.executeCpp = executeCpp;