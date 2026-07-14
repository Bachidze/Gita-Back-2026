const express = require("express");
const app = express();
const PORT = 3030;
const connectToMongoDB = require("./config/connectToMongo");
const userRouter = require("./api/user.route");
require("dotenv").config();
app.use(express.json());
connectToMongoDB();


app.use("/users",userRouter)

app.get("/", (req, res) => {
  res.json("გავასწორე ერორი");
});



app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
