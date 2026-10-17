'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { WatchlistScreeningService } = require('../src/modules/watchlist-screening/watchlist-screening.service');

test('watchlist-screening: creates and retrieves a record', () => {
  const service = new WatchlistScreeningService();
  const created = service.create({ title: 'Sample watchlist-screening record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample watchlist-screening record');
});

test('watchlist-screening: updates status through the lifecycle', () => {
  const service = new WatchlistScreeningService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('watchlist-screening: rejects invalid payloads', () => {
  const service = new WatchlistScreeningService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});