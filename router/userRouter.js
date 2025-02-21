const { Router } = require("express")
const {createUser,getAllUsers,getUser,updateUser,deleteUser} = require("../middlewares/userMid")
const userRouter = Router()

userRouter.get('/',getUser,(req,res)=>{
    res.status(200).json({message:"OK"})
})
userRouter.get('/',getAllUsers,(req,res)=>{
    res.status(200).json({message:"OK"})
})
userRouter.post('/',createUser,(req,res)=>{
    res.status(200).json({message:"OK"})
})
userRouter.patch('/',updateUser,(req,res)=>{
    res.status(200).json({message:"OK"})
})
userRouter.delete('/',deleteUser,(req,res)=>{
    res.status(200).json({message:"OK"})
})

module.exports = { userRouter }
