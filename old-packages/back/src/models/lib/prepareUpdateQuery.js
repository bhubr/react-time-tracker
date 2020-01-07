const prepareUpdateQuery = (table, id, payload, updatableFields, ignoredFields = []) => {
  const [keys, values] = Object.keys(payload)
    .reduce(([k, v], key) => {
      if (ignoredFields.includes(key)) {
        return [k, v];
      }
      if (!updatableFields.includes(key)) {
        throw new Error(`Task update: ${key} field cannot be updated`);
      }
      return [
        [...k, `${key} = ?`],
        [...v, payload[key]],
      ];
    }, [[], []]);
  values.push(id);
  const updateQuery = `update ${table} set ${keys.join()} where id = ?`;
  return { updateQuery, values };
};

export default prepareUpdateQuery;
