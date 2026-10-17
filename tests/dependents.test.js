'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { DependentsService } = require('../src/modules/dependents/dependents.service');

test('dependents: creates and retrieves a record', () => {
  const service = new DependentsService();
  const created = service.create({ title: 'Sample dependents record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample dependents record');
});

test('dependents: updates status through the lifecycle', () => {
  const service = new DependentsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('dependents: rejects invalid payloads', () => {
  const service = new DependentsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});