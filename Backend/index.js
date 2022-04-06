const express = require('express')
const { generateFile }= require('./generateFile');
const { executeCpp } = require('./executeCpp');
const app=express();
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.get('/', (req, res)=>{
   return res.json({hello: "world"});
})

app.post('/run', async (req, res)=>{
    const {language="cpp", code, input}=req.body;
    if(code === undefined){
        return res.status(400).json({success: false, error: "Empty code body"})
    }
    try{
    const filepath = await generateFile(language, code)
    const output = await executeCpp(filepath, input);
    console.log(output);
    return res.json({filepath, output});
    } catch(err){
        res.status(500).json({err: err.stderr});
    }
})

app.listen(5000, ()=>{
    console.log("Listening to 5000")
})