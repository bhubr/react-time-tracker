const chain = require('store-chain')
const _ = require('lodash')
const query = require('../query')
const timeSliceModel = require('./timeSlice')
const prepareUpdateQuery = require('./lib/prepareUpdateQuery')

const findAll = () => chain(query('select * from tasks'))
  .set('tasks')
  .then(() => timeSliceModel.findAll())
  .then(timeSlices => _.groupBy(timeSlices, 'taskId'))
  .set('timeSlices')
  .get(({ tasks, timeSlices }) => tasks.map(
    task => ({ ...task, timeSlices: timeSlices[`${task.id}`] || [] })
  ))

const create = ({ title }) => query('insert into tasks(title) values(?)', [title])
  .then(result => query('select * from tasks where id = ?', [result.insertId]))
  .then(tasks => ({ ...tasks[0], timeSlices: [] }))

const update = (id, payload) => {
  const updatableFields = ['done', 'active', 'title']
  const ignoredFields = ['timeSlices']
  const { updateQuery, values } = prepareUpdateQuery('tasks', id, payload, updatableFields, ignoredFields)
  return chain(query(updateQuery, values))
    .then(() => query('select * from tasks where id = ?', [id]))
    .then(tasks => tasks[0])
    .set('task')
    .then(() => query('select * from timeSlices where taskId = ?', [id]))
    .set('timeSlices')
    .get(({ task, timeSlices }) => ({ ...task, timeSlices }))
}

const deleteRecord = id => query('delete from tasks where id = ?', [id])

module.exports = {
  findAll,
  create,
  update,
  delete: deleteRecord
}
