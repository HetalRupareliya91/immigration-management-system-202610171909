'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { DetentionRecordsService } = require('../src/modules/detention-records/detention-records.service');

test('detention-records: creates and retrieves a record', () => {
  const service = new DetentionRecordsService();
  const created = service.create({ title: 'Sample detention-records record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample detention-records record');
});

test('detention-records: updates status through the lifecycle', () => {
  const service = new DetentionRecordsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('detention-records: rejects invalid payloads', () => {
  const service = new DetentionRecordsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});