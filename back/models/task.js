const query = require('../query')
const prepareUpdateQuery = require('./lib/prepareUpdateQuery')

const findAll = () => query('select * from tasks')

const create = ({ title }) => query('insert into tasks(title) values(?)', [title])
  .then(result => query('select * from tasks where id = ?', [result.insertId]))
  .then(tasks => tasks[0])

const update = (id, payload) => {
  const updatableFields = ['done', 'title']
  const { updateQuery, values } = prepareUpdateQuery('tasks', id, payload, updatableFields)
  return query(updateQuery, values)
    .then(() => query('select * from tasks where id = ?', [id]))
    .then(tasks => tasks[0])
}

const deleteRecord = id => query('delete from tasks where id = ?', [id])

module.exports = {
  findAll,
  create,
  update,
  delete: deleteRecord
}
