'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { TravelHistoryService } = require('../src/modules/travel-history/travel-history.service');

test('travel-history: creates and retrieves a record', () => {
  const service = new TravelHistoryService();
  const created = service.create({ title: 'Sample travel-history record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample travel-history record');
});

test('travel-history: updates status through the lifecycle', () => {
  const service = new TravelHistoryService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('travel-history: rejects invalid payloads', () => {
  const service = new TravelHistoryService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});