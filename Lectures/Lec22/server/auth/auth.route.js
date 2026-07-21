const {Router} = require("express")
const { model } = require("mongoose")
const usersModel = require("../models/users.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




const authRouter = Router()

authRouter.post("/sign-up",async (req,res) => {
    const {fullName,email,password} = req.body
    if(!fullName || !email || !password){
        return res.status(400).json({message:"სახელი-გვარი,იმეილი და პაროლი აუცილებელია !!!!"})
    }
    console.log(password)
    const exsistingUser = await usersModel.findOne({email:email})
    if(exsistingUser){
        return res.status(400).json({message:"ასეთი მომხმარებელი უკვე არის"})
    }
    const hashedPass = await bcrypt.hash(password,10)

    await usersModel.create({fullName,email,password:hashedPass})

    res.json({message:"გილოცავ წარმატებით დაემატა მომხმარებელი"})
})


authRouter.post("/sign-in",async (req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"იმეილი და პაროლი აუცილებელია !!!!"})
    }
    const exsistingUser = await usersModel.findOne({email:email})

    if(!exsistingUser){
        return res.status(400).json({message:"ასეთი მომხმარებელი არ არის რეგისტრირებული"})
    }
    const isEqualPass = await bcrypt.compare(password,exsistingUser.password)

    if(!isEqualPass){
        return res.status(401).json({message:"invalid credentials"})
    }

    const payload = {
        userId:exsistingUser._id
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"})

    res.json({message:"ტოკენი",data:token})
})

module.exports = authRouter