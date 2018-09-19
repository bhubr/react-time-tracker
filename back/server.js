const express = require('express')
const bodyParser = require('body-parser')

const tasksRouter = require('./routes/tasks')
const timeSlicesRouter = require('./routes/timeSlices')

const app = express()

app.use(bodyParser.json())
app.use('/api/tasks', tasksRouter)
app.use('/api/time-slices', timeSlicesRouter)

app.listen(process.env.PORT || 5000)