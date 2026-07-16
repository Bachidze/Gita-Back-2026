const {Router} = require("express")
const userModel = require("../models/users.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authRouter = Router()


authRouter.post("/sign-up",async (req,res) => {
    const {fullName,email,password} = req.body
    // console.log(fullName,email,password)
    // console.log(password,"originalpass")

    if(!fullName || !email || !password){
        return res.status(400).json({message:"სრული სახელი იმეილი და აპროლი აუცილებალდ უნდა ჩწერო"})
    }

    const exsistingUser = await userModel.findOne({email:email})

    if(exsistingUser){
        return res.status(400).json({message:"ასეტი მომხმარებელი უკვე არსებობს სცადეთს სხვა email"})
    }

    const hashedPassword = await bcrypt.hash(password,10)
    // console.log(hashedPassword,"hashedpass")

    await userModel.create({fullName,email,password:hashedPassword})

    res.json({message:"გილოცავთ შენ შექმენი ახალი მომხმარებელი"})
})



authRouter.post("/sign-in",async (req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"email და password აუციელბელია !!!!!"})
    }

    const exsistingUser = await userModel.findOne({email:email})

    if(!exsistingUser){
        return res.status(401).json({message:"არ ხარ ავტორიზირებული"})
    }

    const isEqualPassword = await bcrypt.compare(password,exsistingUser.password)

    if(!isEqualPassword){
        return res.status(400).json({message:"მონაცემები არასწორია"})
    }

    const payload = {
        userId : exsistingUser._id
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"})

    res.json({message:"tokeni",data:token})
})






module.exports = authRouter