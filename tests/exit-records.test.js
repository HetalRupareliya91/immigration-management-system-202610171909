'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { ExitRecordsService } = require('../src/modules/exit-records/exit-records.service');

test('exit-records: creates and retrieves a record', () => {
  const service = new ExitRecordsService();
  const created = service.create({ title: 'Sample exit-records record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample exit-records record');
});

test('exit-records: updates status through the lifecycle', () => {
  const service = new ExitRecordsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('exit-records: rejects invalid payloads', () => {
  const service = new ExitRecordsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});