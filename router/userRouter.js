const { Router } = require("express")

const userRouter = Router()

userRouter.get('/',(req,res)=>{
    res.status(200).json({message:"OK"})
})

module.exports = { userRouter }
