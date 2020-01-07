import query from '../query';
import prepareUpdateQuery from './lib/prepareUpdateQuery';

const findAll = () => query('select * from timeSlices');

const create = ({ comment, type, taskId, start }) =>
  query(
    'insert into timeSlices(comment, type, taskId, start) values(?, ?, ?, ?)',
    [comment, type, taskId, start]
  )
    .then(result =>
      query('select * from timeSlices where id = ?', [result.insertId])
    )
    .then(timeSlices => timeSlices[0]);

const update = (id, payload) => {
  const updatableFields = ['comment', 'end'];
  const { updateQuery, values } = prepareUpdateQuery(
    'timeSlices',
    id,
    payload,
    updatableFields
  );
  return query(updateQuery, values)
    .then(() => query('select * from timeSlices where id = ?', [id]))
    .then(timeSlices => timeSlices[0]);
};

const deleteRecord = id => query('delete from timeSlices where id = ?', [id]);

export default {
  findAll,
  create,
  update,
  delete: deleteRecord,
};
