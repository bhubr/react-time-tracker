const express = require('express')
const bodyParser = require('body-parser')

const tasksRouter = require('./routes/tasks')

const app = express()

app.use(bodyParser.json())
app.use('/api/tasks', tasksRouter)

app.listen(5000)