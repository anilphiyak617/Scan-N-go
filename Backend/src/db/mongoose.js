const mongoose = require("mongoose");
//!Connecting to the MongoDB server
mongoose
  .connect(process.env.MONGODB_URL, {
    // useUrlparser:true,
    // useCreateIndex:true,
  })
  .then((result) => {
    console.log("--------------------connected");
  })
  .catch((err) => {
    console.log(err);
  });
