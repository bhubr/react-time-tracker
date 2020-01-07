// test/lib/prepareUpdateQuery.test.js
import prepareUpdateQuery from '../../src/models/lib/prepareUpdateQuery';

describe('prepareUpdateQuery', () => {
  it('prepares an update on tasks table', async () => {
    const payload = { title: 'Yo' };
    const updatable = ['title'];
    const output = prepareUpdateQuery('tasks', 4, payload, updatable);
    expect(output).toEqual({
      updateQuery: 'update tasks set title = ? where id = ?',
      values: ['Yo', 4]
    });
  });

  it('prepares an update on tasks table with ignored fields', async () => {
    const payload = { id: 4, title: 'Yo' };
    const updatable = ['title'];
    const ignored = ['id'];
    const output = prepareUpdateQuery('tasks', 4, payload, updatable, ignored);
    expect(output).toEqual({
      updateQuery: 'update tasks set title = ? where id = ?',
      values: ['Yo', 4]
    });
  });
});
