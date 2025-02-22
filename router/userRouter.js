const { Router } = require("express")
const {createUser,getAllUsers,getUser,updateUser,deleteUser} = require("../middlewares/userMid")
const userRouter = Router()



userRouter.get('/all',getAllUsers,(req,res)=>{
    res.status(200).json({message:"Users list reached",data:req.allUsers})
})
userRouter.get('/:id',getUser,(req,res)=>{
    res.status(200).json({message:"Found user by id",data:req.userData})
})

userRouter.post('/',createUser,(req,res)=>{
    res.status(200).json({message:`${req.body.fullName}'s has been created and stored in rowID: ${req.userId}.`})
})
userRouter.patch('/:id',updateUser,getAllUsers,(req,res)=>{
    res.status(200).json({message:"User name has been changed successfully.",data:req.allUsers})
})
userRouter.delete('/:id',deleteUser,getAllUsers,(req,res)=>{
    res.status(200).json({message:"User has been deleted successfully.",data:req.allUsers})
})

module.exports = { userRouter }
