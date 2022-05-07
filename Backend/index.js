const express = require('express')
const { generateFile }= require('./generateFile');
const { executeCpp } = require('./executeCpp');
const util = require('util');
const exec = util.promisify(require("child_process").exec);
const app=express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

const dockerInit = ()=>{
    return new Promise((resolve, reject)=>{
     exec(`docker run -d -it cpp:latest /bin/bash`).then((res)=>{
        console.log(res.stdout);
      
        resolve(res.stdout.substring(0, 12));
    })
    })
}


app.get('/', (req, res)=>{
   return res.json({Message: "Send the code"});
})

app.post('/run', async (req, res)=>{
    const {language="cpp", code, input}=req.body;
    if(code === undefined){
        return res.status(400).json({success: false, error: "Empty code body"})
    }
    try{
    const contId=await dockerInit();

    await generateFile(language, code, contId);
    const output=await executeCpp(input, contId);
    return res.json({output});

    //console.log(output);
    
    } catch(err){
        res.status(500).json({err: err.stderr});
    }
})


app.listen(5000, ()=>{
    console.log("Listening to 5000")
})