const test = require('ava');
const redis = require('..');

test('set', async (t) => {
  const client = redis();
  const result = await client.set('test', 'hello');
  t.is(result, 'OK');
});

test('get', async (t) => {
  const client = redis();
  const result = await client.get('test');
  t.is(result, 'hello');
});

test('del', async (t) => {
  const client = redis();
  const result = await client.del('test');
  t.is(result, 1);
});
