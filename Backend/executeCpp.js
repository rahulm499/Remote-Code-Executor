const fs = require('fs');
const util = require('util');
const exec = util.promisify(require("child_process").exec);
const path = require('path');

const outputPath = path.join(__dirname, "output");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true})
}

const executeCpp = (input, contId)=>{
    return new Promise((resolve, reject)=>{
        //const jobId = path.basename(filepath).split(".")[0];
       // const outPath = path.join(outputPath, `${jobId}.out`)
    
        exec(`docker exec ${contId} bash -c "g++ test.cpp -o test.out && echo ${input} | ./test.out"`).then((resp)=>{
            console.log("Execute Cpp");
            
            console.log(resp);
            exec(`docker stop ${contId}`).then(()=>{
                exec(`docker rm ${contId}`)
                console.log("Docker Removed");
            });
            
            resolve(resp.stdout);
            
        });
        //exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && echo ${input} | ./${jobId}.out`,
        //exec(`python3 ${filepath}`,
    })
}

module.exports.executeCpp = executeCpp;