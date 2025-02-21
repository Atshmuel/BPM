const {pool} = require('../db/dbConnection')

async function createMeasure(req,res,next) {
    try {   
        if(!req.params.userId) throw new Error("ID required!.")
        if(!req.body.syst || isNaN(+req.body.syst)) throw new Error("Systolic must be provided and needs to be a positive number")
        if(!req.body.dias || isNaN(+req.body.dias) ) throw new Error("Diastolic must be provided and needs to be a positive number")
        if(!req.body.pulse || isNaN(+req.body.pulse)) throw new Error("Pulse must be provided and needs to be a positive number")


        let sqlQuery ="insert into measures (user_id,date,syst_high,dias_low,pulse) Values (?,?,?,?,?)";
        let queryValues = [+req.params.userId,new Date().toISOString().split('T')[0],+req.body.syst,+req.body.dias,+req.body.pulse]
        const [data] = await pool.query(sqlQuery,queryValues)
        req.measureId = data.insertId;
        next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }   
}

async function getMeasure(req,res,next) {    
    try {
        if(!req.params.measureId) throw new Error("ID required!.")
            let sqlQuery ="select * from measures where id=?";
            let queryValues = [req.params.measureId]
            const [data] = await pool.query(sqlQuery,queryValues)
            if(!data.length) throw new Error("Fail to get this measure id.")
            req.measureData = data[0];
            next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }

}

async function getAllMeasuresAvg(req,res,next) {
    try {
        if(!req.params.measureId) throw new Error("ID required!.")
            let sqlQuery ="select * from measures where id=?";
        let queryValues = [req.params.measureId]
        if(req.body.startDate && req.body.endDate){
            sqlQuery += " and date between ? and ?"
            queryValues.push(req.body.startDate,req.body.endDate)
        }
            const [data] = await pool.query(sqlQuery,queryValues)
            if(!data.length) throw new Error("Could not find any measure for this user accrding to your request.")
            req.measureData = data;
            next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }
}

async function getAllMeasures(req,res,next) {
    try {
        if(!req.params.userId) throw new Error("ID required!.")
            let sqlQuery ="select * from measures where id=?";
        let queryValues = [req.params.userId]
        if(req.body.startDate && req.body.endDate){
            sqlQuery += " and date between ? and ?"
            queryValues.push(req.body.startDate,req.body.endDate)
        }
            const [data] = await pool.query(sqlQuery,queryValues)
            if(!data.length) throw new Error("Could not find any measure for this user accrding to your request.")
            req.measureData = data;        
            next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }

}

async function updateMeasure(req,res,next) {
     //id
    console.log("updateMeasure");
    try {
        
    } catch (error) {
        
    }

}

async function deleteMeasure(req,res,next) {
     //id
    console.log("deleteMeasure");
    try {
        
    } catch (error) {
        
    }

}
module.exports = {createMeasure,getMeasure,getAllMeasures,updateMeasure,deleteMeasure,getAllMeasuresAvg}