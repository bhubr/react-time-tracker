const query = require('../query')

const findAll = () => query('select * from tasks')

const create = ({ title }) => query('insert into tasks(title) values(?)', [title])
  .then(result => query('select * from tasks where id = ?', [result.insertId]))
  .then(tasks => tasks[0])

const update = (id, payload) => {
  const updatableFields = ['done', 'title']
  const keys = []
  const values = []
  for (let key in payload) {
    if (! updatableFields.includes(key)) {
      throw new Error(`Task update: ${key} field cannot be updated`)
    }
    keys.push(`${key} = ?`)
    values.push(payload[key])
  }
  values.push(id)
  const updateQuery = `update tasks set ${ keys.join() } where id = ?`
  console.log(updateQuery, keys, values)
  return query(updateQuery, values)
    .then(() => query('select * from tasks where id = ?', [id]))
    .then(tasks => tasks[0])
}


module.exports = {
  findAll,
  create,
  update
}
