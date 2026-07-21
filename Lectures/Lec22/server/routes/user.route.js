const {Router} = require("express")
const usersModel = require("../models/users.model")
const { isValidObjectId } = require("mongoose")
const findAll = require("../servcies/user.service")



const userRouter = Router()




userRouter.get("/",async (req,res) => {
    const findAllUser = await usersModel.find()
    res.json({message:"გილოცავ შენ წარამტებით წამოიღე ყველა მონაცემი ბაზიდან !",data:findAllUser})
})


// userRouter("/",findAll)

userRouter.get("/:id",async (req,res) => {
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({message:"არასწორი id-ა"})
    }
    const findById = await usersModel.findById(id)
    res.json({message:"წარამტება",data:findById})
})


userRouter.delete("/:id",async (req,res) => {
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({message:"არასწორი id-ა"})
    }
    const findbyIDAndDelete = await usersModel.findByIdAndDelete(id)
    res.json({message:"წარამტება",data:findbyIDAndDelete})
})



userRouter.put("/:id",async(req,res) => {
    const {id} = req.params
    const {fullName,email,password} = req.body
    if(!isValidObjectId(id)){
        return res.status(400).json({message:"არასწორი id-ა"})
    }
    const updateUser = await usersModel.findByIdAndUpdate(id,{fullName,email,password},{new:true})
    res.json({message:"წარამტება",data:updateUser})
})






module.exports = userRouter