const query = require('../query')


const findAll = () => query('select * from tasks')

const create = ({ title }) => query('insert into tasks(title) values(?)', [title])
  .then(result => query('select * from tasks where id = ?', [result.insertId]))

const toggleDone = (id, done) => query('update tasks set done = ? where id = ?', [done, id])
.then(() => query('select * from tasks where id = ?', [id]))

module.exports = {
  findAll,
  create,
  toggleDone
}
