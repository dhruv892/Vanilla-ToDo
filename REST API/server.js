if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('connected to database'))


app.use(express.json())

const cors = require("cors")
const corsOpt = {
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}
app.use(cors(corsOpt))

const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log('server started'))
