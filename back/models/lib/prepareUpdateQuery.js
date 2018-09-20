module.exports = (table, id, payload, updatableFields) => {
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
  const updateQuery = `update ${table} set ${ keys.join() } where id = ?`
  return { updateQuery, values }
}
