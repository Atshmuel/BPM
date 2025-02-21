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


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
