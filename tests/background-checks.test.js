'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { BackgroundChecksService } = require('../src/modules/background-checks/background-checks.service');

test('background-checks: creates and retrieves a record', () => {
  const service = new BackgroundChecksService();
  const created = service.create({ title: 'Sample background-checks record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample background-checks record');
});

test('background-checks: updates status through the lifecycle', () => {
  const service = new BackgroundChecksService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('background-checks: rejects invalid payloads', () => {
  const service = new BackgroundChecksService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});