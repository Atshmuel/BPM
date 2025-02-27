const { Router } = require("express")
const { createMeasure, getMeasure, getAllMeasuresById, getAllMeasures, updateMeasure, deleteMeasure, getAllMeasuresAvg, getAvgByMonth } = require("../middlewares/measureMid")
const { getAllUsers } = require("../middlewares/userMid")

const measureRouter = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Measure:
 *       type: object
 *       required:
 *         - user_id
 *         - date
 *         - syst_high
 *         - dias_low
 *         - pulse
 *       properties:
 *         id:
 *           type: integer
 *           description: Measure ID
 *         user_id:
 *           type: integer
 *           description: User ID refs to users table
 *         date:
 *           type: string
 *           format: date
 *           description: Measurement date in YYYY-MM-DD format
 *         syst_high:
 *           type: integer
 *           description: Systolic value
 *         dias_low:
 *           type: integer
 *           description: Diastolic value
 *         pulse:
 *           type: integer
 *           description: Pulse per minute
 *     MeasureCreate:
 *       type: object
 *       required:
 *         - syst
 *         - dias
 *         - pulse
 *         - date
 *       properties:
 *         syst:
 *           type: integer
 *           description: Systolic value
 *         dias:
 *           type: integer
 *           description: Diastolic value
 *         pulse:
 *           type: integer
 *           description: Pulse per minute
 *         date:
 *           type: string
 *           format: date
 *           description: Measurement date (dd/mm/yyyy)
 *     MeasureUpdate:
 *       type: object
 *       required:
 *         - syst
 *         - dias
 *         - pulse
 *       properties:
 *         syst:
 *           type: integer
 *           description: Systolic value
 *         dias:
 *           type: integer
 *           description: Diastolic value
 *         pulse:
 *           type: integer
 *           description: Pulse per minute
 *     DateRangeRequest:
 *       type: object
 *       properties:
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date for filtering (YYYY-MM-DD)
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date for filtering (YYYY-MM-DD)
 *     MeasureAvg:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           description: User ID
 *         syst_avg:
 *           type: number
 *           format: float
 *           description: Average systolic value
 *         dias_avg:
 *           type: number
 *           format: float
 *           description: Average diastolic value
 *         pulse_avg:
 *           type: number
 *           format: float
 *           description: Average pulse value
 *         systCnt:
 *           type: integer
 *           description: Count of systolic values exceeding 120% of average
 *         diasCnt:
 *           type: integer
 *           description: Count of diastolic values exceeding 120% of average
 *         pulseCnt:
 *           type: integer
 *           description: Count of pulse values exceeding 120% of average
 *         userName:
 *           type: string
 *           description: User's full name
 *     MeasureStatistics:
 *       type: object
 *       properties:
 *         measureData:
 *           type: array
 *           items:
 *             allOf:
 *               - $ref: '#/components/schemas/Measure'
 *               - type: object
 *                 properties:
 *                   critical:
 *                     type: boolean
 *                     description: Flag indicating if measurement exceeds 120% of average
 *         totalCrits:
 *           type: integer
 *           description: Total number of critical measurements
 *         avgData:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *               description: User ID
 *             syst_avg:
 *               type: number
 *               format: float
 *               description: Average systolic value
 *             dias_avg:
 *               type: number
 *               format: float
 *               description: Average diastolic value
 *             pulse_avg:
 *               type: number
 *               format: float
 *               description: Average pulse value
 */

/**
 * @swagger
 * tags:
 *   - name: Measures
 *     description: Blood pressure and pulse measurements
 */

/**
 * @swagger
 * /measure/avg/{userId}:
 *   post:
 *     tags: [Measures]
 *     summary: Get average measurements for a specific user
 *     description: Retrieves average measurements and marks critical values for a specific user, with optional date range filtering
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DateRangeRequest'
 *     responses:
 *       200:
 *         description: Average data found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avg data found.
 *                 data:
 *                   $ref: '#/components/schemas/MeasureStatistics'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Could not find any measure for this user according to your request.
 */

/**
 * @swagger
 * /measure/avg:
 *   get:
 *     tags: [Measures]
 *     summary: Get average measurements by month
 *     description: Retrieves average measurements for all users for a specific month and year, with counts of critical values
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month (1-12)
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year
 *     responses:
 *       200:
 *         description: Average data found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avg data found.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MeasureAvg'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Month required!.
 */

/**
 * @swagger
 * /measure/all:
 *   get:
 *     tags: [Measures]
 *     summary: Get all measurements
 *     description: Retrieves all measurements in the system
 *     responses:
 *       200:
 *         description: All measurements found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All measures found.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Measure'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /measure/all/{userId}:
 *   get:
 *     tags: [Measures]
 *     summary: Get all measurements for a specific user
 *     description: Retrieves all measurements for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Measurements found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Found 5 measure for user id 123
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Measure'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Could not find any measure for this user according to your request.
 */

/**
 * @swagger
 * /measure/{measureId}:
 *   get:
 *     tags: [Measures]
 *     summary: Get a specific measurement
 *     description: Retrieves a specific measurement by ID
 *     parameters:
 *       - in: path
 *         name: measureId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Measurement ID
 *     responses:
 *       200:
 *         description: Measurement found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Found measure
 *                 data:
 *                   $ref: '#/components/schemas/Measure'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fail to get this measure id.
 */

/**
 * @swagger
 * /measure/{userId}:
 *   post:
 *     tags: [Measures]
 *     summary: Create a new measurement
 *     description: Creates a new measurement for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeasureCreate'
 *     responses:
 *       200:
 *         description: Measurement created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Measure has been created successfully, Measure ID 123
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Systolic must be provided and needs to be a positive number
 */

/**
 * @swagger
 * /measure/{measureId}:
 *   patch:
 *     tags: [Measures]
 *     summary: Update a measurement
 *     description: Updates an existing measurement
 *     parameters:
 *       - in: path
 *         name: measureId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Measurement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeasureUpdate'
 *     responses:
 *       200:
 *         description: Measurement updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Updated successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No changes detected, please provide new data to make the change.
 */

/**
 * @swagger
 * /measure/{measureId}:
 *   delete:
 *     tags: [Measures]
 *     summary: Delete a measurement
 *     description: Deletes a specific measurement
 *     parameters:
 *       - in: path
 *         name: measureId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Measurement ID
 *     responses:
 *       200:
 *         description: Measurement deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Could not find this user in the DB.
 */



measureRouter.post('/avg/:userId', getAllMeasuresAvg, (req, res) => {
    res.status(200).json({ message: "Avg data found.", data: req.measureData })
})

measureRouter.get('/avg', getAllUsers, getAvgByMonth, (req, res) => {
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
