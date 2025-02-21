const { Router } = require("express")
const {createUser,getAllUsers,getUser,updateUser,deleteUser} = require("../middlewares/userMid")
const userRouter = Router()

userRouter.get('/:id',getUser,(req,res)=>{
    res.status(200).json({message:"OK",data:req.userData})
})
userRouter.get('/all',getAllUsers,(req,res)=>{
    res.status(200).json({message:"OK",data:req.allUsers})
})
userRouter.post('/',createUser,(req,res)=>{
    res.status(200).json({message:`${req.body.fullName}'s has been created and stored in rowID: ${req.userId}.`})
})
userRouter.patch('/:id',updateUser,(req,res)=>{
    res.status(200).json({message:"Changed successfully."})
})
userRouter.delete('/:id',deleteUser,(req,res)=>{
    res.status(200).json({message:"OK"})
})

module.exports = { userRouter }
