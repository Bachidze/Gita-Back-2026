const express = require("express")
const connectToMongo = require("./db/connectToMongo")
const userRouter = require("./routes/user.route")
const authRouter = require("./auth/auth.route")
const isAuth = require("./middlewares/auth.midlleware")
const postsRouter = require("./routes/posts.route")
const app = express()
const PORT = 3030
const cors = require('cors');
app.use(cors())
app.use(express.json())
require("dotenv").config()
connectToMongo()



app.use("/users",userRouter)
app.use("/auth",authRouter)
app.use("/posts",isAuth,postsRouter)




app.get("/",(req,res) => {
    res.json({message:"წარმატებით დარესფონსდა"})
})


app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
})






