'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { StatusChangesService } = require('../src/modules/status-changes/status-changes.service');

test('status-changes: creates and retrieves a record', () => {
  const service = new StatusChangesService();
  const created = service.create({ title: 'Sample status-changes record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample status-changes record');
});

test('status-changes: updates status through the lifecycle', () => {
  const service = new StatusChangesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('status-changes: rejects invalid payloads', () => {
  const service = new StatusChangesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});