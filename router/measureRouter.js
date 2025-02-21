const { Router } = require("express")
const  {createMeasure,getMeasure,getAllMeasuresAvg,updateMeasure,deleteMeasure} = require("../middlewares/measureMid")
const measureRouter = Router()

// measureRouter.get('/:userId',getMeasure,(req,res)=>{
//     res.status(200).json({message:"OK"})
// })
// measureRouter.get('/',getAllMeasuresAvg,(req,res)=>{
//     res.status(200).json({message:"OK"})
// })
measureRouter.post('/:userId',createMeasure,(req,res)=>{
    res.status(200).json({message:`Measure has been created successfully, Measure ID: ${req.measureId}`})
})
// measureRouter.patch('/:id',updateMeasure,(req,res)=>{
//     res.status(200).json({message:"OK"})
// })
// measureRouter.delete('/:id',deleteMeasure,(req,res)=>{
//     res.status(200).json({message:"OK"})
// })

module.exports = { measureRouter }
