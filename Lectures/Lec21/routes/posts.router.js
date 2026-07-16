const {Router} = require("express")
const postsModel = require("../models/posts.model")




const postsRouter = Router()


postsRouter.get("/",async(req,res) => {
    const findAllPosts = await postsModel.find()
    res.json({message:"გილოცავ შენ წარამტებით იპოვე ყველა პოსტი",data:findAllPosts})
})



module.exports = postsRouter