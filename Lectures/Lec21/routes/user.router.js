const {Router} = require("express")
const usersModel = require("../models/users.model")
const { isValidObjectId } = require("mongoose")

const userRouter = Router()

userRouter.get("/",async (req,res) => {
    const findAllUser = await usersModel.find().select("-password")
    res.json({message:"გილოცავ შენ წარამტებით იპოვე ყველაჩანაწერი",data:findAllUser})
})



userRouter.get("/:id",async (req,res) => {
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({message:"არასწორი მონგოს ID გთხოვთ გამოატანეტ სწორი ID",data:null})
    }

    const findUserById = await usersModel.findById(id).select("-password")

    if(!findUserById){
        return res.status(404).json({message:"ვერ ვიპოვე"})
    }

    res.json({message:"გილოცავ შენ წარამტებით იპოვე ჩანაწერი",data:findUserById})
})


userRouter.delete("/:id",async (req,res) => {
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({message:"არასწორი მონგოს ID გთხოვთ გამოატანეტ სწორი ID",data:null})
    }
    const deletedUser = await usersModel.findByIdAndDelete(id)

    res.json({message:"გილოცავ წარამტებით წაიშალა ჩანაწერი",data:deletedUser})
})



userRouter.put("/:id",async (req,res) => {
    const {id} = req.params
    const {fullName,email,password} = req.body
    // console.log(fullName)
    // console.log(email)
    // console.log(password)

    if(!isValidObjectId(id)){
        return res.status(400).json({message:"არასწორი მონგოს ID გთხოვთ გამოატანეტ სწორი ID",data:null})
    }

    const updateUser = await usersModel.findByIdAndUpdate(id,{fullName,email,password},{new:true}).select("-password")

    res.json({message:"გილოცავ წარმატებით დააფდეითდა ჩნაწერი",data:updateUser})
})



module.exports = userRouter