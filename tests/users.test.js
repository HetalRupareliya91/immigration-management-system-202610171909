'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { UsersService } = require('../src/modules/users/users.service');

test('users: creates and retrieves a record', () => {
  const service = new UsersService();
  const created = service.create({ title: 'Sample users record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample users record');
});

test('users: updates status through the lifecycle', () => {
  const service = new UsersService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('users: rejects invalid payloads', () => {
  const service = new UsersService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});