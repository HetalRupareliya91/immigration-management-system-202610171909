'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { RefundsService } = require('../src/modules/refunds/refunds.service');

test('refunds: creates and retrieves a record', () => {
  const service = new RefundsService();
  const created = service.create({ title: 'Sample refunds record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample refunds record');
});

test('refunds: updates status through the lifecycle', () => {
  const service = new RefundsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('refunds: rejects invalid payloads', () => {
  const service = new RefundsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});