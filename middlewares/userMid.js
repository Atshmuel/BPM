const {pool} = require('../db/dbConnection')


async function createUser(req,res,next){
    try {
        if(!req.body.fullName || req.body.fullName.split(' ').length < 2)   throw new Error("Name is not allowed, you must provide name with minimun of Two letters.")
        let sqlQuery ="insert into users (full_name) values (?)";
        let queryValues = [req.body.fullName]
        const [data] = await pool.query(sqlQuery,queryValues)
        
        req.userId = data.insertId;
        next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }
   
    
}

async function getUser(req,res,next){
    try {        
        if(!req.params.id) throw new Error("ID required!.")
        let sqlQuery ="select * from users where id=(?)";
        let queryValues = [req.params.id]
        const [data] = await pool.query(sqlQuery,queryValues)
        req.userData = data[0];
        next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }    
}

async function getAllUsers(req,res,next){
    //() 
console.log("getAllUsers");
    
}

async function updateUser(req,res,next){
    //(id,newName) 
console.log("updateUser");
    
}

async function deleteUser(req,res,next){
    //(id) 
console.log("deleteUser");
    
}


module.exports = {createUser,getAllUsers,getUser,updateUser,deleteUser}