const {pool} = require('../db/dbConnection')


async function createUser(req,res,next){
    try {
        if(!req.body.fullName || req.body.fullName.split(' ').length < 2 || req.body.fullName.split(' ')[1] == "")   throw new Error("Name is not allowed to be empty, you must provide name with minimun of Two letters, make sure to provide full name (two words only).")

        let sqlQuery ="insert into users (full_name) values (?)";
        let queryValues = [req.body.fullName.trim()]
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
        let sqlQuery ="select * from users where id=?";
        let queryValues = [req.params.id]
        const [data] = await pool.query(sqlQuery,queryValues)
        req.userData = data[0];
        next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }    
}

async function getAllUsers(req,res,next){    
    try {        
        let sqlQuery ="select * from users";
        const [data] = await pool.query(sqlQuery)
        req.allUsers = data;
        next()
    } catch (error) {
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }    
}

async function updateUser(req,res,next){
    try {   
        if(!req.params.id) throw new Error("ID required!.")
            if(!req.body.fullName || req.body.fullName.split(' ').length != 2)   throw new Error("Name is not allowed to be empty, you must provide name with minimun of Two letters, make sure to provide full name (two words only).")
        let sqlQuery ="update users set full_name = ? where id = ?";
        let queryValues = [req.body.fullName.trim(),req.params.id]
        const [data] = await pool.query(sqlQuery,queryValues)
        if(!data.affectedRows) throw new Error("ID could not be found in the DB.")
        if(data.affectedRows &&  !data.changedRows) throw new Error("No change detected, please provide new name to make the change.")
        next()
    } catch (error) {        
        res.status(400).json({ message: `${error.sqlMessage || error.message}` })
    }   
    
}

async function deleteUser(req,res,next){
try {   
    if(!req.params.id) throw new Error("ID required!.")
    let sqlQuery ="Delete from users where id = ?";
    let queryValues = [req.params.id]
    const [data] = await pool.query(sqlQuery,queryValues)
    if(!data.affectedRows) throw new Error('Could not find this user in the DB.')
    next()
} catch (error) {
    res.status(400).json({ message: `${error.sqlMessage || error.message}` })
}   
}


module.exports = {createUser,getAllUsers,getUser,updateUser,deleteUser}