const test = require('ava');
const redis = require('..');

const sub = redis({ test: 1 }).client;
const pub = redis({ test: 2 }).client;
sub.on('subscribe', () => {
  pub.publish('a nice channel', 'I am sending a message.');
});

let msgCount = 0;
sub.on('message', (channel, message) => {
  if (typeof message === 'string') msgCount += 1;
});

sub.subscribe('a nice channel');

const delay = t => new Promise(resolve => setTimeout(resolve, t));

test('subscriber', async (t) => {
  await delay(1000);
  t.is(msgCount > 0, true);
});
