const test = require('tape');

test('fake test for travis', (t) => {
  t.plan(1);
  t.equal(typeof Date.now, 'function');
});
