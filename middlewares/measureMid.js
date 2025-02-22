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
            let sqlQuery = "select user_id,avg(syst_high) as syst_avg,avg(dias_low) as dias_avg ,avg(pulse) as pulse_avg from measures "
            let queryValues =[]
        if(req.body.startDate && req.body.endDate){
            sqlQuery += "where date between ? and ? "
            queryValues.push(req.body.startDate,req.body.endDate)
        }

            sqlQuery+=" group by user_id"
            const [avgData] = await pool.query(sqlQuery,queryValues)
            if(!avgData.length) throw new Error("Could not find any measure for this user accrding to your request.")

            const [measureData] = await pool.query("select * from measures")
            
            avgData.forEach(avg=>{
                measureData.forEach(measure=>{
                    if(+measure.user_id === +avg.user_id){
                        measure.critical = +measure.syst_high > +avg.syst_avg   * 1.2 || +measure.dias_low > +avg.dias_avg   * 1.2 || +measure.pulse > +avg.pulse_avg   * 1.2
                    }
                })
            })
            
            req.measureData = measureData;
     
            next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }
}

async function getAllMeasures(req,res,next){    
    try {        
        let sqlQuery ="select * from measures";
        const [data] = await pool.query(sqlQuery)
        req.allMeasures = data;
        next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }    
}

async function getAllMeasuresById(req,res,next) {
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
    try { 
            if(!req.params.measureId || isNaN(+req.params.measureId)) throw new Error("Measure id required!.")
            if(!req.body.syst || isNaN(+req.body.syst)) throw new Error("Systolic must be provided and needs to be a positive number")
            if(!req.body.dias || isNaN(+req.body.dias) ) throw new Error("Diastolic must be provided and needs to be a positive number")
            if(!req.body.pulse || isNaN(+req.body.pulse)) throw new Error("Pulse must be provided and needs to be a positive number")

            let sqlQuery ="update measures set syst_high=?, dias_low=?, pulse=? where id = ?"
            let queryValues = [+req.body.syst,+req.body.dias,+req.body.pulse,+req.params.measureId]
            const [data] = await pool.query(sqlQuery,queryValues)
            console.log(data);
            if(!data.affectedRows) throw new Error("ID could not be found in the DB.")
            if(data.affectedRows &&  !data.changedRows) throw new Error("No changes detected, please provide new data to make the change.")
            next()
        } catch (error) {
            res.status(400).json({ message: `${error.sqlMessage || error.message}` })
        }   

}

async function deleteMeasure(req,res,next) {
     try {   
        if(!req.params.measureId || isNaN(+req.params.measureId)) throw new Error("Measure id required!.")
            let sqlQuery ="Delete from measures where id = ?";
        let queryValues = [+req.params.measureId]
        const [data] = await pool.query(sqlQuery,queryValues)
        if(!data.affectedRows) throw new Error('Could not find this user in the DB.')
            console.log(data);
            
        next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }  

}
module.exports = {createMeasure,getMeasure,getAllMeasures,getAllMeasuresById,updateMeasure,deleteMeasure,getAllMeasuresAvg}