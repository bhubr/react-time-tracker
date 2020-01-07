import express from 'express';
import taskModel from '../models/task';

const router = express.Router();

router.get('/', (req, res) =>
  taskModel.findAll().then(tasks => res.json(tasks))
);

router.post('/', (req, res) =>
  taskModel.create(req.body).then(task => res.json(task))
);

router.put('/:id', (req, res) =>
  taskModel.update(req.params.id, req.body).then(task => res.json(task))
);

router.delete('/:id', (req, res) =>
  taskModel
    .delete(req.params.id)
    .then(() => res.json({ taskId: req.params.id }))
);

export default router;
