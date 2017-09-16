const test = require('ava');
const redis = require('..');

test('select 1', (t) => {
  const client = redis();
  const db1 = client.select(1);
  t.is(typeof db1, 'object');
});
