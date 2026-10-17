'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { PaymentsService } = require('../src/modules/payments/payments.service');

test('payments: creates and retrieves a record', () => {
  const service = new PaymentsService();
  const created = service.create({ title: 'Sample payments record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample payments record');
});

test('payments: updates status through the lifecycle', () => {
  const service = new PaymentsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('payments: rejects invalid payloads', () => {
  const service = new PaymentsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});