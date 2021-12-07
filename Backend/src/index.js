require("./db/mongoose");
const express = require("express");
const app = express();
const User = require("./models/User");
const userRouter = require("./routers/user-router");
const inventoryRouter = require("./routers/inventory-router");
const bcrypt = require("bcryptjs");
//!-------PORT
const port = process.env.PORT;
//!--------PARSING incomng data to JSON
app.use(express.json());

//!--------ROUTERS
app.use(userRouter);
app.use(inventoryRouter);
//!-------LISTENING to the port
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
//********************************playground
// async function test() {
//   const hashedPassword = await bcrypt.hash("anilphiyak", 8);
//   console.log(hashedPassword);
//   const match = await bcrypt.compare("anilphikyak", hashedPassword);
//   console.log(match);
// }
// test();
