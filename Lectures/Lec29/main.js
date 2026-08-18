const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

const users = [
    {
        id:1,
        name:"girogi"
    }
]

// app.get("/",(req,res) =>{
//     res.json(users)
// })

// app.get("/users/:id",(req,res) =>{
//     const {id} = req.params
//     console.log(id)
// })

// app.get("/users",(req,res) => {
//     // console.log(req.query)
//     const {page,take} = req.query

//     console.log(page)
//     console.log(take)
// })


// app.post("/users",(req,res) => {
//     const {name,age} = req.body
//     console.log(name,age)
// })



app.listen(PORT,()=>{
    console.log(`server runnin on http://localhost:${PORT}`)
})