'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { FeesService } = require('../src/modules/fees/fees.service');

test('fees: creates and retrieves a record', () => {
  const service = new FeesService();
  const created = service.create({ title: 'Sample fees record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample fees record');
});

test('fees: updates status through the lifecycle', () => {
  const service = new FeesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('fees: rejects invalid payloads', () => {
  const service = new FeesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});