const express = require('express')
const router = express.Router()
const taskModel = require('../models/task')

router.get('/', (req, res) => taskModel.findAll()
  .then(tasks => res.json(tasks))
)

router.post('/', (req, res) => taskModel.create(req.body)
  .then(task => res.json(task))
)

router.put('/:id', (req, res) => taskModel.update(req.params.id, req.body)
  .then(task => res.json(task))
)

router.delete('/:id', (req, res) => taskModel.delete(req.params.id)
  .then(() => res.json({ taskId: req.params.id }))
)

module.exports = router
