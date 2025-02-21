const { Router } = require("express")
const  {createMeasure,getMeasure,getAllMeasures,updateMeasure,deleteMeasure} = require("../middlewares/measureMid")
const measureRouter = Router()

measureRouter.get('/:id',getMeasure,(req,res)=>{
    res.status(200).json({message:"OK"})
})
measureRouter.get('/',getAllMeasures,(req,res)=>{
    res.status(200).json({message:"OK"})
})
measureRouter.post('/',createMeasure,(req,res)=>{
    res.status(200).json({message:"OK"})
})
measureRouter.patch('/:id',updateMeasure,(req,res)=>{
    res.status(200).json({message:"OK"})
})
measureRouter.delete('/:id',deleteMeasure,(req,res)=>{
    res.status(200).json({message:"OK"})
})

module.exports = { measureRouter }
