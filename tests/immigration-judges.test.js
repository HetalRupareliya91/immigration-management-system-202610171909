'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { ImmigrationJudgesService } = require('../src/modules/immigration-judges/immigration-judges.service');

test('immigration-judges: creates and retrieves a record', () => {
  const service = new ImmigrationJudgesService();
  const created = service.create({ title: 'Sample immigration-judges record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample immigration-judges record');
});

test('immigration-judges: updates status through the lifecycle', () => {
  const service = new ImmigrationJudgesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('immigration-judges: rejects invalid payloads', () => {
  const service = new ImmigrationJudgesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});