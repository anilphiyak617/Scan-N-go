


require("./db/mongoose");
const express=require('express');
const app=express();
//!-------PORT
const port = process.env.PORT || 7000;
//--------PARSING incomng data to JSON
app.use(express.json());
//!-------Creating endpoints
app.get('',async (req,res)=>{
console.log(req.query);
res.send("Sucefuslly running")
})

//!-------listening to the port
app.listen(port,()=>{
   console.log(`listening at port ${port}`);
});

//arnold#@game@2020