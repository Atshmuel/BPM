const {pool} = require('../db/dbConnection')

async function createMeasure(req,res,next) {
    // userId,syst,dias,pulse   
    console.log("createMeasure");
    
}

async function getMeasure(req,res,next) {
    //id
    console.log("getMeasure");

}

async function getAllMeasures(req,res,next) {
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