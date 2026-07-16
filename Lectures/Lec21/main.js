const express = require("express")
const ConnectToMongo = require("./db/connectToMongo")
const userRouter = require("./routes/user.router")
// const authRouter = require("./auth/auth.router")
const postsRouter = require("./routes/posts.router")
const authRouter = require("./auth/auth.router")
const isAuth = require("./middleware/isAuth.middleWare")
const app = express()
const PORT = 3030
app.use(express.json())
require("dotenv").config()
ConnectToMongo()


app.get("/",(req,res) => {
    res.json("this is / request")
})

app.use("/users",userRouter)
app.use("/auth",authRouter)
app.use("/posts",isAuth,postsRouter)


app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
})