'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { PermissionsService } = require('../src/modules/permissions/permissions.service');

test('permissions: creates and retrieves a record', () => {
  const service = new PermissionsService();
  const created = service.create({ title: 'Sample permissions record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample permissions record');
});

test('permissions: updates status through the lifecycle', () => {
  const service = new PermissionsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('permissions: rejects invalid payloads', () => {
  const service = new PermissionsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});