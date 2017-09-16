const test = require('ava');
const redis = require('..');

test('all config', (t) => {
  const client = redis({
    db: 1
  }, console.error);
  t.is(typeof client, 'object');
});

test('default config', (t) => {
  const client = redis();
  t.is(typeof client, 'object');
});

test('default config', (t) => {
  const client = redis();
  t.is(typeof client, 'object');
});
