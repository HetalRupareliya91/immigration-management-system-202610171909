'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { RolesService } = require('../src/modules/roles/roles.service');

test('roles: creates and retrieves a record', () => {
  const service = new RolesService();
  const created = service.create({ title: 'Sample roles record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample roles record');
});

test('roles: updates status through the lifecycle', () => {
  const service = new RolesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('roles: rejects invalid payloads', () => {
  const service = new RolesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});