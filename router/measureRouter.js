const { Router } = require("express")
const { createMeasure, getMeasure, getAllMeasuresById, getAllMeasures, updateMeasure, deleteMeasure, getAllMeasuresAvg, getAvgByMonth } = require("../middlewares/measureMid")
const { getAllUsers } = require("../middlewares/userMid")

const measureRouter = Router()


measureRouter.post('/avg/:userId', getAllMeasuresAvg, (req, res) => {
    res.status(200).json({ message: "Avg data found.", data: req.measureData })
})

measureRouter.get('/avg/:month', getAllUsers, getAvgByMonth, (req, res) => {
    res.status(200).json({ message: "Avg data found.", data: req.measuresAvg })
})

measureRouter.get('/all', getAllMeasures, (req, res) => {

    res.status(200).json({ message: "All measures found.", data: req.allMeasures })
})

measureRouter.get('/all/:userId', getAllMeasuresById, (req, res) => {

    res.status(200).json({ message: `Found ${req.measureData.length} measure for user id: ${req.params.userId} `, data: req.measureData })
})


measureRouter.get('/:measureId', getMeasure, (req, res) => {
    res.status(200).json({ message: "Found measure", data: req.measureData })
})

measureRouter.post('/:userId', createMeasure, (req, res) => {
    res.status(200).json({ message: `Measure has been created successfully, Measure ID: ${req.measureId}` })
})
measureRouter.patch('/:measureId', updateMeasure, (req, res) => {
    res.status(200).json({ message: "Updated successfully" })
})
measureRouter.delete('/:measureId', deleteMeasure, (req, res) => {
    res.status(200).json({ message: "Deleted successfully" })
})

module.exports = { measureRouter }
