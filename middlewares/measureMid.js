const {pool} = require('../db/dbConnection')

async function createMeasure(req,res,next) {

      
    try {   
        if(!req.params.userId) throw new Error("ID required!.")
        if(!req.body.syst || isNaN(+req.body.syst) || +req.body.syst <= 0 ) throw new Error("Systolic must be provided and needs to be a positive number")
        if(!req.body.dias || isNaN(+req.body.dias) || +req.body.dias <= 0 ) throw new Error("Diastolic must be provided and needs to be a positive number")
        if(!req.body.pulse || isNaN(+req.body.pulse) || +req.body.pulse <= 0 ) throw new Error("Pulse must be provided and needs to be a positive number")


        let sqlQuery ="insert into measures (user_id,date,syst_high,dias_low,pulse) Values (?,?,?,?,?)";
        let queryValues = [+req.params.userId,new Date().toISOString().split('T')[0],+req.body.syst,+req.body.dias,+req.body.pulse]
        const [data] = await pool.query(sqlQuery,queryValues)
        console.log(data);

        req.measureId = data.insertId;
        next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }   
}

async function getMeasure(req,res,next) {
    //id
    console.log("getMeasure");

}

async function getAllMeasuresAvg(req,res,next) {
    //(startDate,endDate)
    console.log("getAllMeasures");

}

async function getAllMeasures(req,res,next) {
    //(startDate,endDate)
    console.log("getAllMeasures");

}

async function updateMeasure(req,res,next) {
     //id
    console.log("updateMeasure");

}

async function deleteMeasure(req,res,next) {
     //id
    console.log("deleteMeasure");

}
module.exports = {createMeasure,getMeasure,getAllMeasures,updateMeasure,deleteMeasure}