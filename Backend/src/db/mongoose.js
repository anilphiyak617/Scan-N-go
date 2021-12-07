const mongoose=require('mongoose');
const chalk=require('chalk');
//!Connecting to the MongoDB server
mongoose.connect("mongodb://localhost:27017/Scan-N-go-api",{
   // useUrlparser:true,
   // useCreateIndex:true,
}).then(result=>{
    console.log(chalk`{inverse {green  Connected}}`);
})
.catch(err=>{
    console.log(err);
})