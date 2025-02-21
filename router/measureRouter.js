const { Router } = require("express")
const  {createMeasure,getMeasure,getAllMeasures,updateMeasure,deleteMeasure,getAllMeasuresAvg} = require("../middlewares/measureMid")
const measureRouter = Router()

measureRouter.get('/:measureId',getMeasure,(req,res)=>{
    res.status(200).json({message:"OK"})
})
measureRouter.get('/all/:userId',getAllMeasures,(req,res)=>{
    res.status(200).json({message:`Found ${req.measureData.length} measure for user id: ${req.params.userId} `,data: req.measureData})
})
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
