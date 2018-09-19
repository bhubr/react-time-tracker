const express = require('express')
const router = express.Router()
const timeSliceModel = require('../models/timeSlice')

router.get('/', (req, res) => timeSliceModel.findAll()
  .then(timeSlices => res.json(timeSlices))
  .catch(error => res.status(400).json({ error }))
)

router.post('/', (req, res) => timeSliceModel.create(req.body)
  .then(timeSlice => res.json(timeSlice))
  .catch(error => res.status(400).json({ error }))
)

router.put('/:id', (req, res) => timeSliceModel.update(req.params.id, req.body)
  .then(timeSlice => res.json(timeSlice))
  .catch(error => res.status(400).json({ error }))
)

router.delete('/:id', (req, res) => timeSliceModel.delete(req.params.id)
  .then(() => res.json({ timeSliceId: req.params.id }))
  .catch(error => res.status(400).json({ error }))
)

module.exports = router
