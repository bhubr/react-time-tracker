const getMySQLTimestamp = () => new Date().toISOString().substr(0, 19).replace('T', ' ')

export default getMySQLTimestamp
