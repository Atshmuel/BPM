const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');


dotenv.config()
const { PORT } = process.env

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))


const {userRouter} = require('./router/userRouter')
const {measureRouter} = require('./router/measureRouter')

app.use('/user',userRouter)
app.use('/measure',measureRouter)



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
