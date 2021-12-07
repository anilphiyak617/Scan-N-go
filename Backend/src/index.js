require("./db/mongoose");
const express = require("express");
const app = express();
const User = require("./models/User");
const userRouter = require("./routers/user-router");
//!-------PORT
const port = process.env.PORT;
//!--------PARSING incomng data to JSON
app.use(express.json());

//!--------ROUTERS
app.use(userRouter);
//!-------LISTENING to the port
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
