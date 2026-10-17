'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { BorderCrossingsService } = require('../src/modules/border-crossings/border-crossings.service');

test('border-crossings: creates and retrieves a record', () => {
  const service = new BorderCrossingsService();
  const created = service.create({ title: 'Sample border-crossings record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample border-crossings record');
});

test('border-crossings: updates status through the lifecycle', () => {
  const service = new BorderCrossingsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('border-crossings: rejects invalid payloads', () => {
  const service = new BorderCrossingsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});