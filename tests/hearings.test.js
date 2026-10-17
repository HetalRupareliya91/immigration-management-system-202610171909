'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { HearingsService } = require('../src/modules/hearings/hearings.service');

test('hearings: creates and retrieves a record', () => {
  const service = new HearingsService();
  const created = service.create({ title: 'Sample hearings record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample hearings record');
});

test('hearings: updates status through the lifecycle', () => {
  const service = new HearingsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('hearings: rejects invalid payloads', () => {
  const service = new HearingsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});