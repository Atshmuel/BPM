const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const {specs} = require("./public/swagger");
const swaggerUi = require("swagger-ui-express");



dotenv.config()
const { PORT } = process.env

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')))
app.use("/bpm-docs", swaggerUi.serve, swaggerUi.setup(specs));



const {userRouter} = require('./router/userRouter')
const {measureRouter} = require('./router/measureRouter');

app.use('/user',userRouter)
app.use('/measure',measureRouter)


app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, "public", "home.html"))
})

app.get('/editPatients',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, "public", "patientEdit.html"))
})

app.get('/patientsMeasures',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, "public", "patientMeasures.html"))
})

app.get('/allPatients',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, "public", "allPatients.html"))
})



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
