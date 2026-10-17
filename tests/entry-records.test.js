'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { EntryRecordsService } = require('../src/modules/entry-records/entry-records.service');

test('entry-records: creates and retrieves a record', () => {
  const service = new EntryRecordsService();
  const created = service.create({ title: 'Sample entry-records record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample entry-records record');
});

test('entry-records: updates status through the lifecycle', () => {
  const service = new EntryRecordsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('entry-records: rejects invalid payloads', () => {
  const service = new EntryRecordsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});