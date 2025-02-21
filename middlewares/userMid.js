const {pool} = require('../db/dbConnection')


async function createUser(req,res,next){
    //(fullName) 
console.log("createUser");
    
}

async function getUser(req,res,next){
    //(id) 
console.log("getUser");
    
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